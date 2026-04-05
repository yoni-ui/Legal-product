"""
Create a default local user + workspace (idempotent).

Run from repo root after migrations:
  cd apps/api
  python scripts/seed_local_dev.py

Default login (local only):
  Email:    dev@local.tebekaye
  Password: devlocal123
"""
from __future__ import annotations

import os
import sys
from pathlib import Path

# App package root: apps/api
_API_ROOT = Path(__file__).resolve().parent.parent
os.chdir(_API_ROOT)
if str(_API_ROOT) not in sys.path:
    sys.path.insert(0, str(_API_ROOT))

# Load repo-root .env if present (DATABASE_URL, JWT_SECRET, etc.)
_root_env = _API_ROOT.parent.parent / ".env"
if _root_env.is_file():
    for line in _root_env.read_text(encoding="utf-8").splitlines():
        line = line.strip()
        if not line or line.startswith("#") or "=" not in line:
            continue
        k, _, v = line.partition("=")
        k, v = k.strip(), v.strip().strip('"').strip("'")
        if k and k not in os.environ:
            os.environ[k] = v

from app.core.security import hash_password
from app.db.session import SessionLocal
from app.models import User, Workspace, WorkspaceMember

DEV_EMAIL = "dev@local.tebekaye"
DEV_PASSWORD = "devlocal123"
DEV_NAME = "Local Dev"


def main() -> None:
    db = SessionLocal()
    try:
        existing = db.query(User).filter(User.email == DEV_EMAIL).first()
        if existing:
            print(f"Already exists: {DEV_EMAIL} (password unchanged)")
            return
        user = User(
            email=DEV_EMAIL,
            password_hash=hash_password(DEV_PASSWORD),
            name=DEV_NAME,
        )
        db.add(user)
        db.flush()
        ws = Workspace(name="Local workspace", plan_tier="starter")
        db.add(ws)
        db.flush()
        db.add(WorkspaceMember(workspace_id=ws.id, user_id=user.id, role="owner"))
        db.commit()
        print("Seeded local dev user:")
        print(f"  Email:    {DEV_EMAIL}")
        print(f"  Password: {DEV_PASSWORD}")
    finally:
        db.close()


if __name__ == "__main__":
    main()
