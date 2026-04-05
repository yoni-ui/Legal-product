"use client";

import { LOCAL_DEV_EMAIL, LOCAL_DEV_PASSWORD } from "@/lib/local-dev-credentials";

export function LocalDevHint() {
  if (process.env.NODE_ENV !== "development") {
    return null;
  }

  return (
    <div className="rounded-xl border border-primary/25 bg-primary/5 px-4 py-3 text-xs leading-relaxed text-on-surface-variant dark:border-primary/30 dark:bg-primary/10">
      <p className="font-headline font-semibold text-on-surface">Try the app locally</p>
      <p className="mt-2">
        From <code className="rounded bg-code-bg px-1 py-0.5 text-[11px]">apps/api</code>, run{" "}
        <code className="rounded bg-code-bg px-1 py-0.5 text-[11px]">python scripts/seed_local_dev.py</code>{" "}
        (with Postgres + migrations). Then sign in with:
      </p>
      <p className="mt-2 font-mono text-sm text-primary">
        {LOCAL_DEV_EMAIL}
        <span className="text-on-surface-variant"> · </span>
        {LOCAL_DEV_PASSWORD}
      </p>
    </div>
  );
}
