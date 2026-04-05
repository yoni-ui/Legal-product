import uuid
from pathlib import Path

from app.core.config import get_settings


def ensure_upload_dir() -> Path:
    settings = get_settings()
    p = Path(settings.upload_dir)
    p.mkdir(parents=True, exist_ok=True)
    return p


def save_upload(workspace_id: uuid.UUID, document_id: uuid.UUID, filename: str, data: bytes) -> str:
    base = ensure_upload_dir() / str(workspace_id)
    base.mkdir(parents=True, exist_ok=True)
    safe_name = Path(filename).name.replace("..", "_")
    rel = f"{workspace_id}/{document_id}_{safe_name}"
    path = ensure_upload_dir() / rel
    path.write_bytes(data)
    return rel


def read_upload(storage_key: str) -> bytes:
    path = ensure_upload_dir() / storage_key
    return path.read_bytes()


def delete_upload(storage_key: str) -> None:
    path = ensure_upload_dir() / storage_key
    if path.is_file():
        path.unlink()
