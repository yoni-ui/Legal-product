"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { api, getToken, getWorkspaceId } from "@/lib/api";

type Tpl = {
  id: string;
  slug: string;
  title: string;
  category: string;
  is_free: boolean;
  body_md: string;
};

export default function TemplatesPage() {
  const ws = getWorkspaceId();
  const [list, setList] = useState<Tpl[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!ws || !getToken()) return;
    api<Tpl[]>(`/templates?workspace_id=${ws}`)
      .then(setList)
      .catch((e) => setError(e instanceof Error ? e.message : "Failed"));
  }, [ws]);

  if (!ws || !getToken()) {
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
      <h1 className="font-headline text-2xl font-bold text-on-surface">Templates</h1>
      {error && <p className="text-red-600 dark:text-red-400">{error}</p>}
      <ul className="space-y-4">
        {list.map((t) => (
          <li key={t.id} className="app-card">
            <h2 className="font-headline font-semibold text-on-surface">{t.title}</h2>
            <p className="text-xs text-on-surface-variant">
              {t.category} {t.is_free ? "· Free" : "· Pro"}
            </p>
            <pre className="mt-2 max-h-40 overflow-auto whitespace-pre-wrap text-xs text-on-surface-variant">
              {t.body_md.slice(0, 600)}
              {t.body_md.length > 600 ? "…" : ""}
            </pre>
          </li>
        ))}
      </ul>
    </div>
  );
}
