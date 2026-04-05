# Supabase / SQL migrations

**Canonical schema:** versioned SQL files in `migrations/` (see `docs/foundations.md`).

- Add files like `YYYYMMDDHHMMSS_description.sql`.
- For local Supabase CLI workflows, keep `config.toml` here when you adopt the CLI.
- **pgvector:** enable in a migration when Phase 2 indexing starts (`CREATE EXTENSION vector`).
