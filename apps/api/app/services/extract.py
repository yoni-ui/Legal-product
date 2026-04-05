import hashlib
import io

from docx import Document as DocxDocument
from pypdf import PdfReader


def sha256_bytes(data: bytes) -> str:
    return hashlib.sha256(data).hexdigest()


def extract_text(*, mime_type: str, data: bytes) -> tuple[str, int | None]:
    mt = mime_type.lower()
    if mt == "application/pdf":
        reader = PdfReader(io.BytesIO(data))
        parts: list[str] = []
        for page in reader.pages:
            t = page.extract_text() or ""
            parts.append(t)
        return "\n\n".join(parts).strip(), len(reader.pages)
    if mt in (
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "application/msword",
    ):
        doc = DocxDocument(io.BytesIO(data))
        paras = [p.text for p in doc.paragraphs if p.text.strip()]
        return "\n".join(paras).strip(), None
    raise ValueError(f"Unsupported mime type: {mime_type}")
