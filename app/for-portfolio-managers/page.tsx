import type { Metadata } from "next";
import {
  PublicPage,
  Breadcrumbs,
  PageHeader,
  SectionTitle,
  FeatureCard,
  InternalLink,
} from "../../components/PublicLayout";
import {
  StructuredData,
  ORGANIZATION_SCHEMA,
  breadcrumbSchema,
} from "../../components/StructuredData";

export const metadata: Metadata = {
  title: "Sagitta AAA for Portfolio Managers — Non-Custodial Portfolio Allocation Intelligence",
  description:
    "Sagitta AAA gives crypto portfolio managers quant-grade allocation discipline with full transparency. Rule-based allocators, policy constraints, A/B strategy testing, and audit-ready decision records — without black-box risk.",
  alternates: { canonical: "https://aaa.sagitta.systems/for-portfolio-managers" },
  openGraph: {
    title: "Sagitta AAA for Portfolio Managers",
    description:
      "Non-custodial portfolio allocation intelligence for crypto fund managers. Policy constraints, A/B strategy testing, and audit-ready decision records.",
    url: "https://aaa.sagitta.systems/for-portfolio-managers",
  },
};

const FEATURES = [
  {
    title: "Wallet-native portfolio import",
    body: "Import live portfolio state from connected wallets across supported chains. AAA normalizes on-chain holdings into a consistent model for policy evaluation — read-only, no custody.",
  },
  {
    title: "Rule-based allocators with explicit constraints",
    body: "Define allocation strategies as policy rules: eligibility criteria, concentration limits, volatility bounds, liquidity requirements. The allocator resolves outputs within those constraints deterministically.",
  },
  {
    title: "A/B policy testing before capital exposure",
    body: "Run multiple allocator configurations against the same portfolio state. Compare strategy variants, measure expected churn, and evaluate regime sensitivity before selecting a target allocation.",
  },
  {
    title: "Audit-ready decision traces",
    body: "Every allocation output includes a complete decision record: constraints evaluated, signals weighed, and policy guards applied. Replayable at any point for review, reporting, or governance.",
  },
  {
    title: "Regime-aware scenario modeling",
    body: "Model allocation behavior across conservative, neutral, and expansion regimes. Understand how your policy performs under drawdown conditions before committing to a posture.",
  },
  {
    title: "Non-custodial portfolio governance",
    body: "AAA outputs decisions. It never holds keys or initiates execution. Decision logic and custody remain fully separated — critical for funds with existing OMS or execution infrastructure.",
  },
];

export default function ForPortfolioManagersPage() {
  return (
    <PublicPage>
      <StructuredData data={ORGANIZATION_SCHEMA} />
      <StructuredData
        data={breadcrumbSchema([
          { name: "Home", url: "https://aaa.sagitta.systems/" },
          { name: "For Portfolio Managers", url: "https://aaa.sagitta.systems/for-portfolio-managers" },
        ])}
      />

      <Breadcrumbs
        items={[{ label: "Home", href: "/" }, { label: "For Portfolio Managers" }]}
      />

      <PageHeader
        eyebrow="DeFi Portfolio Managers &amp; Crypto Funds"
        title="Non-custodial portfolio allocation intelligence for crypto funds"
        lead="You already take risk. The question is whether that risk is intentional, bounded, and reviewable — or discretionary and impossible to defend under scrutiny. Sagitta AAA gives systematic crypto funds a policy layer that makes allocation decisions legible, replayable, and institutionally defensible."
      />

      <section aria-labelledby="problem-heading">
        <h2 id="problem-heading" style={{ fontSize: 22, fontWeight: 600, color: "#e6edf3", marginBottom: 14 }}>
          The challenge for systematic crypto allocators
        </h2>
        <p style={{ fontSize: 15, color: "rgba(255,255,255,0.75)", lineHeight: 1.65, maxWidth: 800, marginBottom: 14 }}>
          Crypto markets move fast and most allocation tooling was built for manually managed portfolios: trackers that show balances, signal dashboards that aggregate sentiment, or proprietary models that can&apos;t be explained.
        </p>
        <p style={{ fontSize: 15, color: "rgba(255,255,255,0.75)", lineHeight: 1.65, maxWidth: 800 }}>
          Systematic funds need something different: a deterministic layer that enforces policy constraints, documents every decision, and allows strategy variants to be tested before capital is exposed. AAA provides exactly that — without custody, without black-box risk, and without execution permissions.
        </p>
      </section>

      <SectionTitle>Capabilities for portfolio managers</SectionTitle>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: 16,
          marginTop: 8,
        }}
      >
        {FEATURES.map((f) => (
          <FeatureCard key={f.title} title={f.title} body={f.body} />
        ))}
      </div>

      <SectionTitle>Positioning relative to other tools</SectionTitle>
      <p style={{ fontSize: 15, color: "rgba(255,255,255,0.75)", lineHeight: 1.65, maxWidth: 760, marginBottom: 16 }}>
        AAA is not a signal aggregator or a backtesting platform. It is a decision layer that takes your strategy expressed as policy constraints and resolves it deterministically against live portfolio state. The difference is institutional: signals inform discretion; policy constrains it.
      </p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 16, marginTop: 8 }}>
        <InternalLink href="/compare/aaa-vs-signal-tools">AAA vs signal tools</InternalLink>
        <InternalLink href="/compare/aaa-vs-manual-allocation">AAA vs manual allocation</InternalLink>
      </div>

      <SectionTitle>Access structure for funds</SectionTitle>
      <p style={{ fontSize: 15, color: "rgba(255,255,255,0.75)", lineHeight: 1.65, maxWidth: 760, marginBottom: 20 }}>
        Observer access is free and provides full read-only visibility into allocation decisions. Sandbox Authority ($79/month) enables policy creation, strategy testing, and persistent decision logs. Production Authority ($499/month) adds team-based controls, real-time agent workflows, and enforced policy guardrails for operational deployment.
      </p>
      <InternalLink href="/pricing">View all access tiers</InternalLink>

      <div className="surface-strong panel" style={{ marginTop: 52, borderRadius: 14 }}>
        <div style={{ fontSize: 20, fontWeight: 600, color: "#e6edf3", marginBottom: 10 }}>
          Test your allocation strategy before committing capital
        </div>
        <p style={{ fontSize: 14, color: "rgba(255,255,255,0.7)", maxWidth: 680, marginBottom: 20 }}>
          Start with observer access to evaluate AAA&apos;s allocation logic. Import portfolio state, review decisions, and understand how policy constraints resolve before moving to sandbox experimentation.
        </p>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <a
            href="/app"
            className="focus-ring cta-btn"
            style={{
              display: "inline-block",
              color: "#0b0b0b",
              background: "var(--sagitta-blue, #63D4FF)",
              border: "1px solid rgba(99,212,255,0.8)",
              textDecoration: "none",
              fontWeight: 700,
            }}
          >
            Launch evaluation
          </a>
          <a
            href="mailto:access@sagitta.systems"
            className="cta-outline focus-ring cta-btn"
            style={{ color: "#e6edf3", textDecoration: "none" }}
          >
            Request fund access
          </a>
        </div>
      </div>
    </PublicPage>
  );
}
