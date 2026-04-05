---
name: tebekaye-data
description: >-
  Data layer for Tebekaye.ai — Postgres/Supabase schema, migrations, RLS
  policies, pgvector tables, seed scripts, content/templates manifests,
  usage_events analytics, and ETL from template sources. Use when editing
  supabase/migrations, SQL seeds, vector table design, or analytics pipelines
  for Tebekaye.
---

# Tebekaye — Data

## Scope

- **In:** `supabase/migrations/**`, `supabase/seed.sql`, `scripts/*.py` for seeding, `content/templates/**` manifest schema, analytics exports or views.
- **Out:** Application business logic in Python/TS (coordinate with backend/frontend skills).

## Principles

- **Single migration source of truth** — prefer either Supabase migrations **or** Alembic for `apps/api`, not both diverging; document the choice in README.
- **Multi-tenancy:** all user-generated rows carry `workspace_id`; RLS policies match API authz rules when using Supabase.
- **pgvector:** embedding table keyed by `chunk_id` + `workspace_id`; index strategy documented (lists, IVFFlat/HNSW per vendor docs).
- **Append-only usage:** `usage_events` (or equivalent) for metering and cost attribution; avoid destructive edits.

## Template content

- `content/templates/manifest.json` drives seed: slug, title, category, `is_free`, `variable_schema`.
- Large template corpuses: incremental migrations or scripted imports, not one giant SQL file.

## Definition of done

- Migration applies cleanly on empty DB; rollback or forward-fix documented if rollback unsupported.
- RLS enabled and verified with test roles if using Supabase.
- Seed produces a minimal demo workspace + sample templates for local dev (optional but recommended).
