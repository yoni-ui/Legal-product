from datetime import datetime
from uuid import UUID

from pydantic import BaseModel


class TemplateListOut(BaseModel):
    id: UUID
    slug: str
    title: str
    category: str
    is_free: bool

    model_config = {"from_attributes": True}


class TemplateOut(BaseModel):
    id: UUID
    slug: str
    title: str
    category: str
    is_free: bool
    body_md: str
    variable_schema: dict | None
    created_at: datetime

    model_config = {"from_attributes": True}
