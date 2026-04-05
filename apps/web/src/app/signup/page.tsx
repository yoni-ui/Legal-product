"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { AuthPageShell } from "@/components/auth/AuthPageShell";
import { api, setToken, setWorkspaceId } from "@/lib/api";

export default function SignupPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    try {
      const tok = await api<{ access_token: string }>("/auth/register", {
        method: "POST",
        json: { email, password, name: name || undefined },
      });
      setToken(tok.access_token);
      const workspaces = await api<{ id: string }[]>("/workspaces");
      if (workspaces[0]) setWorkspaceId(workspaces[0].id);
      router.push("/app/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Signup failed");
    }
  }

  return (
    <AuthPageShell title="Create account" subtitle="Start a workspace for your contracts.">
      <form className="space-y-4" onSubmit={onSubmit}>
        <div>
          <label className="mb-1 block text-sm font-medium text-on-surface">Name (optional)</label>
          <input
            className="app-input"
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoComplete="name"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-on-surface">Email</label>
          <input
            className="app-input"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="email"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-on-surface">Password (min 8)</label>
          <input
            className="app-input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            minLength={8}
            required
            autoComplete="new-password"
          />
        </div>
        {error && <p className="text-sm text-red-600 dark:text-red-400">{error}</p>}
        <button type="submit" className="app-btn-primary w-full">
          Sign up
        </button>
      </form>
      <p className="mt-4 text-center text-sm text-on-surface-variant">
        Already have an account?{" "}
        <Link className="app-link" href="/login">
          Log in
        </Link>
      </p>
    </AuthPageShell>
  );
}
