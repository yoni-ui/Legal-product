"use client";

import Link from "next/link";
import { useState } from "react";

import { api, getToken, getWorkspaceId } from "@/lib/api";

export default function BillingPage() {
  const ws = getWorkspaceId();
  const [msg, setMsg] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);

  async function checkout(plan: "professional" | "business") {
    if (!ws) return;
    setErr(null);
    setMsg(null);
    try {
      const { url } = await api<{ url: string }>(`/workspaces/${ws}/billing/checkout`, {
        method: "POST",
        json: { plan },
      });
      if (url) window.location.href = url;
      else setMsg("Checkout URL empty — configure Stripe keys and price IDs on the API.");
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Checkout failed");
    }
  }

  if (!getToken() || !ws) {
    return (
      <p>
        <Link href="/login" className="app-link">
          Log in
        </Link>
      </p>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="font-headline text-2xl font-bold text-on-surface">Billing</h1>
      <p className="text-sm text-on-surface-variant">
        Upgrade unlocks more AI usage, higher document limits, and the full template library (starter
        sees free templates only).
      </p>
      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          onClick={() => checkout("professional")}
          className="app-btn-primary px-6"
        >
          Upgrade to Professional
        </button>
        <button
          type="button"
          onClick={() => checkout("business")}
          className="app-btn-secondary px-6"
        >
          Upgrade to Business
        </button>
      </div>
      {msg && <p className="text-sm text-amber-800 dark:text-amber-200">{msg}</p>}
      {err && <p className="text-sm text-red-600 dark:text-red-400">{err}</p>}
    </div>
  );
}
