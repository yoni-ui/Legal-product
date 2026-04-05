"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { api, getToken, getWorkspaceId } from "@/lib/api";

type Usage = {
  used_this_month: number;
  monthly_limit: number;
  active_documents: number;
  max_active_documents: number;
};

export default function DashboardPage() {
  const [usage, setUsage] = useState<Usage | null>(null);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    const token = getToken();
    const ws = getWorkspaceId();
    if (!token || !ws) {
      setErr("Log in first.");
      return;
    }
    api<Usage>(`/workspaces/${ws}/usage`)
      .then(setUsage)
      .catch((e) => setErr(e instanceof Error ? e.message : "Failed"));
  }, []);

  if (err) {
    return (
      <div className="space-y-4">
        <p className="text-red-600 dark:text-red-400">{err}</p>
        <Link className="app-link" href="/login">
          Go to login
        </Link>
      </div>
    );
  }

  if (!usage) {
    return <p className="text-on-surface-variant">Loading…</p>;
  }

  return (
    <div className="space-y-6">
      <h1 className="font-headline text-2xl font-bold text-on-surface">Dashboard</h1>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="app-card">
          <h2 className="font-medium text-on-surface">AI usage (this month)</h2>
          <p className="mt-2 font-headline text-2xl font-bold text-primary">
            {usage.used_this_month} / {usage.monthly_limit}
          </p>
        </div>
        <div className="app-card">
          <h2 className="font-medium text-on-surface">Active documents</h2>
          <p className="mt-2 font-headline text-2xl font-bold text-primary">
            {usage.active_documents} / {usage.max_active_documents}
          </p>
        </div>
      </div>
      <div className="flex flex-wrap gap-3">
        <Link href="/app/documents" className="app-btn-primary inline-block px-6">
          Upload document
        </Link>
        <Link href="/app/templates" className="app-btn-secondary inline-block px-6">
          Browse templates
        </Link>
      </div>
    </div>
  );
}
