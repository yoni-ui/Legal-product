# Tebekaye API (FastAPI)

## Setup

```bash
cd apps/api
python -m venv .venv
# Windows: .venv\Scripts\activate
pip install -e ".[dev]"
```

## Run (development)

```bash
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

Health check: `GET http://localhost:8000/health`

## Environment

Copy repo root `.env.example` to `.env` and set at least `DATABASE_URL` before Phase 1 DB work.
