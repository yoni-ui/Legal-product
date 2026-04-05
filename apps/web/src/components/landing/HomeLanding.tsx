import Link from "next/link";

import { ThemeToggle } from "@/components/theme/ThemeToggle";

function Icon({ name, className = "" }: { name: string; className?: string }) {
  return (
    <span className={`material-symbols-outlined ${className}`.trim()} aria-hidden>
      {name}
    </span>
  );
}

export function HomeLanding() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-background font-sans">
      <nav className="fixed top-0 z-50 w-full border-b border-outline-variant/10 bg-background/80 shadow-2xl shadow-black/50 backdrop-blur-xl">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-4 md:px-8">
          <Link href="/" className="font-headline text-xl font-bold tracking-tighter text-primary">
            Tebekaye.ai
          </Link>
          <div className="hidden items-center space-x-8 md:flex">
            <a
              className="border-b-2 border-primary pb-1 font-headline font-semibold tracking-tight text-primary"
              href="#features"
            >
              Features
            </a>
            <a
              className="font-headline tracking-tight text-on-surface-variant transition-colors hover:text-primary"
              href="#audiences"
            >
              Who it&apos;s for
            </a>
            <a
              className="font-headline tracking-tight text-on-surface-variant transition-colors hover:text-primary"
              href="#pricing"
            >
              Pricing
            </a>
            <a
              className="font-headline tracking-tight text-on-surface-variant transition-colors hover:text-primary"
              href="#faq"
            >
              FAQ
            </a>
          </div>
          <div className="flex items-center gap-3 md:gap-6">
            <ThemeToggle />
            <Link
              className="font-headline text-sm font-medium text-on-surface-variant transition-colors hover:text-primary"
              href="/login"
            >
              Log in
            </Link>
            <Link
              href="/signup"
              className="landing-cta-gradient rounded-xl px-5 py-2.5 font-headline text-sm font-bold text-[#0b2147] shadow-lg shadow-black/25 transition-all hover:shadow-black/35 active:scale-95"
            >
              Get started
            </Link>
          </div>
        </div>
      </nav>

      <main>
        <section className="relative flex min-h-screen flex-col justify-center overflow-hidden pt-24">
          <div className="landing-hero-gradient absolute inset-0" aria-hidden />
          <div className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 items-center gap-16 px-6 py-12 md:px-8 lg:grid-cols-2 lg:py-20">
            <div className="space-y-8">
              <div className="inline-flex items-center space-x-2 rounded-full border border-outline-variant/20 bg-surface-container-high px-4 py-1.5">
                <span className="h-2 w-2 animate-pulse rounded-full bg-primary" />
                <span className="text-xs font-semibold uppercase tracking-widest text-on-surface-variant">
                  Contract intelligence workspace
                </span>
              </div>
              <h1 className="font-headline text-4xl font-extrabold leading-[1.1] tracking-tighter text-on-surface sm:text-5xl md:text-6xl lg:text-7xl">
                Understand contracts with
                <br />
                <span className="text-primary">clarity and speed</span>
              </h1>
              <p className="max-w-xl text-lg leading-relaxed text-on-surface-variant md:text-xl">
                Upload agreements, get structured summaries and insights, and chat about your documents
                — with usage limits you control. Human review stays optional; Tebekaye does not provide
                legal advice.
              </p>
              <div className="flex flex-col gap-4 pt-2 sm:flex-row">
                <Link
                  href="/signup"
                  className="landing-cta-gradient rounded-xl px-8 py-4 text-center font-headline text-lg font-bold text-[#0b2147] shadow-xl shadow-black/25 transition-all active:scale-95"
                >
                  Create free account
                </Link>
                <Link
                  href="/login"
                  className="flex items-center justify-center gap-2 rounded-xl border border-outline-variant/30 bg-surface-container-high px-8 py-4 font-headline text-lg font-semibold text-on-surface transition-all hover:bg-surface-bright active:scale-95"
                >
                  <Icon name="login" />
                  Log in to app
                </Link>
              </div>
              <p className="text-xs uppercase tracking-[0.2em] text-on-surface-variant/60">
                Web app · Encrypted in transit · You own your uploads
              </p>
            </div>

            <div className="relative hidden lg:block">
              <div className="relative aspect-square overflow-hidden rounded-[3rem] border border-outline-variant/20 shadow-2xl shadow-black/60">
                <div
                  className="absolute inset-0 bg-gradient-to-br from-primary-container/30 via-surface-container to-surface"
                  aria-hidden
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
                <div className="absolute inset-8 flex flex-col justify-end rounded-2xl border border-outline-variant/20 bg-surface-container/80 p-8 backdrop-blur-sm">
                  <p className="font-headline text-sm font-semibold text-on-surface">Document workspace</p>
                  <p className="mt-2 text-sm text-on-surface-variant">
                    Indexing, insights, and chat tied to your workspace — ready when you open the
                    dashboard.
                  </p>
                </div>
              </div>
              <div className="landing-glass-panel absolute -bottom-8 -left-8 w-72 rounded-2xl border border-outline-variant/30 p-6 shadow-2xl">
                <div className="mb-4 flex items-center gap-3">
                  <Icon name="auto_awesome" className="text-primary" />
                  <span className="text-sm font-bold text-on-surface">Guided review</span>
                </div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">
                  Upload → index → insights → ask questions in chat
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="border-y border-outline-variant/10 bg-surface-container-lowest py-16 md:py-20">
          <div className="mx-auto max-w-7xl px-6 md:px-8">
            <div className="grid grid-cols-1 gap-10 text-center md:grid-cols-3 md:gap-12">
              <div className="space-y-2">
                <div className="font-headline text-4xl font-black text-primary md:text-5xl">One</div>
                <p className="font-medium text-on-surface-variant">Workspace for all active contracts</p>
              </div>
              <div className="space-y-2">
                <div className="font-headline text-4xl font-black text-primary md:text-5xl">Fast</div>
                <p className="font-medium text-on-surface-variant">Background indexing after each upload</p>
              </div>
              <div className="space-y-2">
                <div className="font-headline text-4xl font-black text-primary md:text-5xl">Clear</div>
                <p className="font-medium text-on-surface-variant">Usage meters and plan gates in-app</p>
              </div>
            </div>
          </div>
        </section>

        <section className="relative bg-surface-container-low py-24 md:py-32" id="features">
          <div className="mx-auto max-w-7xl px-6 md:px-8">
            <div className="mx-auto mb-14 max-w-2xl text-center md:mb-16">
              <h2 className="mb-4 font-headline text-3xl font-bold tracking-tight text-on-surface md:text-4xl">
                Built for real contract workflows
              </h2>
              <p className="text-on-surface-variant">
                Everything in the Tebekaye app is oriented around your documents: store, analyze, and
                iterate without losing context.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  icon: "upload_file",
                  title: "Secure uploads",
                  body: "PDF and Word go to your workspace; the API stores files locally (or your configured backend) and tracks status end to end.",
                },
                {
                  icon: "psychology",
                  title: "Insights & summaries",
                  body: "Structured outputs help you scan risk themes and key clauses — tuned to your plan and monthly usage caps.",
                },
                {
                  icon: "chat",
                  title: "Document-aware chat",
                  body: "Ask questions in context of indexed content. When no model key is set, responses stay in a safe stub mode for development.",
                },
                {
                  icon: "library_books",
                  title: "Templates",
                  body: "Starter plans unlock free templates; upgraded plans open the full library from the in-app templates screen.",
                },
                {
                  icon: "bar_chart",
                  title: "Usage you can see",
                  body: "Dashboard shows monthly AI usage and active document limits so teams know when to upgrade.",
                },
                {
                  icon: "verified_user",
                  title: "Billing when you need it",
                  body: "Stripe checkout from Billing upgrades Professional or Business — wire keys on the API to go live.",
                },
              ].map((f) => (
                <div
                  key={f.title}
                  className="group rounded-2xl border border-outline-variant/10 bg-surface-container p-8 transition-all hover:bg-surface-container-high"
                >
                  <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Icon name={f.icon} />
                  </div>
                  <h3 className="mb-3 font-headline text-xl font-bold text-on-surface">{f.title}</h3>
                  <p className="text-sm leading-relaxed text-on-surface-variant">{f.body}</p>
                </div>
              ))}
            </div>
            <div className="mt-12 text-center">
              <Link
                href="/app/dashboard"
                className="inline-flex items-center gap-2 font-headline font-semibold text-primary hover:underline"
              >
                Open app
                <Icon name="arrow_forward" className="text-base" />
              </Link>
              <span className="ml-2 text-sm text-on-surface-variant">(log in required)</span>
            </div>
          </div>
        </section>

        <section className="py-24 md:py-32" id="audiences">
          <div className="mx-auto max-w-7xl px-6 md:px-8">
            <h2 className="mb-12 text-center font-headline text-3xl font-bold tracking-tight text-on-surface md:mb-16 md:text-4xl">
              Who it&apos;s for
            </h2>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  icon: "person",
                  title: "Founders & ops",
                  body: "Move faster on vendor MSAs, NDAs, and hiring paperwork without a cluttered drive.",
                },
                {
                  icon: "balance",
                  title: "Legal & compliance",
                  body: "Use AI for first-pass structure and chat Q&A; keep counsel in the loop for decisions.",
                },
                {
                  icon: "business",
                  title: "Teams",
                  body: "Shared workspace model with clear limits — upgrade billing when volume grows.",
                },
                {
                  icon: "school",
                  title: "Students & researchers",
                  body: "Practice summarizing and comparing agreements with transparent, capped usage.",
                },
              ].map((a) => (
                <div
                  key={a.title}
                  className="landing-glass-panel rounded-3xl border border-outline-variant/10 p-8 text-center"
                >
                  <div className="mb-4 flex justify-center text-primary">
                    <Icon name={a.icon} className="!text-5xl" />
                  </div>
                  <h4 className="mb-2 text-xl font-bold text-on-surface">{a.title}</h4>
                  <p className="text-sm text-on-surface-variant">{a.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-surface-container-low py-24 md:py-32" id="use-cases">
          <div className="mx-auto max-w-7xl px-6 md:px-8">
            <div className="mb-12 max-w-2xl md:mb-16">
              <h2 className="mb-4 font-headline text-3xl font-bold tracking-tight text-on-surface md:text-4xl">
                Common document types
              </h2>
              <p className="text-on-surface-variant">
                Point the app at the agreements you already work with — the same upload → insight flow
                applies across domains.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              {[
                ["NDAs & confidentiality", "Mutual and one-way NDAs, data handling clauses."],
                ["Services & SOWs", "Deliverables, SLAs, and fee schedules."],
                ["Employment", "Offer letters, IP assignment, restrictive covenants."],
                ["Commercial leases", "Term, rent, renewal, and exit language."],
                ["Privacy & DPAs", "Subprocessors, SCCs, and breach terms."],
                ["Partnerships", "Revenue share, exclusivity, and termination."],
                ["Licensing", "Scope, royalties, and audit rights."],
                ["Amendments", "Track redlines and compare versions over time."],
              ].map(([title, desc]) => (
                <div
                  key={title}
                  className="rounded-xl border border-outline-variant/10 bg-surface p-6 transition-colors hover:border-primary/40"
                >
                  <div className="mb-2 font-bold text-primary">{title}</div>
                  <p className="text-xs text-on-surface-variant">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-24 md:py-32">
          <div className="mx-auto max-w-7xl px-6 md:px-8">
            <h2 className="mb-12 text-center font-headline text-3xl font-bold tracking-tight text-on-surface md:mb-16 md:text-4xl">
              Why teams try Tebekaye
            </h2>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              <div className="landing-glass-panel space-y-6 rounded-3xl border border-outline-variant/20 p-8">
                <div className="flex text-primary">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Icon key={i} name="star" className="fill-1" />
                  ))}
                </div>
                <p className="text-lg italic text-on-surface">
                  &ldquo;We stopped bouncing PDFs in email threads. One workspace plus chat cut review
                  prep time sharply for our ops team.&rdquo;
                </p>
                <p className="text-xs font-bold uppercase text-on-surface-variant">
                  Product & operations lead
                </p>
              </div>
              <div className="landing-glass-panel space-y-6 rounded-3xl border border-outline-variant/20 p-8">
                <div className="flex text-primary">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Icon key={i} name="star" className="fill-1" />
                  ))}
                </div>
                <p className="text-lg italic text-on-surface">
                  &ldquo;Usage limits are visible upfront. We knew when to upgrade instead of hitting a
                  wall mid-deal.&rdquo;
                </p>
                <p className="text-xs font-bold uppercase text-on-surface-variant">
                  Finance & legal coordinator
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-primary/5 py-20 md:py-24">
          <div className="mx-auto flex max-w-7xl flex-col items-center gap-12 px-6 md:flex-row md:px-8">
            <div className="flex-1 space-y-6 md:space-y-8">
              <h2 className="font-headline text-3xl font-extrabold leading-tight tracking-tight text-on-surface md:text-4xl lg:text-5xl">
                Your contract desk
                <br />
                <span className="text-primary">in the browser.</span>
              </h2>
              <p className="text-lg leading-relaxed text-on-surface-variant">
                No separate desktop client required. Log in from the marketing site, land on the
                dashboard, upload documents, and jump to templates or billing from the same shell.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/signup"
                  className="landing-cta-gradient rounded-xl px-6 py-3 font-headline font-bold text-[#0b2147] transition-all active:scale-95"
                >
                  Start for free
                </Link>
                <Link
                  href="/app/templates"
                  className="rounded-xl border border-outline-variant/30 bg-surface-container-high px-6 py-3 font-headline font-bold text-on-surface transition-all hover:bg-surface-bright"
                >
                  Browse templates
                </Link>
              </div>
            </div>
            <div className="flex flex-1 justify-center">
              <div className="relative flex h-[420px] w-56 items-center justify-center overflow-hidden rounded-[3rem] border-[8px] border-surface-variant bg-surface-container-highest shadow-2xl md:h-[480px] md:w-64">
                <div className="space-y-4 p-6 text-center">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/20">
                    <Icon name="description" className="!text-3xl text-primary" />
                  </div>
                  <div className="text-sm font-bold text-on-surface">Tebekaye</div>
                  <div className="text-[10px] text-on-surface-variant">Dashboard · Documents · Chat</div>
                  <div className="mx-auto h-2 w-28 rounded-full bg-primary/20" />
                  <div className="mx-auto h-2 w-20 rounded-full bg-primary/20" />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-24 md:py-32">
          <div className="mx-auto max-w-7xl px-6 md:px-8">
            <div className="mb-12 flex flex-col justify-between gap-6 md:mb-16 md:flex-row md:items-end">
              <div>
                <h2 className="mb-4 font-headline text-3xl font-bold tracking-tight text-on-surface md:text-4xl">
                  Policies & trust
                </h2>
                <p className="text-on-surface-variant">Read how we treat data and liability before you ship a deal.</p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Link href="/privacy" className="font-headline font-bold text-primary hover:underline">
                  Privacy
                </Link>
                <span className="text-on-surface-variant">·</span>
                <Link href="/terms" className="font-headline font-bold text-primary hover:underline">
                  Terms
                </Link>
                <span className="text-on-surface-variant">·</span>
                <Link href="/disclaimer" className="font-headline font-bold text-primary hover:underline">
                  Disclaimer
                </Link>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              <Link
                href="/privacy"
                className="group block rounded-2xl border border-outline-variant/10 bg-surface-container p-6 transition-colors hover:border-primary/30"
              >
                <div className="mb-4 aspect-video rounded-2xl bg-gradient-to-br from-surface-container-high to-surface-container" />
                <div className="mb-2 text-xs font-bold uppercase tracking-widest text-primary">Privacy</div>
                <h3 className="font-headline text-xl font-bold transition-colors group-hover:text-primary">
                  How we handle your data
                </h3>
                <p className="mt-3 line-clamp-2 text-sm text-on-surface-variant">
                  Understand what the web app stores and what stays on your infrastructure when self-hosted.
                </p>
              </Link>
              <Link
                href="/terms"
                className="group block rounded-2xl border border-outline-variant/10 bg-surface-container p-6 transition-colors hover:border-primary/30"
              >
                <div className="mb-4 aspect-video rounded-2xl bg-gradient-to-br from-primary/20 to-surface-container" />
                <div className="mb-2 text-xs font-bold uppercase tracking-widest text-primary">Terms</div>
                <h3 className="font-headline text-xl font-bold transition-colors group-hover:text-primary">
                  Agreement for using Tebekaye
                </h3>
                <p className="mt-3 line-clamp-2 text-sm text-on-surface-variant">
                  The rules of the road for accounts, billing hooks, and acceptable use.
                </p>
              </Link>
              <Link
                href="/disclaimer"
                className="group block rounded-2xl border border-outline-variant/10 bg-surface-container p-6 transition-colors hover:border-primary/30"
              >
                <div className="mb-4 aspect-video rounded-2xl bg-gradient-to-br from-surface-bright/40 to-surface-container" />
                <div className="mb-2 text-xs font-bold uppercase tracking-widest text-primary">Disclaimer</div>
                <h3 className="font-headline text-xl font-bold transition-colors group-hover:text-primary">
                  Not legal advice
                </h3>
                <p className="mt-3 line-clamp-2 text-sm text-on-surface-variant">
                  Outputs are informational; consult qualified counsel for decisions that bind you or your
                  company.
                </p>
              </Link>
            </div>
          </div>
        </section>

        <section className="bg-surface-container-low py-24 md:py-32" id="faq">
          <div className="mx-auto grid max-w-7xl grid-cols-1 gap-16 px-6 md:px-8 lg:grid-cols-2 lg:gap-20">
            <div>
              <h2 className="mb-8 font-headline text-3xl font-bold text-on-surface">Templates in the app</h2>
              <p className="mb-6 text-sm text-on-surface-variant">
                After sign-up, open <strong className="text-on-surface">Templates</strong> from the app shell.
                Starter workspaces see free templates; upgrades unlock the full catalog via billing.
              </p>
              <div className="space-y-4">
                <Link
                  href="/signup"
                  className="group flex cursor-pointer items-center justify-between rounded-xl border border-outline-variant/10 p-4 transition-colors hover:border-primary landing-glass-panel"
                >
                  <div className="flex items-center gap-4">
                    <Icon name="lock_open" className="text-primary" />
                    <span className="font-semibold text-on-surface">Create account for templates</span>
                  </div>
                  <Icon
                    name="arrow_forward"
                    className="opacity-0 transition-opacity group-hover:opacity-100"
                  />
                </Link>
                <Link
                  href="/app/templates"
                  className="group flex cursor-pointer items-center justify-between rounded-xl border border-outline-variant/10 p-4 transition-colors hover:border-primary landing-glass-panel"
                >
                  <div className="flex items-center gap-4">
                    <Icon name="library_books" className="text-primary" />
                    <span className="font-semibold text-on-surface">Go to templates (logged in)</span>
                  </div>
                  <Icon
                    name="arrow_forward"
                    className="opacity-0 transition-opacity group-hover:opacity-100"
                  />
                </Link>
              </div>
            </div>
            <div>
              <h2 className="mb-8 font-headline text-3xl font-bold text-on-surface">FAQ</h2>
              <div className="space-y-6">
                <div className="border-b border-outline-variant/10 pb-4">
                  <h4 className="mb-2 font-bold text-on-surface">Is Tebekaye legal advice?</h4>
                  <p className="text-sm text-on-surface-variant">
                    No. It helps you organize and explore contract text. For binding decisions, work with a
                    licensed attorney in your jurisdiction.
                  </p>
                </div>
                <div className="border-b border-outline-variant/10 pb-4">
                  <h4 className="mb-2 font-bold text-on-surface">How do I upgrade?</h4>
                  <p className="text-sm text-on-surface-variant">
                    Sign in and open <strong className="text-on-surface">Billing</strong>. With Stripe keys
                    configured on the API, checkout opens for Professional or Business plans.
                  </p>
                </div>
                <div className="border-b border-outline-variant/10 pb-4">
                  <h4 className="mb-2 font-bold text-on-surface">Where does my files live?</h4>
                  <p className="text-sm text-on-surface-variant">
                    The default API layout stores uploads under <code className="text-primary">data/uploads</code>{" "}
                    on the server you run. Adjust storage when you wire S3 or another backend.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-24 md:py-32" id="pricing">
          <div className="mx-auto max-w-7xl px-6 md:px-8">
            <div className="mx-auto mb-12 max-w-2xl text-center">
              <h2 className="mb-4 font-headline text-3xl font-bold tracking-tight text-on-surface md:text-4xl">
                Pricing
              </h2>
              <p className="text-on-surface-variant">
                Start on the included starter tier. Scale usage and template access when you connect Stripe
                and upgrade from Billing.
              </p>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3">
              {[
                {
                  name: "Starter",
                  blurb: "Free tier with caps — ideal for trying the flow.",
                  cta: "Sign up",
                  href: "/signup",
                  highlight: false,
                },
                {
                  name: "Professional",
                  blurb: "More AI usage and document room for growing teams.",
                  cta: "Upgrade in app",
                  href: "/app/billing",
                  highlight: true,
                },
                {
                  name: "Business",
                  blurb: "Highest limits and full template access.",
                  cta: "Upgrade in app",
                  href: "/app/billing",
                  highlight: false,
                },
              ].map((tier) => (
                <div
                  key={tier.name}
                  className={`flex flex-col rounded-2xl border border-outline-variant/10 p-8 ${
                    tier.highlight
                      ? "bg-surface-bright shadow-lg shadow-black/30 ring-1 ring-primary/30"
                      : "bg-surface-container"
                  }`}
                >
                  <h3 className="font-headline text-xl font-bold text-on-surface">{tier.name}</h3>
                  <p className="mt-4 flex-1 text-sm text-on-surface-variant">{tier.blurb}</p>
                  <Link
                    href={tier.href}
                    className={`mt-8 block rounded-xl py-3 text-center font-headline text-sm font-bold transition-all active:scale-95 ${
                      tier.highlight
                        ? "landing-cta-gradient text-[#0b2147]"
                        : "border border-outline-variant/30 bg-surface-container-high text-on-surface hover:bg-surface-bright"
                    }`}
                  >
                    {tier.cta}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 md:py-24">
          <div className="mx-auto max-w-7xl px-6 md:px-8">
            <div className="landing-cta-gradient relative overflow-hidden rounded-[2rem] p-10 text-center shadow-2xl md:p-16">
              <div className="pointer-events-none absolute right-0 top-0 p-8 opacity-20">
                <Icon name="verified_user" className="!text-[10rem]" />
              </div>
              <h2 className="relative z-10 font-headline text-3xl font-extrabold tracking-tighter text-[#0b2147] md:text-4xl lg:text-5xl">
                Ready to read contracts with less friction?
              </h2>
              <p className="relative z-10 mx-auto mt-4 max-w-xl text-lg text-[#0b2147]/85">
                Create an account, upload a document, and open insights from the dashboard.
              </p>
              <div className="relative z-10 mt-8 flex flex-col justify-center gap-4 sm:flex-row">
                <Link
                  href="/signup"
                  className="rounded-xl bg-[#0b2147] px-10 py-4 font-headline text-lg font-bold text-white transition-colors hover:bg-[#051a3d] active:scale-95"
                >
                  Create free account
                </Link>
                <Link
                  href="/login"
                  className="rounded-xl border border-[#0b2147]/35 px-10 py-4 font-headline text-lg font-bold text-[#0b2147] transition-colors hover:bg-[#0b2147]/10 active:scale-95"
                >
                  Log in
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="w-full border-t border-surface-container-low bg-background px-6 py-14 md:px-8 md:py-16">
        <div className="mx-auto mb-12 grid max-w-7xl grid-cols-1 gap-12 md:grid-cols-4">
          <div className="space-y-6 md:col-span-1">
            <div className="font-headline text-2xl font-bold tracking-tighter text-primary">Tebekaye.ai</div>
            <p className="text-sm leading-relaxed text-on-surface-variant">
              Contract understanding with AI assistance — informational only, not legal advice.
            </p>
          </div>
          <div>
            <h5 className="mb-6 font-bold text-on-surface">Product</h5>
            <ul className="space-y-4 text-sm text-on-surface-variant">
              <li>
                <a className="transition-colors hover:text-primary" href="#features">
                  Features
                </a>
              </li>
              <li>
                <Link className="transition-colors hover:text-primary" href="/app/templates">
                  Templates
                </Link>
              </li>
              <li>
                <Link className="transition-colors hover:text-primary" href="/app/billing">
                  Billing
                </Link>
              </li>
              <li>
                <a className="transition-colors hover:text-primary" href="#pricing">
                  Pricing
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h5 className="mb-6 font-bold text-on-surface">App</h5>
            <ul className="space-y-4 text-sm text-on-surface-variant">
              <li>
                <Link className="transition-colors hover:text-primary" href="/app/dashboard">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link className="transition-colors hover:text-primary" href="/app/documents">
                  Documents
                </Link>
              </li>
              <li>
                <Link className="transition-colors hover:text-primary" href="/login">
                  Log in
                </Link>
              </li>
              <li>
                <Link className="transition-colors hover:text-primary" href="/signup">
                  Sign up
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h5 className="mb-6 font-bold text-on-surface">Trust</h5>
            <ul className="space-y-4 text-sm text-on-surface-variant">
              <li>
                <Link className="transition-colors hover:text-primary" href="/privacy">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link className="transition-colors hover:text-primary" href="/terms">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link className="transition-colors hover:text-primary" href="/disclaimer">
                  Disclaimer
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 border-t border-outline-variant/10 pt-8 md:flex-row">
          <p className="text-center text-sm text-on-surface-variant font-headline md:text-left">
            © {new Date().getFullYear()} Tebekaye.ai. All rights reserved.
          </p>
          <p className="text-xs text-on-surface-variant/60">Outputs are not legal advice.</p>
        </div>
      </footer>
    </div>
  );
}
