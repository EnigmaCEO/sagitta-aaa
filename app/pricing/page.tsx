import type { Metadata } from "next";
import Link from "next/link";
import {
  PublicPage,
  Breadcrumbs,
  PageHeader,
  SectionTitle,
  InternalLink,
} from "../../components/PublicLayout";
import {
  StructuredData,
  ORGANIZATION_SCHEMA,
  SOFTWARE_APPLICATION_SCHEMA,
  breadcrumbSchema,
} from "../../components/StructuredData";

export const metadata: Metadata = {
  title: "Pricing & Access Tiers — Sagitta AAA",
  description:
    "Sagitta AAA access is structured around authority levels — from free observer access to production authority with team controls and doctrine authority for autonomous institutional operation. View current pricing.",
  alternates: { canonical: "https://aaa.sagitta.systems/pricing" },
  openGraph: {
    title: "Pricing & Access Tiers — Sagitta AAA",
    description:
      "Observer access is free. Sandbox Authority $79/month. Production Authority $499/month. Enterprise doctrine authority for institutional operation.",
    url: "https://aaa.sagitta.systems/pricing",
  },
};

const TIERS = [
  {
    title: "Observer Access",
    meta: "Allocator v1",
    price: "Free",
    priceDetail: "No credit card required",
    copy: "Evaluate real allocation decisions generated under policy constraints. Understand portfolio risk, weighting logic, and scenario sensitivity with full transparency.",
    bullets: [
      "Policy-driven allocation outcomes",
      "Portfolio risk, churn, and weighting insights",
      "LLM explainers for decisions",
      "Multi-tick simulation results",
    ],
    cta: { label: "Launch evaluation", href: "/app" },
    highlight: false,
  },
  {
    title: "Sandbox Authority",
    meta: "Allocator v1–v2",
    price: "$79",
    priceDetail: "per month",
    copy: "Design and test allocation policies the way institutions do. Compare strategies, simulate regimes, and generate repeatable, auditable outcomes.",
    bullets: [
      "Policy creation with enforceable constraints",
      "Regime-aware scenario simulation",
      "Persistent decision logs for audit and review",
      "Wallet-native and custom portfolio imports",
    ],
    cta: { label: "Start Sandbox", href: "/auth/login?returnTo=%2Fbilling%3Fplan_key%3Dsandbox" },
    highlight: true,
  },
  {
    title: "Production Authority",
    meta: "Allocator v2–v3",
    price: "$499",
    priceDetail: "per month",
    copy: "Execute allocation decisions within controlled operational workflows. Team-based access, real-time agent mode, enforced policy guardrails, and the v3 governance allocator.",
    bullets: [
      "Team-based access with role controls",
      "Real-time Agent mode workflows",
      "Enforced policy and risk guardrails",
      "Version-controlled portfolio and policy updates",
    ],
    cta: { label: "Request access", href: "mailto:access@sagitta.systems" },
    highlight: false,
  },
  {
    title: "Doctrine Authority",
    meta: "Allocator v4–v6",
    price: "Enterprise",
    priceDetail: "Custom pricing",
    copy: "Autonomous operation under explicit doctrine with formal governance constraints, continuity enforcement, and system-level survivability guarantees.",
    bullets: [
      "Doctrine-bound autonomous execution",
      "Autonomous enforcement",
      "Custom SLA and support packages",
      "On-prem or sovereign-controlled deployment",
    ],
    cta: { label: "Contact us", href: "mailto:access@sagitta.systems" },
    highlight: false,
  },
];

const COMPARISON_ROWS = [
  { feature: "Policy-driven allocation outcomes", observer: true, sandbox: true, production: true, doctrine: true },
  { feature: "Portfolio risk and weighting insights", observer: true, sandbox: true, production: true, doctrine: true },
  { feature: "Policy creation and constraint definition", observer: false, sandbox: true, production: true, doctrine: true },
  { feature: "Persistent decision logs", observer: false, sandbox: true, production: true, doctrine: true },
  { feature: "Wallet-native portfolio import", observer: false, sandbox: true, production: true, doctrine: true },
  { feature: "Team-based access and role controls", observer: false, sandbox: false, production: true, doctrine: true },
  { feature: "Real-time Agent mode", observer: false, sandbox: false, production: true, doctrine: true },
  { feature: "Autonomous execution under doctrine", observer: false, sandbox: false, production: false, doctrine: true },
];

function Check() {
  return <span style={{ color: "var(--sagitta-blue, #63D4FF)", fontSize: 16 }}>✓</span>;
}
function Cross() {
  return <span style={{ color: "rgba(255,255,255,0.25)", fontSize: 14 }}>—</span>;
}

