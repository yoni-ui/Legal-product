"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { ThemeToggle } from "@/components/theme/ThemeToggle";

const nav = [
  { href: "/app/dashboard", label: "Dashboard" },
  { href: "/app/documents", label: "Documents" },
  { href: "/app/templates", label: "Templates" },
  { href: "/app/billing", label: "Billing" },
] as const;

export function AppHeader() {
  const pathname = usePathname();

  return (
    <header className="border-b border-outline-variant/20 bg-background/90 shadow-lg shadow-black/10 backdrop-blur-xl dark:shadow-black/40">
      <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-4 px-4 py-3">
        <div className="flex flex-wrap items-center gap-6">
          <Link
            href="/app/dashboard"
            className="font-headline text-lg font-bold tracking-tight text-primary"
          >
            Tebekaye
          </Link>
          <nav className="flex flex-wrap gap-1 text-sm md:gap-3">
            {nav.map(({ href, label }) => {
              const active = pathname === href || pathname.startsWith(`${href}/`);
              return (
                <Link
                  key={href}
                  href={href}
                  className={`rounded-lg px-2 py-1 font-medium transition-colors md:px-3 ${
                    active
                      ? "bg-primary/15 text-primary"
                      : "text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface"
                  }`}
                >
                  {label}
                </Link>
              );
            })}
            <Link
              href="/"
              className="rounded-lg px-2 py-1 font-medium text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface md:px-3"
            >
              Home
            </Link>
          </nav>
        </div>
        <ThemeToggle />
      </div>
      <p className="mx-auto max-w-5xl px-4 pb-2 text-xs text-amber-800 dark:text-amber-200/90">
        Not legal advice — AI output is informational only.
      </p>
    </header>
  );
}
