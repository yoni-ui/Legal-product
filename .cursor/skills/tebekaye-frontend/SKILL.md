---
name: tebekaye-frontend
description: >-
  Frontend for Tebekaye.ai — Next.js App Router, React, Tailwind, dashboard,
  document upload and viewer, chat UI with citations, template variable forms,
  billing upgrade flows, and marketing pages. Use when editing apps/web or
  shared UI patterns for Tebekaye.
---

# Tebekaye — Frontend

## Scope

- **In:** `apps/web/**`, shared TS types re-exported from `packages/shared` when it exists.
- **Out:** Python/FastAPI (use tebekaye-backend); vector math and prompts (use tebekaye-ai).

## Stack assumptions

- Next.js App Router, TypeScript, Tailwind; server components where data is static, client components for upload/chat interactivity.
- API calls via a small `lib/api-client` with auth headers; never embed API secrets in client bundles.

## Rules

- **Plan limits** displayed from server-derived state (or safe public summary), not guessed client-side; handle `LIMIT_EXCEEDED` with upgrade UX.
- **Accessibility:** labels on form controls, focus management on modals, sufficient contrast.
- **Empty and loading states** for dashboard, documents, and chat threads.
- **Disclaimer** visible in authenticated shell (not legal advice).

## UX priorities

- Document lifecycle visible: `uploaded` → `indexing` → `ready` / `failed` with retry.
- Citations: click → highlight or drawer showing source snippet.
- Usage meter near chat or in header; soft prompt at ~80% of monthly quota.

## Definition of done

- No secrets in `NEXT_PUBLIC_*` except truly public keys (e.g. Stripe publishable).
- Responsive layout for core flows; no console errors on happy path.
- Types aligned with API responses (shared package or generated OpenAPI client when available).
