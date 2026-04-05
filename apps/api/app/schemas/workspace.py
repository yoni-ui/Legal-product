from uuid import UUID

from pydantic import BaseModel


class WorkspaceOut(BaseModel):
    id: UUID
    name: str
    plan_tier: str
    subscription_status: str | None

    model_config = {"from_attributes": True}


class UsageOut(BaseModel):
    used_this_month: int
    monthly_limit: int
    active_documents: int
    max_active_documents: int
