import { AppHeader } from "@/components/app/AppHeader";

export default function AppShellLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <AppHeader />
      <div className="mx-auto max-w-5xl px-4 py-8">{children}</div>
    </div>
  );
}
