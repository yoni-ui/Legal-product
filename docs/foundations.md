# Tebekaye.ai — Phase 0 foundations

Single source of truth for product and technical decisions until they are moved into code or policy docs.

## Jurisdiction and positioning

- **Primary market (MVP):** US English templates and copy unless counsel approves another region.
- **Disclaimer:** Tebekaye does not provide legal advice. Outputs are informational; users should consult a qualified attorney for their situation.
- **Audience presets (onboarding):** business owner / freelancer vs legal professional — same product, different default prompt tone and UI density (Phase 3+).

## Query meter (billable events)

Define these server-side; the UI shows a single “AI usage” counter derived from them.

| Event type | Description | MVP default |
|------------|-------------|-------------|
| `initial_analysis_run` | First summary + risk + structured extract for a document version | Count **1** per new `content_hash` (or bundle into one “run”) |
| `chat_user_turn` | User message in document-grounded chat that calls the LLM | Count **1** per assistant reply |
| `regenerate_summary` | User explicitly regenerates insights | Count **1** per successful run |

Adjust after beta using `usage_events` analytics.

## Free tier caps (Starter)

| Limit | Value | Rationale |
|-------|-------|-----------|
| AI units / month | 10 (sum of billable events above) | Control LLM COGS |
| Active indexed documents | 3 | Bound storage + embedding cost |
| Max upload size | 10 MB (tune) | Abuse prevention |
| Max pages per document | 50 (tune) | Latency and token caps |

Paid tiers: see MVP plan (`Professional` / `Business`).

## Migration source of truth

- **Postgres schema:** `supabase/migrations/` (SQL) is the canonical migration path for this repo.
- **Alembic:** not used in parallel unless automated sync is added — avoid drift.

## Payment provider order

1. Integrate **one** provider first (Stripe *or* LakiPay Sandbox) and map to the same `plan_tier` + `subscription_status` on `workspaces`.
2. Add the second provider only after the first path is stable.

## Phase 0 exit criteria (checklist)

- [x] Monorepo root: npm `workspaces`, `.env.example`, `.gitignore`, Docker Compose for local Postgres/Redis.
- [x] This document approved / editable by the team.
- [x] Placeholder legal routes: Terms, Privacy, Disclaimer (copy is placeholder — replace with counsel-reviewed text).
- [x] App shells: `apps/web` (Next.js landing + legal pages), `apps/api` (`GET /health`), `packages/shared` stub.
- [ ] `npm install` completed locally and `package-lock.json` committed (blocked if machine is low on disk — see root README).
- [x] **Phases 1–5 (code):** FastAPI auth/workspaces/documents, background indexing + insights + chat, usage limits, template list + starter gating, Stripe checkout + webhook handlers, Next.js `/app/*` UI (see root `README.md`).
- [ ] **You still must:** apply SQL migrations to Postgres; configure `OPENAI_API_KEY` / `STRIPE_*` as needed; run end-to-end smoke tests on your machine.
- [ ] Stripe **test** Checkout end-to-end with real keys and `stripe listen` for webhooks (ops validation).
