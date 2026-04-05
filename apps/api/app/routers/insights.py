from typing import Annotated
from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.deps import get_current_user
from app.models import Document, DocumentInsight, User, WorkspaceMember
from app.schemas.document import InsightsOut

router = APIRouter(tags=["insights"])


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


@router.get(
    "/workspaces/{workspace_id}/documents/{document_id}/insights",
    response_model=InsightsOut,
)
def get_insights(
    workspace_id: UUID,
    document_id: UUID,
    user: Annotated[User, Depends(get_current_user)],
    db: Annotated[Session, Depends(get_db)],
) -> InsightsOut:
    _require_doc(db, workspace_id, document_id, user.id)
    ins = db.query(DocumentInsight).filter(DocumentInsight.document_id == document_id).first()
    if not ins:
        return InsightsOut(
            summary_md="*Still processing or no insights yet.*",
            risks_json=[],
            clauses_json=[],
            model_id=None,
            prompt_version=None,
        )
    return InsightsOut(
        summary_md=ins.summary_md,
        risks_json=ins.risks_json,
        clauses_json=ins.clauses_json,
        model_id=ins.model_id,
        prompt_version=ins.prompt_version,
    )
