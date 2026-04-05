---
name: tebekaye-qa
description: >-
  QA and test strategy for Tebekaye.ai — pytest for API and authz, Playwright
  or similar for E2E, webhook idempotency and billing regression, RAG smoke
  tests with fixture documents, and release checklists. Use when writing tests,
  validating PRs, or planning verification for Tebekaye.
---

# Tebekaye — QA

## Scope

- **In:** `apps/api/tests/**`, `apps/web` e2e folder when added, CI workflow test steps, manual beta checklists.
- **Collaboration:** file bugs with repro steps, expected vs actual, environment (plan tier, browser).

## Must-test areas

1. **Authz:** User A cannot read workspace B documents, chats, or insights (expect 404).
2. **Upload:** Valid PDF/DOCX accepted; oversize / wrong MIME rejected; storage key and DB row consistent.
3. **Indexing:** Document reaches `ready` or `failed` with visible error; re-upload creates new version behavior if implemented.
4. **RAG chat:** Answer includes citations from the uploaded doc; out-of-scope questions do not hallucinate clauses.
5. **Metering:** Free tier blocks at N queries with correct error code and UI handling.
6. **Billing:** Webhook replay does not double-apply state; cancel/downgrade updates entitlements within one refresh cycle.

## Test data

- Committed **small fixture files** (synthetic or public-domain) under `apps/api/tests/fixtures/` — no real client data.

## Definition of done

- Critical paths automated or explicitly listed in a manual checklist for MVP beta.
- Flakes documented; retries only where appropriate (avoid masking real bugs).
- Regression added for every production bug class when feasible.
