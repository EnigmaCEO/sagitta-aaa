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
  SOFTWARE_APPLICATION_SCHEMA,
  breadcrumbSchema,
} from "../../components/StructuredData";

export const metadata: Metadata = {
  title: "What Is Sagitta AAA",
  description:
    "Sagitta AAA is a policy-driven, non-custodial allocation and risk engine. It gives crypto-native institutions deterministic, audit-ready decision intelligence — without black-box automation.",
  alternates: { canonical: "https://aaa.sagitta.systems/what-is-aaa" },
  openGraph: {
    title: "What Is Sagitta AAA",
    description:
      "Sagitta AAA is a policy-driven, non-custodial allocation and risk engine. It gives crypto-native institutions deterministic, audit-ready decision intelligence.",
    url: "https://aaa.sagitta.systems/what-is-aaa",
  },
};

const CORE_PROPERTIES = [
  {
    title: "Policy-driven, not opinion-driven",
    body: "Every allocation output is the deterministic result of explicit policy rules, not a black-box signal. Constraints are versioned, enforceable, and auditable.",
  },
  {
    title: "Non-custodial by design",
    body: "AAA imports wallet state as read-only portfolio data. It never holds keys, requests signing permissions, or initiates execution. Decision output and custody are fully separated.",
  },
  {
    title: "Audit-ready decision traces",
    body: "Every decision AAA produces includes a machine-readable record of the inputs evaluated, constraints checked, and reasoning applied — replayable at any point.",
  },
  {
    title: "Authority-gated access",
    body: "Not everyone with access is authorized to act. AAA separates observation, experimentation, and operational authority across distinct access tiers — matching responsibility to control.",
  },
  {
    title: "Regime-aware reasoning",
    body: "Allocation policy is evaluated against scenario contexts — conservative, neutral, or expansion — so outputs reflect current market conditions rather than static assumptions.",
  },
  {
    title: "Institutional restraint",
    body: "AAA is built to enforce governance, not replace it. Humans define mandates. The system enforces them consistently.",
  },
];

export default function WhatIsAAAPage() {
  return (
    <PublicPage>
      <StructuredData data={[ORGANIZATION_SCHEMA, SOFTWARE_APPLICATION_SCHEMA]} />
      <StructuredData
        data={breadcrumbSchema([
          { name: "Home", url: "https://aaa.sagitta.systems/" },
          { name: "What Is AAA", url: "https://aaa.sagitta.systems/what-is-aaa" },
        ])}
      />

      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "What Is AAA" }]} />

      <PageHeader
        eyebrow="Sagitta AAA"
        title="A policy-driven allocation and risk engine for crypto-native institutions"
        lead="AAA is not a trading bot, a signals dashboard, or a portfolio tracker. It is decision infrastructure — a deterministic layer that converts policy into governed, auditable allocation outcomes."
      />

      <section aria-labelledby="problem-heading">
        <h2 id="problem-heading" style={{ fontSize: 22, fontWeight: 600, color: "#e6edf3", marginBottom: 16 }}>
          The problem it solves
        </h2>
        <p style={{ fontSize: 15, color: "rgba(255,255,255,0.75)", lineHeight: 1.65, maxWidth: 800, marginBottom: 16 }}>
          Crypto-native institutions — DAOs, protocol foundations, crypto funds, and asset managers — allocate capital in an environment with extreme volatility, fast governance cycles, and minimal procedural guardrails. Most fail not from lack of intelligence but from lack of enforceable discipline.
        </p>
        <p style={{ fontSize: 15, color: "rgba(255,255,255,0.75)", lineHeight: 1.65, maxWidth: 800, marginBottom: 16 }}>
          When allocation is discretionary, opaque, or personality-driven, decisions become impossible to defend under scrutiny. Governance votes don&apos;t translate into capital behavior. Treasuries drift. Portfolios take undocumented risks.
        </p>
        <p style={{ fontSize: 15, color: "rgba(255,255,255,0.75)", lineHeight: 1.65, maxWidth: 800 }}>
          AAA replaces discretionary drift with deterministic, policy-bound allocation intelligence. The same inputs produce the same outputs. Decisions can be audited, replayed, and explained without faith in a black box.
        </p>
      </section>

      <SectionTitle>Core properties</SectionTitle>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: 16,
          marginTop: 8,
        }}
      >
        {CORE_PROPERTIES.map((p) => (
          <FeatureCard key={p.title} title={p.title} body={p.body} />
        ))}
      </div>

      <SectionTitle>What AAA is not</SectionTitle>
      <ul
        style={{
          fontSize: 15,
          color: "rgba(255,255,255,0.72)",
          lineHeight: 1.65,
          paddingLeft: 20,
          maxWidth: 760,
          display: "flex",
          flexDirection: "column",
          gap: 8,
        }}
      >
        <li><strong style={{ color: "#e6edf3" }}>Not a custodial system.</strong> AAA never holds or moves assets. It outputs decisions. Execution is always separate.</li>
        <li><strong style={{ color: "#e6edf3" }}>Not a signal tool.</strong> AAA does not aggregate on-chain signals or social sentiment for alpha. It enforces allocation policy against portfolio state.</li>
        <li><strong style={{ color: "#e6edf3" }}>Not a generic portfolio tracker.</strong> AAA models allocation outcomes against explicit constraints — not just balances and P&amp;L.</li>
        <li><strong style={{ color: "#e6edf3" }}>Not fully autonomous by default.</strong> Autonomous operation requires explicit governance authorization. Humans govern. The system enforces.</li>
      </ul>

      <SectionTitle>Who uses it</SectionTitle>
      <p style={{ fontSize: 15, color: "rgba(255,255,255,0.72)", lineHeight: 1.65, maxWidth: 760, marginBottom: 20 }}>
        AAA is designed for organizations where allocation decisions carry institutional weight: DAOs encoding governance outcomes into capital policy, protocol foundations maintaining treasury discipline, crypto funds running systematic strategies, and TradFi institutions needing a policy layer between their risk controls and on-chain execution.
      </p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginTop: 8 }}>
        <InternalLink href="/for-daos">For DAOs</InternalLink>
        <InternalLink href="/for-portfolio-managers">For Portfolio Managers</InternalLink>
        <InternalLink href="/for-treasury-operators">For Treasury Operators</InternalLink>
      </div>

      <SectionTitle>How it fits into a workflow</SectionTitle>
      <p style={{ fontSize: 15, color: "rgba(255,255,255,0.72)", lineHeight: 1.65, maxWidth: 760, marginBottom: 16 }}>
        AAA sits between governance and execution. You define policy constraints — risk ceilings, concentration caps, liquidity requirements, scenario behavior. AAA resolves allocation outputs against those constraints deterministically, emits a decision record, and routes it through your approval workflow before anything touches execution.
      </p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginTop: 8 }}>
        <InternalLink href="/methodology">Read the methodology</InternalLink>
        <InternalLink href="/decision-records">How decision records work</InternalLink>
        <InternalLink href="/pricing">View access tiers</InternalLink>
      </div>

      <div
        className="surface-strong panel"
        style={{ marginTop: 52, borderRadius: 14 }}
      >
        <div style={{ fontSize: 20, fontWeight: 600, color: "#e6edf3", marginBottom: 10 }}>
          Start with observer access — no commitment required
        </div>
        <p style={{ fontSize: 14, color: "rgba(255,255,255,0.7)", maxWidth: 680, marginBottom: 20 }}>
          Observer access is free. Evaluate real allocation decisions generated under policy constraints, explore portfolio risk and weighting logic, and understand the system before committing to any authority tier.
        </p>
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
      </div>
    </PublicPage>
  );
}
