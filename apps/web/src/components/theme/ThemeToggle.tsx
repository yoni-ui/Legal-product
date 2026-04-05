"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

type Props = {
  className?: string;
  /** Compact icon-only (default) or labeled */
  variant?: "icon" | "labeled";
};

export function ThemeToggle({ className = "", variant = "icon" }: Props) {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <span
        className={`inline-flex h-9 min-w-9 items-center justify-center rounded-xl border border-outline-variant/30 bg-surface-container-high ${className}`}
        aria-hidden
      />
    );
  }

  const cycle = () => {
    if (theme === "light") setTheme("dark");
    else if (theme === "dark") setTheme("system");
    else setTheme("light");
  };

  const icon =
    resolvedTheme === "dark" ? "dark_mode" : resolvedTheme === "light" ? "light_mode" : "routine";
  const label =
    theme === "system" ? "System" : resolvedTheme === "dark" ? "Dark" : "Light";

  return (
    <button
      type="button"
      onClick={cycle}
      className={`inline-flex items-center justify-center gap-2 rounded-xl border border-outline-variant/40 bg-surface-container-high px-3 py-2 text-on-surface transition-colors hover:border-primary/40 hover:bg-surface-bright ${className}`}
      title={`Theme: ${label} (click to cycle)`}
      aria-label={`Theme: ${label}. Click to cycle light, dark, and system.`}
    >
      <span className="material-symbols-outlined text-lg text-primary" aria-hidden>
        {icon}
      </span>
      {variant === "labeled" && (
        <span className="font-headline text-xs font-semibold">{label}</span>
      )}
    </button>
  );
}
