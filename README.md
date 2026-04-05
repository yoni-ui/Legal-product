# Tebekaye.ai

AI-powered contract understanding (and optional human review).

## Status (MVP scaffold)

Phases **0–5** are implemented in code (auth, documents, indexing, insights, chat, templates, Stripe checkout + webhook, app UI). **`npm run build` is not required for local dev** — use `npm run dev` for the web app.

## Database

1. `docker compose up -d` (Postgres + Redis).
2. Apply SQL migrations (order matters):

```bash
psql "postgresql://tebekaye:tebekaye_dev@localhost:5432/tebekaye" -f supabase/migrations/20260404120000_init_core.sql
psql "postgresql://tebekaye:tebekaye_dev@localhost:5432/tebekaye" -f supabase/migrations/20260404120001_seed_templates.sql
```

Or use any Postgres client with the same files.

3. **Optional — default local user** (skip signup): from `apps/api` after `pip install -e ".[dev]"`, run `python scripts/seed_local_dev.py`. Sign in at `/login` with **dev@local.tebekaye** / **devlocal123**.

## Quick start

1. Copy `.env.example` → `.env` at repo root; copy `apps/web/.env.local.example` → `apps/web/.env.local` (or set `NEXT_PUBLIC_API_URL` yourself).
2. `npm install` at repo root (free disk first if you hit `ENOSPC`).
3. `npm run dev` — web at http://localhost:3000
4. API: `cd apps/api && python -m venv .venv` → activate → `pip install -e ".[dev]"` → `uvicorn app.main:app --reload --port 8000`
5. Optional: set `OPENAI_API_KEY` in `.env` for real summaries/chat; otherwise stubs are used.
6. Optional: set `STRIPE_*` keys and price IDs for billing; webhook URL `POST /webhooks/stripe`.

## Monorepo layout

- `apps/web` — Next.js (marketing, legal pages, `/login`, `/signup`, `/app/*` dashboard)
- `apps/api` — FastAPI (JWT auth, uploads to `data/uploads`, background indexing)
- `supabase/migrations` — canonical SQL
- `content/templates/manifest.json` — editorial index (DB seed is source for runtime)

## Docs

- [`docs/foundations.md`](docs/foundations.md) — metering, caps, migration policy
- [`AGENTS.md`](AGENTS.md) — Cursor skills index
- Planning blueprint (local): `C:\Users\user\.cursor\plans\tebekaye_mvp_blueprint_c13396d4.plan.md`

## Clean npm install

Use **npm workspaces** only. Remove stray root `node_modules` (e.g. containing `.pnpm`), then `npm install` from the repo root.
