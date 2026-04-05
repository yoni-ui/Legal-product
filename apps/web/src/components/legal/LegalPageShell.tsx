import Link from "next/link";

import { ThemeToggle } from "@/components/theme/ThemeToggle";

export function LegalPageShell({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <main className="relative mx-auto min-h-screen max-w-2xl space-y-4 bg-background px-6 py-16 text-on-surface">
      <div className="absolute right-6 top-6 flex items-center gap-3">
        <Link href="/" className="text-sm text-on-surface-variant hover:text-primary">
          Home
        </Link>
        <ThemeToggle />
      </div>
      <h1 className="pt-8 font-headline text-2xl font-bold tracking-tight">{title}</h1>
      <div className="space-y-4 text-on-surface-variant">{children}</div>
    </main>
  );
}
