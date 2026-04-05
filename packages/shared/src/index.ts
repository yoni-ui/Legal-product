/**
 * Shared types and constants for Tebekaye web + API clients.
 * Server-side entitlements remain authoritative; this package is for UI labels and typing only.
 */

export type PlanTier = "starter" | "professional" | "business" | "enterprise";

export const PLAN_LABELS: Record<PlanTier, string> = {
  starter: "Starter",
  professional: "Professional",
  business: "Business",
  enterprise: "Enterprise",
};
