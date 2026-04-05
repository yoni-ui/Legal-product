from typing import Annotated
from uuid import UUID

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.deps import get_current_user
from app.models import User, Workspace, WorkspaceMember
from app.schemas.workspace import UsageOut, WorkspaceOut
from app.services.limits import count_active_documents, count_monthly_usage, get_workspace_limits

router = APIRouter(prefix="/workspaces", tags=["workspaces"])


@router.get("", response_model=list[WorkspaceOut])
def list_workspaces(
    user: Annotated[User, Depends(get_current_user)],
    db: Annotated[Session, Depends(get_db)],
) -> list[Workspace]:
    ids = (
        db.query(WorkspaceMember.workspace_id)
        .filter(WorkspaceMember.user_id == user.id)
        .all()
    )
    wid = [i[0] for i in ids]
    if not wid:
        return []
    return db.query(Workspace).filter(Workspace.id.in_(wid)).all()


@router.get("/{workspace_id}/usage", response_model=UsageOut)
def workspace_usage(
    workspace_id: UUID,
    user: Annotated[User, Depends(get_current_user)],
    db: Annotated[Session, Depends(get_db)],
) -> UsageOut:
    m = (
        db.query(WorkspaceMember)
        .filter(
            WorkspaceMember.workspace_id == workspace_id,
            WorkspaceMember.user_id == user.id,
        )
        .first()
    )
    if not m:
        from fastapi import HTTPException, status

        raise HTTPException(status.HTTP_404_NOT_FOUND, "Workspace not found")
    ws = db.get(Workspace, workspace_id)
    assert ws
    lim, max_docs = get_workspace_limits(ws)
    return UsageOut(
        used_this_month=count_monthly_usage(db, workspace_id),
        monthly_limit=lim,
        active_documents=count_active_documents(db, workspace_id),
        max_active_documents=max_docs,
    )
