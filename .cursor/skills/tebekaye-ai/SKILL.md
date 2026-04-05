---
name: tebekaye-ai
description: >-
  AI and RAG for Tebekaye.ai — document extraction, chunking, embeddings,
  vector retrieval (pgvector or Chroma), LLM routing (Gemini/OpenAI), prompts,
  structured summaries and risk JSON, chat with citations, usage metering hooks.
  Use when editing ingest pipelines, rag/llm services, prompts, or document
  insights for Tebekaye.
---

# Tebekaye — AI / RAG

## Scope

- **In:** `apps/api/app/services/ingest/**`, `embeddings.py`, `vector_store.py`, `rag.py`, `llm/**`, `insights_service.py`, prompt templates.
- **Out:** HTTP route shapes only when necessary; primary API surface still owned by backend skill.

## Pipeline (mental model)

Extract text (PDF/DOCX) → normalize → chunk with overlap → embed → upsert vectors → retrieve top-k per query → LLM with **citations** → persist `document_insights` (cache) and append chat messages.

## Rules

- **Citations required** for chat answers when grounding on uploads; if evidence is missing, say so explicitly.
- **Cache** finalized summary/risk/clause outputs in Postgres (`document_insights` or equivalent), not only in the vector store.
- **Structured outputs** for risks/clauses (JSON schema) for stable UI rendering.
- **Metering:** call usage check before billable LLM/embed steps; record `usage_events` after success.
- Prompts and model IDs should be **versioned** (e.g. `prompt_version` column) for reproducibility.

## Guardrails

- Avoid absolute legal conclusions; frame as “may”, “consider reviewing”, with disclaimer alignment (not legal advice).
- Cap context size per plan tier; truncate or summarize retrieval if over budget.

## Definition of done

- Idempotent “insights” run for same `content_hash` unless user triggers paid regenerate.
- Chunking tests on fixture PDFs/DOCX; retrieval returns chunks from the correct `workspace_id` only.
- Token/cost estimates noted in code or logs (aggregated, no PII).
