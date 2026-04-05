from __future__ import annotations

import uuid

from sqlalchemy.orm import Session

from app.models import Chat, Document, DocumentChunk, DocumentInsight, DocumentStatus
from app.services.chunking import chunk_text
from app.services.extract import extract_text, sha256_bytes
from app.services.llm import generate_insights
from app.services.limits import assert_can_use_ai, record_usage
from app.services.storage import read_upload


def run_index_document(db: Session, document_id: uuid.UUID, user_id: uuid.UUID) -> None:
    doc = db.get(Document, document_id)
    if not doc:
        return
    ws = doc.workspace
    try:
        assert_can_use_ai(db, ws)
    except Exception:
        doc.status = DocumentStatus.failed
        doc.error_message = "Usage limit exceeded"
        db.commit()
        return
    doc.status = DocumentStatus.indexing
    db.commit()
    try:
        raw = read_upload(doc.storage_key)
        h = sha256_bytes(raw)
        text, pages = extract_text(mime_type=doc.mime_type, data=raw)
        doc.content_hash = h
        doc.page_count = pages
        db.query(DocumentChunk).filter(DocumentChunk.document_id == doc.id).delete()
        parts = chunk_text(text)
        for i, part in enumerate(parts):
            db.add(DocumentChunk(document_id=doc.id, chunk_index=i, text=part))
        db.flush()
        summary, risks, clauses = generate_insights(text)
        existing = db.query(DocumentInsight).filter(DocumentInsight.document_id == doc.id).first()
        if existing:
            db.delete(existing)
            db.flush()
        db.add(
            DocumentInsight(
                document_id=doc.id,
                summary_md=summary,
                risks_json=risks,
                clauses_json=clauses,
                model_id="gpt-4o-mini-or-stub",
                prompt_version="v1",
            )
        )
        if not db.query(Chat).filter(Chat.document_id == doc.id).first():
            db.add(Chat(document_id=doc.id))
        doc.status = DocumentStatus.ready
        doc.error_message = None
        record_usage(
            db,
            workspace_id=doc.workspace_id,
            user_id=user_id,
            event_type="initial_analysis_run",
            document_id=doc.id,
        )
        db.commit()
    except Exception as e:  # noqa: BLE001
        db.rollback()
        doc = db.get(Document, document_id)
        if doc:
            doc.status = DocumentStatus.failed
            doc.error_message = str(e)[:2000]
            db.commit()
