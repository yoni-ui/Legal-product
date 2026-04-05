from typing import Annotated
from uuid import UUID

from fastapi import APIRouter, BackgroundTasks, Depends, File, Form, HTTPException, UploadFile, status
from sqlalchemy.orm import Session

from app.db.session import SessionLocal, get_db
from app.deps import get_current_user
from app.models import Document, DocumentStatus, User, WorkspaceMember
from app.schemas.document import DocumentOut
from app.services.indexing import run_index_document
from app.services.limits import assert_can_add_document
from app.services.storage import delete_upload, save_upload

router = APIRouter(tags=["documents"])


def _member(db: Session, workspace_id: UUID, user_id: UUID) -> WorkspaceMember | None:
    return (
        db.query(WorkspaceMember)
        .filter(
            WorkspaceMember.workspace_id == workspace_id,
            WorkspaceMember.user_id == user_id,
        )
        .first()
    )


def _run_index_job(document_id: UUID, user_id: UUID) -> None:
    db = SessionLocal()
    try:
        run_index_document(db, document_id, user_id)
    finally:
        db.close()


@router.post("/workspaces/{workspace_id}/documents", response_model=DocumentOut, status_code=201)
async def upload_document(
    workspace_id: UUID,
    background_tasks: BackgroundTasks,
    user: Annotated[User, Depends(get_current_user)],
    db: Annotated[Session, Depends(get_db)],
    file: UploadFile = File(...),
    title: str | None = Form(None),
) -> Document:
    m = _member(db, workspace_id, user.id)
    if not m:
        raise HTTPException(status.HTTP_404_NOT_FOUND, "Workspace not found")
    ws = m.workspace
    assert_can_add_document(db, ws)
    raw = await file.read()
    if len(raw) > 10 * 1024 * 1024:
        raise HTTPException(status.HTTP_400_BAD_REQUEST, "File too large (max 10MB)")
    mime = file.content_type or "application/octet-stream"
    if mime not in (
        "application/pdf",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ):
        raise HTTPException(
            status.HTTP_400_BAD_REQUEST,
            "Only PDF and DOCX are supported",
        )
    doc_title = title or (file.filename or "document")
    doc = Document(
        workspace_id=workspace_id,
        owner_user_id=user.id,
        title=doc_title[:500],
        storage_key="",
        mime_type=mime,
        byte_size=len(raw),
        status=DocumentStatus.uploaded,
    )
    db.add(doc)
    db.flush()
    key = save_upload(workspace_id, doc.id, file.filename or "file", raw)
    doc.storage_key = key
    db.commit()
    db.refresh(doc)
    background_tasks.add_task(_run_index_job, doc.id, user.id)
    return doc


@router.get("/workspaces/{workspace_id}/documents", response_model=list[DocumentOut])
def list_documents(
    workspace_id: UUID,
    user: Annotated[User, Depends(get_current_user)],
    db: Annotated[Session, Depends(get_db)],
) -> list[Document]:
    if not _member(db, workspace_id, user.id):
        raise HTTPException(status.HTTP_404_NOT_FOUND, "Workspace not found")
    return (
        db.query(Document)
        .filter(Document.workspace_id == workspace_id)
        .order_by(Document.created_at.desc())
        .all()
    )


@router.get("/workspaces/{workspace_id}/documents/{document_id}", response_model=DocumentOut)
def get_document(
    workspace_id: UUID,
    document_id: UUID,
    user: Annotated[User, Depends(get_current_user)],
    db: Annotated[Session, Depends(get_db)],
) -> Document:
    if not _member(db, workspace_id, user.id):
        raise HTTPException(status.HTTP_404_NOT_FOUND, "Workspace not found")
    doc = db.get(Document, document_id)
    if not doc or doc.workspace_id != workspace_id:
        raise HTTPException(status.HTTP_404_NOT_FOUND, "Document not found")
    return doc


@router.delete("/workspaces/{workspace_id}/documents/{document_id}", status_code=204)
def delete_document(
    workspace_id: UUID,
    document_id: UUID,
    user: Annotated[User, Depends(get_current_user)],
    db: Annotated[Session, Depends(get_db)],
) -> None:
    if not _member(db, workspace_id, user.id):
        raise HTTPException(status.HTTP_404_NOT_FOUND, "Workspace not found")
    doc = db.get(Document, document_id)
    if not doc or doc.workspace_id != workspace_id:
        raise HTTPException(status.HTTP_404_NOT_FOUND, "Document not found")
    key = doc.storage_key
    db.delete(doc)
    db.commit()
    try:
        delete_upload(key)
    except OSError:
        pass
