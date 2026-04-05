"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

import { api, getToken, getWorkspaceId } from "@/lib/api";

type Doc = {
  id: string;
  title: string;
  status: string;
  mime_type: string;
  created_at: string;
};

export default function DocumentsPage() {
  const ws = getWorkspaceId();
  const [docs, setDocs] = useState<Doc[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  const load = useCallback(() => {
    if (!ws || !getToken()) return;
    api<Doc[]>(`/workspaces/${ws}/documents`)
      .then(setDocs)
      .catch((e) => setError(e instanceof Error ? e.message : "Failed"));
  }, [ws]);

  useEffect(() => {
    load();
    const t = setInterval(load, 4000);
    return () => clearInterval(t);
  }, [load]);

  async function onFile(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (!f || !ws) return;
    setUploading(true);
    setError(null);
    try {
      const fd = new FormData();
      fd.append("file", f);
      const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";
      const token = getToken();
      const res = await fetch(`${API_BASE}/workspaces/${ws}/documents`, {
        method: "POST",
        headers: token ? { Authorization: `Bearer ${token}` } : {},
        body: fd,
      });
      if (!res.ok) throw new Error(await res.text());
      load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  }

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
      <h1 className="font-headline text-2xl font-bold text-on-surface">Documents</h1>
      <div>
        <label className="app-btn-primary inline-block cursor-pointer">
          {uploading ? "Uploading…" : "Upload PDF or DOCX"}
          <input type="file" accept=".pdf,.docx" className="hidden" onChange={onFile} />
        </label>
      </div>
      {error && <p className="text-sm text-red-600 dark:text-red-400">{error}</p>}
      <ul className="divide-y divide-outline-variant/30 overflow-hidden rounded-2xl border border-outline-variant/30 bg-surface-container">
        {docs.length === 0 && (
          <li className="p-4 text-on-surface-variant">No documents yet.</li>
        )}
        {docs.map((d) => (
          <li key={d.id} className="flex items-center justify-between p-4 transition-colors hover:bg-surface-container-high">
            <div>
              <Link href={`/app/documents/${d.id}`} className="font-medium text-primary hover:underline">
                {d.title}
              </Link>
              <p className="text-xs text-on-surface-variant">
                {d.status} · {d.mime_type}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
