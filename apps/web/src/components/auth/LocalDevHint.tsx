"use client";

import { PREMADE_TEST_ACCOUNTS } from "@/lib/local-dev-credentials";

export function LocalDevHint() {
  if (process.env.NODE_ENV !== "development") {
    return null;
  }

  return (
    <div className="rounded-xl border border-primary/25 bg-primary/5 px-4 py-3 text-xs leading-relaxed text-on-surface-variant dark:border-primary/30 dark:bg-primary/10">
      <p className="font-headline font-semibold text-on-surface">Premade test logins (remove before production)</p>
      <p className="mt-2">
        From <code className="rounded bg-code-bg px-1 py-0.5 text-[11px]">apps/api</code>, run{" "}
        <code className="rounded bg-code-bg px-1 py-0.5 text-[11px]">python scripts/seed_local_dev.py</code>{" "}
        (Postgres + migrations). Then sign in with:
      </p>
      <ul className="mt-3 space-y-2 font-mono text-sm text-primary">
        {PREMADE_TEST_ACCOUNTS.map((a) => (
          <li key={a.email}>
            <span className="text-on-surface-variant">{a.label}:</span> {a.email}
            <span className="text-on-surface-variant"> · </span>
            {a.password}
          </li>
        ))}
      </ul>
    </div>
  );
}
