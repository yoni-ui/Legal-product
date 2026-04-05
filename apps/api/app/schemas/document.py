from datetime import datetime
from uuid import UUID

from pydantic import BaseModel, ConfigDict, Field

from app.models.document import DocumentStatus


class DocumentOut(BaseModel):
    model_config = ConfigDict(from_attributes=True, use_enum_values=True)
    id: UUID
    workspace_id: UUID
    title: str
    mime_type: str
    byte_size: int
    page_count: int | None
    status: DocumentStatus
    content_hash: str | None
    error_message: str | None
    created_at: datetime


class ChatMessageIn(BaseModel):
    message: str = Field(min_length=1, max_length=8000)


class ChatMessageOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: UUID
    role: str
    content: str
    citations_json: list | dict | None
    created_at: datetime


class InsightsOut(BaseModel):
    summary_md: str | None
    risks_json: list | dict | None
    clauses_json: list | dict | None
    model_id: str | None
    prompt_version: str | None
