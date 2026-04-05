"""LLM helpers — uses OpenAI when OPENAI_API_KEY is set; otherwise deterministic stubs."""

from __future__ import annotations

import json
import re
from typing import Any

import httpx

from app.core.config import get_settings


def _openai_chat(messages: list[dict[str, str]], model: str = "gpt-4o-mini") -> str:
    settings = get_settings()
    if not settings.openai_api_key:
        return ""
    r = httpx.post(
        "https://api.openai.com/v1/chat/completions",
        headers={"Authorization": f"Bearer {settings.openai_api_key}"},
        json={"model": model, "messages": messages, "temperature": 0.2},
        timeout=120.0,
    )
    r.raise_for_status()
    data = r.json()
    return data["choices"][0]["message"]["content"] or ""


def generate_insights(document_text: str) -> tuple[str, list[dict[str, Any]], list[dict[str, Any]]]:
    """Returns summary_md, risks list, clauses list."""
    settings = get_settings()
    excerpt = document_text[:12000]
    if settings.openai_api_key:
        sys = (
            "You are a contract analyst. Not legal advice. "
            "Return ONLY valid JSON with keys: summary_md (markdown string), "
            "risks (array of {title, severity, detail}), "
            "clauses (array of {label, snippet})."
        )
        user = f"Analyze this contract excerpt:\n\n{excerpt}"
        raw = _openai_chat(
            [{"role": "system", "content": sys}, {"role": "user", "content": user}],
            model="gpt-4o-mini",
        )
        try:
            m = re.search(r"\{[\s\S]*\}", raw)
            payload = json.loads(m.group(0) if m else raw)
            return (
                str(payload.get("summary_md", "")),
                list(payload.get("risks") or []),
                list(payload.get("clauses") or []),
            )
        except Exception:
            pass
    summary = (
        "## Summary\n\n"
        + (excerpt[:1500] + ("…" if len(excerpt) > 1500 else ""))
        + "\n\n*(Connect `OPENAI_API_KEY` for AI-generated summaries.)*"
    )
    risks = [
        {
            "title": "Manual review recommended",
            "severity": "info",
            "detail": "No LLM configured — add OPENAI_API_KEY for automated risk highlights.",
        }
    ]
    clauses = [{"label": "Full text (truncated)", "snippet": excerpt[:800]}]
    return summary, risks, clauses


def answer_with_context(
    question: str,
    chunks: list[tuple[uuid.UUID, str]],
) -> tuple[str, list[dict[str, Any]]]:
    context = "\n\n---\n\n".join(f"[chunk:{cid}]\n{t}" for cid, t in chunks[:12])
    settings = get_settings()
    if settings.openai_api_key:
        sys = (
            "Answer using only the provided contract chunks. "
            "If insufficient, say you cannot find it. "
            "End with JSON line: CITATIONS: [{\"chunk_id\":\"uuid\",\"quote\":\"...\"}]"
        )
        user = f"Chunks:\n{context}\n\nQuestion: {question}"
        raw = _openai_chat(
            [{"role": "system", "content": sys}, {"role": "user", "content": user}],
            model="gpt-4o-mini",
        )
        cites: list[dict[str, Any]] = []
        if "CITATIONS:" in raw:
            main, cite_part = raw.rsplit("CITATIONS:", 1)
            try:
                cites = json.loads(cite_part.strip())
            except json.JSONDecodeError:
                cites = []
            return main.strip(), cites
        return raw.strip(), []
    # Stub: keyword match first chunk
    q = question.lower()
    best_idx = 0
    for i, (_, txt) in enumerate(chunks):
        if any(w in txt.lower() for w in q.split() if len(w) > 3):
            best_idx = i
            break
    cid, txt = chunks[best_idx]
    answer = (
        f"(Demo mode — set OPENAI_API_KEY for full answers.)\n\n"
        f"Closest excerpt:\n{txt[:600]}{'…' if len(txt) > 600 else ''}"
    )
    return answer, [{"chunk_id": str(cid), "quote": txt[:200]}]
