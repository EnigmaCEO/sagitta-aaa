// app/(marketing)/page.tsx
import Link from "next/link";
import Image from "next/image";

export const runtime = "nodejs";

export default function MarketingPage() {
  return (
    <>
      {/* Full-width header (NOT inside the max-width content wrapper) */}
      <header style={{ width: "100%", borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
  <div style={{ maxWidth: "90%", margin: "0 auto", padding: "16px 32px" }}>
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%" }}>
      <Link href="/" style={{ display: "flex", alignItems: "center", gap: 12, minWidth: 0 }}>
        <Image src="/logo.png" alt="Sagitta AAA logo" width={100} height={100} priority />
        <span style={{ fontSize: 24, fontWeight: 900, whiteSpace: "nowrap", overflow: "hidden", 
          textOverflow: "ellipsis", color: "#ededed" }}>
          Sagitta Autonomous Allocation Agent
        </span>
      </Link>

      <form action="/auth/login" method="get" style={{ margin: 0 }}>
      <input type="hidden" name="returnTo" value="/app" />
        <button
          type="submit"
          className="btn-primary"
        >
          Sign in
        </button>
      </form>
    </div>
  </div>
</header>

      <main className="min-h-screen">
        <div className="mx-auto max-w-6xl px-8 py-24">
          {/* Hero */}
          <div className="mt-6 grid gap-10 md:grid-cols-2 md:items-center">
            <div>
              <h1 className="text-5xl md:text-6xl font-semibold leading-tight">
                Policy-driven allocation.
                <span className="block mt-3 text-lg opacity-80">
                  No human discretion under stress.
                </span>
              </h1>

              <p className="mt-6 max-w-3xl text-lg opacity-80">
                Sagitta AAA is an authority-gated allocation engine built for treasury
                operators and serious portfolio stewards. Build policies, run scenarios,
                and audit decisions end-to-end.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href="/auth/login"
                  className="rounded-md px-6 py-3 text-sm font-medium hover:opacity-90 btn-primary"
                >
                  Sign in to continue
                </Link>

                <a
                  href="#pricing"
                  className="rounded-md px-6 py-3 text-sm hover:opacity-90"
                >
                  View pricing
                </a>
              </div>
            </div>

            {/* Right column placeholder for balance */}
            <div className="hidden md:block rounded-xl bg-neutral-50/30 h-48" />
          </div>

          {/* Features */}
          <div className="mt-12 grid gap-6 sm:grid-cols-2 md:grid-cols-3">
            <div className="rounded-xl p-6">
              <div className="text-sm font-medium">Deterministic policies</div>
              <p className="mt-2 text-sm opacity-80">
                Constraints and scoring are explicit, testable, and repeatable across
                scenarios.
              </p>
            </div>

            <div className="rounded-xl  p-6">
              <div className="text-sm font-medium">Audit-ready decisions</div>
              <p className="mt-2 text-sm opacity-80">
                Trace why allocations changed, what signals mattered, and which guards
                enforced safety.
              </p>
            </div>

            <div className="rounded-xl  p-6">
              <div className="text-sm font-medium">Authority-gated control</div>
              <p className="mt-2 text-sm opacity-80">
                Sandbox → Production → Doctrine. People qualify for authority; they don’t
                “buy features.”
              </p>
            </div>
          </div>

          {/* Pricing */}
          <div id="pricing" className="mt-20">
            <h2 className="text-3xl font-semibold">Authority & pricing</h2>
            <p className="mt-3 max-w-3xl text-base opacity-80">
              AAA is priced by decision authority and accountability. These are baseline
              tiers for the marketing site — actual access is granted by review.
            </p>

            <div className="mt-8 grid gap-6 sm:grid-cols-2 md:grid-cols-3">
              <div className="rounded-xl  p-8">
                <div className="text-sm opacity-70">Sandbox Authority</div>
                <div className="mt-2 text-lg font-semibold">Allocator v1</div>
                <div className="mt-4 text-4xl font-semibold">$0</div>
                <div className="mt-2 text-sm opacity-70">
                  Open access · Non-production
                </div>
                <ul className="mt-5 space-y-2 text-sm opacity-80">
                  <li>Scenario simulation</li>
                  <li>Policy drafting</li>
                  <li>Read-only telemetry</li>
                </ul>
              </div>

              <div className="rounded-xl  p-8">
                <div className="text-sm opacity-70">Production Authority</div>
                <div className="mt-2 text-lg font-semibold">Allocator v2–v3</div>
                <div className="mt-4 text-4xl font-semibold">Contact</div>
                <div className="mt-2 text-sm opacity-70">Qualification required</div>
                <ul className="mt-5 space-y-2 text-sm opacity-80">
                  <li>Live decision workflow</li>
                  <li>Accountability controls</li>
                  <li>Expanded risk guards</li>
                </ul>
              </div>

              <div className="rounded-xl  p-8">
                <div className="text-sm opacity-70">Doctrine Authority</div>
                <div className="mt-2 text-lg font-semibold">Allocator v6</div>
                <div className="mt-4 text-4xl font-semibold">Enterprise</div>
                <div className="mt-2 text-sm opacity-70">Institutional controls</div>
                <ul className="mt-5 space-y-2 text-sm opacity-80">
                  <li>Autonomous operation under doctrine</li>
                  <li>Continuity/evacuation hooks</li>
                  <li>Formal governance constraints</li>
                </ul>
              </div>
            </div>

          </div>

          {/* Footer */}
          <footer className="mt-20 -t py-10 text-sm opacity-70">
            <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
              <div>© {new Date().getFullYear()} Sagitta Labs</div>
              <div className="flex flex-wrap gap-4">
                <a href="/terms" className="hover:underline">
                  Terms of Service
                </a>&nbsp;|&nbsp;
                <a href="/privacy" className="hover:underline">
                  Privacy Policy
                </a>
              </div>
            </div>
          </footer>
        </div>
      </main>
    </>
  );
}