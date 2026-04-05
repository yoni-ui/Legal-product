"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

import { api, getToken, getWorkspaceId } from "@/lib/api";

type Insights = {
  summary_md: string | null;
  risks_json: unknown;
  clauses_json: unknown;
};

type Msg = {
  id: string;
  role: string;
  content: string;
  citations_json: unknown;
};

export default function DocumentDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const ws = getWorkspaceId();
  const [insights, setInsights] = useState<Insights | null>(null);
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(() => {
    if (!ws || !id) return;
    api<Insights>(`/workspaces/${ws}/documents/${id}/insights`)
      .then(setInsights)
      .catch(() => setInsights(null));
    api<Msg[]>(`/workspaces/${ws}/documents/${id}/chat`)
      .then(setMessages)
      .catch(() => setMessages([]));
  }, [ws, id]);

  useEffect(() => {
    load();
    const t = setInterval(load, 5000);
    return () => clearInterval(t);
  }, [load]);

  async function sendChat(e: React.FormEvent) {
    e.preventDefault();
    if (!input.trim() || !ws) return;
    setError(null);
    try {
      await api(`/workspaces/${ws}/documents/${id}/chat`, {
        method: "POST",
        json: { message: input },
      });
      setInput("");
      load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Chat failed");
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
    <div className="space-y-8">
      <Link href="/app/documents" className="text-sm text-primary hover:underline">
        ← Documents
      </Link>
      <h1 className="font-headline text-2xl font-bold text-on-surface">Document</h1>

      <section className="app-card">
        <h2 className="font-headline font-semibold text-on-surface">Summary & analysis</h2>
        <div className="mt-2 max-w-none whitespace-pre-wrap text-sm leading-relaxed text-on-surface-variant">
          {insights?.summary_md ?? "Loading or processing…"}
        </div>
        {insights?.risks_json != null && (
          <pre className="mt-4 overflow-auto rounded-xl bg-code-bg p-3 text-xs text-on-surface">
            {JSON.stringify(insights.risks_json, null, 2)}
          </pre>
        )}
      </section>

      <section className="app-card">
        <h2 className="font-headline font-semibold text-on-surface">Chat</h2>
        <div className="mt-4 max-h-80 space-y-3 overflow-y-auto text-sm">
          {messages.map((m) => (
            <div
              key={m.id}
              className={
                m.role === "user"
                  ? "text-right text-on-surface"
                  : "text-on-surface-variant"
              }
            >
              <span className="font-mono text-xs text-on-surface-variant/80">{m.role}</span>
              <p className="whitespace-pre-wrap">{m.content}</p>
            </div>
          ))}
        </div>
        <form className="mt-4 flex flex-col gap-2 sm:flex-row" onSubmit={sendChat}>
          <input
            className="app-input flex-1"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about this document…"
          />
          <button type="submit" className="app-btn-primary shrink-0 px-6">
            Send
          </button>
        </form>
        {error && <p className="mt-2 text-sm text-red-600 dark:text-red-400">{error}</p>}
      </section>
    </div>
  );
}
