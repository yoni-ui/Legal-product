"""Plan limits — server source of truth (see docs/foundations.md)."""

from __future__ import annotations

import uuid
from datetime import UTC, datetime

from sqlalchemy import func
from sqlalchemy.orm import Session

from app.models import Document, DocumentStatus, UsageEvent, Workspace

STARTER_MONTHLY_EVENTS = 10
STARTER_MAX_ACTIVE_DOCS = 3
PROFESSIONAL_MONTHLY_EVENTS = 50
BUSINESS_MONTHLY_EVENTS = 500


def _month_start() -> datetime:
    now = datetime.now(UTC)
    return now.replace(day=1, hour=0, minute=0, second=0, microsecond=0)


def count_monthly_usage(db: Session, workspace_id: uuid.UUID) -> int:
    start = _month_start()
    return (
        db.query(func.count())
        .select_from(UsageEvent)
        .filter(UsageEvent.workspace_id == workspace_id, UsageEvent.created_at >= start)
        .scalar()
        or 0
    )


def count_active_documents(db: Session, workspace_id: uuid.UUID) -> int:
    return (
        db.query(func.count())
        .select_from(Document)
        .filter(
            Document.workspace_id == workspace_id,
            Document.status.in_([DocumentStatus.uploaded, DocumentStatus.indexing, DocumentStatus.ready]),
        )
        .scalar()
        or 0
    )


def get_workspace_limits(ws: Workspace) -> tuple[int, int]:
    """Returns (monthly_event_limit, max_active_documents)."""
    tier = (ws.plan_tier or "starter").lower()
    if tier == "professional":
        return PROFESSIONAL_MONTHLY_EVENTS, 50
    if tier == "business":
        return BUSINESS_MONTHLY_EVENTS, 500
    return STARTER_MONTHLY_EVENTS, STARTER_MAX_ACTIVE_DOCS


def assert_can_use_ai(db: Session, ws: Workspace) -> None:
    limit, _ = get_workspace_limits(ws)
    used = count_monthly_usage(db, ws.id)
    if used >= limit:
        from fastapi import HTTPException, status

        raise HTTPException(
            status.HTTP_402_PAYMENT_REQUIRED,
            detail={"code": "LIMIT_EXCEEDED", "message": "Monthly AI usage limit reached", "upgrade": True},
        )


def assert_can_add_document(db: Session, ws: Workspace) -> None:
    _, max_docs = get_workspace_limits(ws)
    n = count_active_documents(db, ws.id)
    if n >= max_docs:
        from fastapi import HTTPException, status

        raise HTTPException(
            status.HTTP_402_PAYMENT_REQUIRED,
            detail={"code": "DOC_LIMIT_EXCEEDED", "message": "Active document limit reached", "upgrade": True},
        )


def record_usage(
    db: Session,
    *,
    workspace_id: uuid.UUID,
    user_id: uuid.UUID,
    event_type: str,
    document_id: uuid.UUID | None = None,
) -> None:
    ev = UsageEvent(
        workspace_id=workspace_id,
        user_id=user_id,
        event_type=event_type,
        document_id=document_id,
    )
    db.add(ev)
