"""
Create premade local/test users + workspaces (idempotent).

Run after migrations:
  cd apps/api
  python scripts/seed_local_dev.py

REMOVE OR DISABLE THESE ACCOUNTS BEFORE PRODUCTION / PUBLIC DEMO.
They are for local QA and CI-style manual testing only.

Default logins (see also apps/web/src/lib/local-dev-credentials.ts):
  - dev@local.tebekaye / devlocal123
  - test@tebekaye.local / TestAccount123!
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

# --- Premade test accounts (DELETE THIS BLOCK / stop running seed before prod) ---
PREMADE_TEST_USERS: tuple[tuple[str, str, str, str], ...] = (
    # (email, password, display_name, workspace_name)
    ("dev@local.tebekaye", "devlocal123", "Local Dev", "Local workspace"),
    ("test@tebekaye.local", "TestAccount123!", "QA Test User", "Test workspace"),
)


def ensure_user_workspace(
    db,
    email: str,
    password: str,
    display_name: str,
    workspace_name: str,
) -> str:
    existing = db.query(User).filter(User.email == email).first()
    if existing:
        return f"skip: {email} (already exists, password not reset)"
    user = User(
        email=email,
        password_hash=hash_password(password),
        name=display_name,
    )
    db.add(user)
    db.flush()
    ws = Workspace(name=workspace_name, plan_tier="starter")
    db.add(ws)
    db.flush()
    db.add(WorkspaceMember(workspace_id=ws.id, user_id=user.id, role="owner"))
    return f"created: {email}"


def main() -> None:
    db = SessionLocal()
    try:
        lines: list[str] = []
        for email, password, name, ws_name in PREMADE_TEST_USERS:
            lines.append(ensure_user_workspace(db, email, password, name, ws_name))
        db.commit()
        print("Premade test users (remove before production):")
        for email, password, _, _ in PREMADE_TEST_USERS:
            print(f"  {email}  /  {password}")
        print("—")
        for line in lines:
            print(line)
    except Exception:
        db.rollback()
        raise
    finally:
        db.close()


if __name__ == "__main__":
    main()
