---
name: tebekaye-backend
description: >-
  Backend work for Tebekaye.ai FastAPI service — REST APIs, multi-tenant authz,
  document upload and storage, billing webhooks (Stripe/LakiPay), background
  workers, and pytest. Use when editing apps/api, Python services, webhooks,
  or server-side integration for Tebekaye.
---

# Tebekaye — Backend

## Scope

- **In:** `apps/api/**`, worker tasks, API contracts consumed by `apps/web`, integration tests under `apps/api/tests/`.
- **Out:** React/UI (use tebekaye-frontend), prompt design and RAG internals (use tebekaye-ai) unless wiring endpoints only.

## Stack assumptions

- FastAPI, Pydantic v2, async DB driver where applicable.
- Postgres (Supabase or standalone); object storage for uploads.
- Auth: JWT validation (custom or Supabase-issued); every data query scoped by `workspace_id`.

## Rules

- **Never** trust the client for plan limits or entitlements — enforce in middleware/dependencies before handlers run.
- **Always** return 404 (not 403) for cross-tenant resource access to avoid leaking existence.
- **Never** log raw document text, embeddings, or full prompts; log IDs and coarse metrics only.
- Use idempotent webhook handlers (safe to replay same event).

## Typical tasks

- New router under `app/routers/` + `schemas/` + service in `app/services/`.
- Upload: validate MIME/size → stream to storage → DB row → enqueue index job.
- Billing: create checkout session / portal URL; map webhook payload → `workspaces.subscription_status`.

## Definition of done

- Handler has Pydantic request/response models; errors are structured (code + message).
- Authz tested for forbidden cross-workspace access.
- OpenAPI remains accurate; breaking changes coordinated with frontend.
