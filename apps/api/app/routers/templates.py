from typing import Annotated
from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy import or_
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.deps import get_current_user
from app.models import Template, User, WorkspaceMember, Workspace
from app.schemas.template import TemplateOut

router = APIRouter(prefix="/templates", tags=["templates"])


@router.get("", response_model=list[TemplateOut])
def list_templates(
    user: Annotated[User, Depends(get_current_user)],
    db: Annotated[Session, Depends(get_db)],
    workspace_id: UUID = Query(..., description="Workspace to evaluate plan against"),
    q: str | None = None,
) -> list[Template]:
    m = (
        db.query(WorkspaceMember)
        .filter(
            WorkspaceMember.workspace_id == workspace_id,
            WorkspaceMember.user_id == user.id,
        )
        .first()
    )
    if not m:
        raise HTTPException(status.HTTP_404_NOT_FOUND, "Workspace not found")
    ws = db.get(Workspace, workspace_id)
    assert ws
    tier = (ws.plan_tier or "starter").lower()
    query = db.query(Template)
    if tier == "starter":
        query = query.filter(Template.is_free.is_(True))
    if q:
        like = f"%{q}%"
        query = query.filter(or_(Template.title.ilike(like), Template.category.ilike(like)))
    return query.order_by(Template.title.asc()).all()


@router.get("/{slug}", response_model=TemplateOut)
def get_template(
    slug: str,
    user: Annotated[User, Depends(get_current_user)],
    db: Annotated[Session, Depends(get_db)],
    workspace_id: UUID = Query(...),
) -> Template:
    m = (
        db.query(WorkspaceMember)
        .filter(
            WorkspaceMember.workspace_id == workspace_id,
            WorkspaceMember.user_id == user.id,
        )
        .first()
    )
    if not m:
        raise HTTPException(status.HTTP_404_NOT_FOUND, "Workspace not found")
    ws = db.get(Workspace, workspace_id)
    assert ws
    t = db.query(Template).filter(Template.slug == slug).first()
    if not t:
        raise HTTPException(status.HTTP_404_NOT_FOUND, "Template not found")
    if (ws.plan_tier or "starter").lower() == "starter" and not t.is_free:
        raise HTTPException(status.HTTP_403_FORBIDDEN, "Upgrade to access this template")
    return t
