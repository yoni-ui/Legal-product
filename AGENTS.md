# Tebekaye.ai — agent and contributor index

Tebekaye is an AI-assisted contract understanding product (see root `README.md`). Use **Cursor Agent Skills** under `.cursor/skills/` so work stays aligned with stack boundaries.

## Skills (project-local)

| Skill | When to use |
|-------|-------------|
| [tebekaye-backend](.cursor/skills/tebekaye-backend/SKILL.md) | `apps/api`, FastAPI, webhooks, workers, tenancy, uploads |
| [tebekaye-ai](.cursor/skills/tebekaye-ai/SKILL.md) | RAG, chunking, embeddings, prompts, LLM, insights, chat quality |
| [tebekaye-frontend](.cursor/skills/tebekaye-frontend/SKILL.md) | `apps/web`, Next.js, UI, billing UX |
| [tebekaye-qa](.cursor/skills/tebekaye-qa/SKILL.md) | Tests, E2E, release checks, webhook regression |
| [tebekaye-data](.cursor/skills/tebekaye-data/SKILL.md) | Migrations, Supabase/RLS, vectors, seeds, templates manifest |

## Invoking in chat

- Mention the skill by name, e.g. *“Follow tebekaye-backend for this change.”*
- Cursor also matches skills using each `SKILL.md` **description** frontmatter.

## Planning reference

- **Phase 0 decisions** (jurisdiction, metering, caps, migration source): [`docs/foundations.md`](docs/foundations.md)
- MVP blueprint (local): `C:\Users\user\.cursor\plans\tebekaye_mvp_blueprint_c13396d4.plan.md`
