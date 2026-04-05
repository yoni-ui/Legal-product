import Link from "next/link";

import { LocalDevHint } from "@/components/auth/LocalDevHint";
import { ThemeToggle } from "@/components/theme/ThemeToggle";

export function AuthPageShell({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <main className="relative min-h-screen overflow-hidden bg-background">
      <div className="landing-hero-gradient pointer-events-none absolute inset-0 opacity-90" aria-hidden />
      <div className="relative mx-auto flex min-h-screen max-w-md flex-col justify-center gap-6 px-6 py-20">
        <div className="absolute right-4 top-4 flex items-center gap-3 md:right-8 md:top-6">
          <Link
            href="/"
            className="font-headline text-sm font-medium text-on-surface-variant hover:text-primary"
          >
            Home
          </Link>
          <ThemeToggle variant="labeled" />
        </div>
        <div>
          <h1 className="font-headline text-3xl font-bold tracking-tight text-on-surface">{title}</h1>
          {subtitle && (
            <p className="mt-2 text-sm text-on-surface-variant">{subtitle}</p>
          )}
        </div>
        <LocalDevHint />
        <div className="app-card shadow-xl shadow-black/10 dark:shadow-black/40">{children}</div>
      </div>
    </main>
  );
}
