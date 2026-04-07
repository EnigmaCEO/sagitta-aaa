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
  title: "Sagitta AAA for DAOs — Policy-Driven DAO Treasury Allocation",
  description:
    "Turn DAO governance votes into enforceable, auditable allocation policy. Sagitta AAA is the policy-driven allocation engine for DAOs and on-chain governance organizations that need treasury discipline without custodial risk.",
  alternates: { canonical: "https://aaa.sagitta.systems/for-daos" },
  openGraph: {
    title: "Sagitta AAA for DAOs — Policy-Driven DAO Treasury Allocation",
    description:
      "Turn DAO governance votes into enforceable, auditable allocation policy. Sagitta AAA is the allocation engine for DAOs that need treasury discipline without custodial risk.",
    url: "https://aaa.sagitta.systems/for-daos",
  },
};

const FEATURES = [
  {
    title: "Governance votes become allocation rules",
    body: "Encode DAO governance outcomes directly into machine-checkable policy constraints. Eligibility limits, concentration caps, liquidity requirements, and regime behavior — all derived from mandate, not individual discretion.",
  },
  {
    title: "Eliminate ad-hoc treasury decisions",
    body: "Between governance cycles, treasury operators often fill gaps with undocumented judgment. AAA eliminates that gap. Policy is active and enforced continuously, not only when a vote is live.",
  },
  {
    title: "Audit-grade decision trails for token holders",
    body: "Every allocation decision produces a machine-readable record: constraints evaluated, signals considered, policy guards enforced. Token holders and stewards can verify that decisions match mandate — at any point in time.",
  },
  {
    title: "Authority-gated treasury access",
    body: "Not every contributor needs allocation authority. AAA separates read-only observation from sandbox experimentation from operational decision-making — matching responsibility to accountability.",
  },
  {
    title: "Non-custodial portfolio import",
    body: "Connect treasury wallets as read-only data sources. AAA normalizes on-chain holdings across supported chains without custody, signing permissions, or execution access.",
  },
  {
    title: "Scenario governance for volatile markets",
    body: "Define posture rules for different market regimes — conservative in drawdowns, neutral in stability, calibrated expansion when conditions permit. The allocator adapts within policy bounds without requiring ad-hoc intervention.",
  },
];

const FAQ_ITEMS = [
  {
    q: "Does AAA require custody of DAO treasury assets?",
    a: "No. AAA imports wallet state as read-only portfolio data. It produces allocation decisions as outputs. Execution remains fully separate and under your control.",
  },
  {
    q: "How does AAA enforce governance policy between votes?",
    a: "Policy constraints encoded in AAA remain active continuously. Between governance cycles, allocation outputs are constrained to the last ratified mandate — preventing discretionary drift during quiet periods.",
  },
  {
    q: "Can multiple contributors view allocation decisions without acting on them?",
    a: "Yes. Observer access provides full read-only visibility into allocation outcomes, risk analysis, and decision traces — without any authority to modify policy or act on decisions.",
  },
  {
    q: "How are allocation decision records used in DAO governance?",
    a: "Decision records are machine-readable outputs that document what constraints were applied, what the allocation resolved to, and why. They are suitable for governance review, steward accountability, and treasury reporting.",
  },
];

export default function ForDAOsPage() {
  return (
    <PublicPage>
      <StructuredData data={ORGANIZATION_SCHEMA} />
      <StructuredData
        data={breadcrumbSchema([
          { name: "Home", url: "https://aaa.sagitta.systems/" },
          { name: "For DAOs", url: "https://aaa.sagitta.systems/for-daos" },
        ])}
      />

      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "For DAOs" }]} />

      <PageHeader
        eyebrow="DAOs &amp; On-Chain Governance"
        title="Policy-driven DAO treasury allocation engine"
        lead="DAOs don't fail because of bad intent. They fail because discretionary treasury execution drifts from mandate. Sagitta AAA converts governance votes into enforceable allocation policy — executed consistently, documented automatically, and defensible under scrutiny."
      />

      <section aria-labelledby="problem-heading">
        <h2 id="problem-heading" style={{ fontSize: 22, fontWeight: 600, color: "#e6edf3", marginBottom: 14 }}>
          The DAO treasury problem
        </h2>
        <p style={{ fontSize: 15, color: "rgba(255,255,255,0.75)", lineHeight: 1.65, maxWidth: 800, marginBottom: 14 }}>
          Governance votes establish mandates. But mandates don&apos;t automatically govern capital behavior. Between votes, treasury operations are often managed through informal consensus, Notion docs, and individual judgment — none of which are enforceable, auditable, or consistent.
        </p>
        <p style={{ fontSize: 15, color: "rgba(255,255,255,0.75)", lineHeight: 1.65, maxWidth: 800 }}>
          The result: allocation decisions that can&apos;t be explained to token holders, treasury behavior that drifts from ratified policy, and no systematic record of why specific decisions were made. Sagitta AAA treats allocation policy as executable doctrine — not suggestions, but enforced constraints.
        </p>
      </section>

      <SectionTitle>What AAA gives DAOs</SectionTitle>
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

      <SectionTitle>How it works for a DAO treasury</SectionTitle>
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
        <li><strong style={{ color: "#e6edf3" }}>Define policy from governance output.</strong> Encode ratified mandates as explicit constraints: asset eligibility, exposure limits, liquidity floors, and concentration caps.</li>
        <li><strong style={{ color: "#e6edf3" }}>Import treasury wallet state.</strong> Connect treasury wallets as read-only data sources. AAA normalizes holdings into a consistent policy model across chains.</li>
        <li><strong style={{ color: "#e6edf3" }}>Run allocation under policy constraints.</strong> AAA resolves allocation outputs deterministically — the same policy, applied to the same portfolio state, always produces the same result.</li>
        <li><strong style={{ color: "#e6edf3" }}>Review and approve the decision record.</strong> Before any execution, the decision record is available for steward review, governance reporting, and token holder audit.</li>
      </ol>

      <SectionTitle>Common questions</SectionTitle>
      <div style={{ display: "flex", flexDirection: "column", gap: 20, maxWidth: 800 }}>
        {FAQ_ITEMS.map((item) => (
          <div key={item.q} className="surface panel" style={{ borderRadius: 12 }}>
            <div style={{ fontSize: 15, fontWeight: 600, color: "#e6edf3", marginBottom: 8 }}>{item.q}</div>
            <p style={{ fontSize: 14, color: "rgba(255,255,255,0.7)", margin: 0, lineHeight: 1.6 }}>{item.a}</p>
          </div>
        ))}
      </div>

      <div style={{ marginTop: 48, display: "flex", flexWrap: "wrap", gap: 16 }}>
        <InternalLink href="/decision-records">How decision records work</InternalLink>
        <InternalLink href="/methodology">Methodology</InternalLink>
        <InternalLink href="/security">Security &amp; non-custody</InternalLink>
        <InternalLink href="/pricing">Access tiers and pricing</InternalLink>
      </div>

      <div className="surface-strong panel" style={{ marginTop: 52, borderRadius: 14 }}>
        <div style={{ fontSize: 20, fontWeight: 600, color: "#e6edf3", marginBottom: 10 }}>
          Evaluate AAA against your treasury policy
        </div>
        <p style={{ fontSize: 14, color: "rgba(255,255,255,0.7)", maxWidth: 680, marginBottom: 20 }}>
          Start with observer access to evaluate real allocation decisions under policy constraints. No custody. No commitment.
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
            Contact for DAO access
          </a>
        </div>
      </div>
    </PublicPage>
  );
}