export default function PricingPage() {
  return (
    <PublicPage maxWidth={1120}>
      <StructuredData data={[ORGANIZATION_SCHEMA, SOFTWARE_APPLICATION_SCHEMA]} />
      <StructuredData
        data={breadcrumbSchema([
          { name: "Home", url: "https://aaa.sagitta.systems/" },
          { name: "Pricing", url: "https://aaa.sagitta.systems/pricing" },
        ])}
      />

      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Pricing" }]} />

      <PageHeader
        eyebrow="Access & pricing"
        title="Authority precedes automation"
        lead="AAA only operates autonomously when governance explicitly permits it. Access tiers match responsibility, risk tolerance, and governance maturity. Individuals qualify. Institutions govern."
      />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: 20,
          marginBottom: 56,
        }}
      >
        {TIERS.map((tier) => (
          <div
            key={tier.title}
            className={tier.highlight ? "surface-strong" : "surface"}
            style={{
              borderRadius: 16,
              padding: 24,
              display: "flex",
              flexDirection: "column",
              border: tier.highlight
                ? "1px solid rgba(99,212,255,0.35)"
                : "1px solid rgba(255,255,255,0.1)",
            }}
          >
            <div style={{ fontSize: 12, color: "rgba(255,255,255,0.55)", marginBottom: 12 }}>{tier.meta}</div>
            <div style={{ fontSize: 18, fontWeight: 700, color: "#e6edf3" }}>{tier.title}</div>
            <div style={{ marginTop: 12 }}>
              <span style={{ fontSize: 34, fontWeight: 700, color: "#ededed" }}>{tier.price}</span>
              {tier.priceDetail && (
                <span style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", marginLeft: 6 }}>
                  {tier.priceDetail}
                </span>
              )}
            </div>
            <p style={{ marginTop: 12, fontSize: 14, color: "rgba(255,255,255,0.7)", lineHeight: 1.55, flex: 1 }}>
              {tier.copy}
            </p>
            <ul
              style={{
                marginTop: 16,
                paddingLeft: 0,
                listStyle: "none",
                display: "flex",
                flexDirection: "column",
                gap: 8,
              }}
            >
              {tier.bullets.map((b) => (
                <li key={b} style={{ display: "flex", gap: 8, fontSize: 13, color: "rgba(255,255,255,0.75)", alignItems: "flex-start" }}>
                  <Check />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
            <div style={{ marginTop: 24 }}>
              {tier.cta.href.startsWith("mailto") ? (
                <a
                  href={tier.cta.href}
                  className="focus-ring cta-btn cta-outline"
                  style={{ display: "block", textAlign: "center", color: "#ededed", textDecoration: "none" }}
                >
                  {tier.cta.label}
                </a>
              ) : (
                <Link
                  href={tier.cta.href}
                  className={`focus-ring cta-btn ${tier.highlight ? "" : "cta-outline"}`}
                  style={{
                    display: "block",
                    textAlign: "center",
                    textDecoration: "none",
                    ...(tier.highlight
                      ? { color: "#0b0b0b", background: "var(--sagitta-blue, #63D4FF)", border: "1px solid rgba(99,212,255,0.8)", fontWeight: 700 }
                      : { color: "#ededed" }),
                  }}
                >
                  {tier.cta.label}
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>

      <SectionTitle>Feature comparison</SectionTitle>
      <div style={{ overflowX: "auto", marginTop: 8 }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
          <thead>
            <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.12)" }}>
              <th style={{ textAlign: "left", padding: "10px 16px 10px 0", color: "rgba(255,255,255,0.55)", fontWeight: 500, minWidth: 240 }}>
                Feature
              </th>
              {["Observer", "Sandbox", "Production", "Doctrine"].map((h) => (
                <th key={h} style={{ textAlign: "center", padding: "10px 16px", color: "rgba(255,255,255,0.55)", fontWeight: 500, minWidth: 110 }}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {COMPARISON_ROWS.map((row, i) => (
              <tr
                key={row.feature}
                style={{
                  borderBottom: "1px solid rgba(255,255,255,0.06)",
                  background: i % 2 === 0 ? "rgba(255,255,255,0.02)" : "transparent",
                }}
              >
                <td style={{ padding: "11px 16px 11px 0", color: "rgba(255,255,255,0.78)" }}>{row.feature}</td>
                <td style={{ textAlign: "center", padding: "11px 16px" }}>{row.observer ? <Check /> : <Cross />}</td>
                <td style={{ textAlign: "center", padding: "11px 16px" }}>{row.sandbox ? <Check /> : <Cross />}</td>
                <td style={{ textAlign: "center", padding: "11px 16px" }}>{row.production ? <Check /> : <Cross />}</td>
                <td style={{ textAlign: "center", padding: "11px 16px" }}>{row.doctrine ? <Check /> : <Cross />}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div style={{ marginTop: 48, display: "flex", flexWrap: "wrap", gap: 16 }}>
        <InternalLink href="/what-is-aaa">What is Sagitta AAA</InternalLink>
        <InternalLink href="/faq">Frequently asked questions</InternalLink>
        <InternalLink href="/security">Security and non-custody</InternalLink>
      </div>
    </PublicPage>
  );
}
