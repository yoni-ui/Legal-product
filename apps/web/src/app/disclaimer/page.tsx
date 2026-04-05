import { LegalPageShell } from "@/components/legal/LegalPageShell";

export default function DisclaimerPage() {
  return (
    <LegalPageShell title="Disclaimer">
      <p>
        Tebekaye.ai provides software and AI-generated information only. It does{" "}
        <strong className="text-on-surface">not</strong> constitute legal advice, and no attorney-client
        relationship is formed. Consult a qualified attorney for your jurisdiction and situation.
      </p>
    </LegalPageShell>
  );
}
