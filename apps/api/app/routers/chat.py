from typing import Annotated
from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.deps import get_current_user
from app.models import Chat, ChatMessage, Document, DocumentChunk, User, WorkspaceMember
from app.schemas.document import ChatMessageIn, ChatMessageOut
from app.services.limits import assert_can_use_ai, record_usage
from app.services.llm import answer_with_context

router = APIRouter(tags=["chat"])


def _require_doc(
    db: Session, workspace_id: UUID, document_id: UUID, user_id: UUID
) -> Document:
    m = (
        db.query(WorkspaceMember)
        .filter(
            WorkspaceMember.workspace_id == workspace_id,
            WorkspaceMember.user_id == user_id,
        )
        .first()
    )
    if not m:
        raise HTTPException(status.HTTP_404_NOT_FOUND, "Workspace not found")
    doc = db.get(Document, document_id)
    if not doc or doc.workspace_id != workspace_id:
        raise HTTPException(status.HTTP_404_NOT_FOUND, "Document not found")
    return doc


def _get_or_create_chat(db: Session, document_id: UUID) -> Chat:
    c = db.query(Chat).filter(Chat.document_id == document_id).first()
    if c:
        return c
    c = Chat(document_id=document_id)
    db.add(c)
    db.flush()
    return c


@router.get(
    "/workspaces/{workspace_id}/documents/{document_id}/chat",
    response_model=list[ChatMessageOut],
)
def list_messages(
    workspace_id: UUID,
    document_id: UUID,
    user: Annotated[User, Depends(get_current_user)],
    db: Annotated[Session, Depends(get_db)],
) -> list[ChatMessage]:
    _require_doc(db, workspace_id, document_id, user.id)
    chat = db.query(Chat).filter(Chat.document_id == document_id).first()
    if not chat:
        return []
    return (
        db.query(ChatMessage)
        .filter(ChatMessage.chat_id == chat.id)
        .order_by(ChatMessage.created_at.asc())
        .all()
    )


@router.post(
    "/workspaces/{workspace_id}/documents/{document_id}/chat",
    response_model=ChatMessageOut,
    status_code=201,
)
def post_message(
    workspace_id: UUID,
    document_id: UUID,
    body: ChatMessageIn,
    user: Annotated[User, Depends(get_current_user)],
    db: Annotated[Session, Depends(get_db)],
) -> ChatMessage:
    doc = _require_doc(db, workspace_id, document_id, user.id)
    ws = doc.workspace
    assert_can_use_ai(db, ws)
    chunks_rows = (
        db.query(DocumentChunk)
        .filter(DocumentChunk.document_id == document_id)
        .order_by(DocumentChunk.chunk_index.asc())
        .all()
    )
    if not chunks_rows:
        raise HTTPException(
            status.HTTP_400_BAD_REQUEST,
            "Document not indexed yet",
        )
    pairs = [(c.id, c.text) for c in chunks_rows]
    answer, cites = answer_with_context(body.message, pairs)
    chat = _get_or_create_chat(db, document_id)
    um = ChatMessage(
        chat_id=chat.id,
        role="user",
        content=body.message,
        citations_json=None,
    )
    am = ChatMessage(
        chat_id=chat.id,
        role="assistant",
        content=answer,
        citations_json=cites,
    )
    db.add(um)
    db.add(am)
    record_usage(
        db,
        workspace_id=workspace_id,
        user_id=user.id,
        event_type="chat_user_turn",
        document_id=document_id,
    )
    db.commit()
    db.refresh(am)
    return am
