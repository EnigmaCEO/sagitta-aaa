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
  title: "Sagitta AAA for Treasury Operators — Crypto Treasury Risk Enforcement",
  description:
    "Sagitta AAA gives protocol foundations and ecosystem treasuries policy-driven allocation discipline that persists across stewards, committees, and market cycles. Crypto treasury risk enforcement without custodial risk.",
  alternates: { canonical: "https://aaa.sagitta.systems/for-treasury-operators" },
  openGraph: {
    title: "Sagitta AAA for Treasury Operators — Crypto Treasury Risk Enforcement",
    description:
      "Policy-driven allocation discipline for protocol foundations and ecosystem treasuries. Deterministic execution, audit-ready records, and governance continuity.",
    url: "https://aaa.sagitta.systems/for-treasury-operators",
  },
};

const FEATURES = [
  {
    title: "Policy constraints that persist across stewards",
    body: "Allocation mandates encoded in AAA are explicit, versioned, and enforced continuously — not dependent on individual operators or informal norms. Steward turnover doesn't reset treasury discipline.",
  },
  {
    title: "Deterministic execution aligned with committee decisions",
    body: "Treasury committees define acceptable behavior. AAA resolves allocations inside that permitted space deterministically. The same policy, applied to the same portfolio state, always produces the same output.",
  },
  {
    title: "Post-hoc justification for every treasury action",
    body: "Every allocation decision produces a complete, machine-readable record: constraints applied, portfolio state evaluated, and policy guards enforced. Suitable for governance reporting, auditor review, and stakeholder accountability.",
  },
  {
    title: "Risk enforcement without custody",
    body: "AAA operates as a read-only policy layer. It imports treasury wallet state as portfolio data, resolves allocation decisions, and emits outputs. No keys, no signing, no execution authority.",
  },
  {
    title: "Continuity enforcement through market cycles",
    body: "Define scenario behavior for different market regimes. Conservative postures in drawdowns. Neutral in stable periods. The allocator adapts within policy bounds without requiring ad-hoc committee intervention.",
  },
  {
    title: "Governance-grade separation of concerns",
    body: "Analysis, decision-making, and execution remain cleanly separated. Treasury operators review decisions before they proceed. The system enforces this separation structurally — not through trust.",
  },
];

export default function ForTreasuryOperatorsPage() {
  return (
    <PublicPage>
      <StructuredData data={ORGANIZATION_SCHEMA} />
      <StructuredData
        data={breadcrumbSchema([
          { name: "Home", url: "https://aaa.sagitta.systems/" },
          { name: "For Treasury Operators", url: "https://aaa.sagitta.systems/for-treasury-operators" },
        ])}
      />

      <Breadcrumbs
        items={[{ label: "Home", href: "/" }, { label: "For Treasury Operators" }]}
      />

      <PageHeader
        eyebrow="Protocol Foundations &amp; Ecosystem Treasuries"
        title="Treasury discipline that survives committees, steward turnover, and market cycles"
        lead="Foundations don't get second chances. A poorly governed treasury decision — undocumented, misaligned with mandate, or made under narrative pressure — can damage reputation, reduce reserve runway, or fail governance review. Sagitta AAA gives treasury operators enforceable policy, not opinions."
      />

      <section aria-labelledby="problem-heading">
        <h2 id="problem-heading" style={{ fontSize: 22, fontWeight: 600, color: "#e6edf3", marginBottom: 14 }}>
          The treasury governance gap
        </h2>
        <p style={{ fontSize: 15, color: "rgba(255,255,255,0.75)", lineHeight: 1.65, maxWidth: 800, marginBottom: 14 }}>
          Protocol foundations and ecosystem treasuries face a structural problem: governance votes establish policy, but nothing enforces it between votes. When markets move quickly, treasury operators face pressure to act — often informally, often without documentation, and often outside the bounds of ratified mandate.
        </p>
        <p style={{ fontSize: 15, color: "rgba(255,255,255,0.75)", lineHeight: 1.65, maxWidth: 800 }}>
          The result is drift: allocation behavior that diverges from governance intent over time, driven by market narrative, individual judgment, or simple inertia. Sagitta AAA treats the ratified mandate as the source of truth — and enforces it continuously, not just during active governance periods.
        </p>
      </section>

      <SectionTitle>What AAA provides for treasury operations</SectionTitle>
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

      <SectionTitle>Treasury decision workflow</SectionTitle>
      <ol
        style={{
          fontSize: 15,
          color: "rgba(255,255,255,0.75)",
          lineHeight: 1.65,
          paddingLeft: 20,
          maxWidth: 760,
          display: "flex",
          flexDirection: "column",
          gap: 12,
        }}
      >
        <li><strong style={{ color: "#e6edf3" }}>Encode committee policy.</strong> Define allocation constraints from ratified mandate: eligible assets, risk ceilings, liquidity requirements, rebalance bounds.</li>
        <li><strong style={{ color: "#e6edf3" }}>Import treasury wallet state.</strong> Connect treasury wallets read-only across supported chains. AAA builds a normalized portfolio model.</li>
        <li><strong style={{ color: "#e6edf3" }}>Resolve allocation deterministically.</strong> AAA applies policy to current portfolio state and generates an allocation output — constrained, consistent, explainable.</li>
        <li><strong style={{ color: "#e6edf3" }}>Review the decision record.</strong> Before anything is executed, the complete decision record is available for committee review, governance reporting, and stakeholder audit.</li>
        <li><strong style={{ color: "#e6edf3" }}>Route to execution separately.</strong> AAA outputs decisions. Your existing custody and execution infrastructure remains unchanged.</li>
      </ol>

      <div style={{ marginTop: 40, display: "flex", flexWrap: "wrap", gap: 16 }}>
        <InternalLink href="/decision-records">How decision records work</InternalLink>
        <InternalLink href="/security">Security and non-custody model</InternalLink>
        <InternalLink href="/methodology">Allocation methodology</InternalLink>
        <InternalLink href="/pricing">Pricing and access tiers</InternalLink>
      </div>

      <div className="surface-strong panel" style={{ marginTop: 52, borderRadius: 14 }}>
        <div style={{ fontSize: 20, fontWeight: 600, color: "#e6edf3", marginBottom: 10 }}>
          Evaluate against your treasury policy
        </div>
        <p style={{ fontSize: 14, color: "rgba(255,255,255,0.7)", maxWidth: 680, marginBottom: 20 }}>
          Observer access is free and provides full read-only visibility into allocation decisions under policy constraints. Understand how AAA resolves against your mandate before committing to any authority tier.
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
            Contact for institutional access
          </a>
        </div>
      </div>
    </PublicPage>
  );
}
