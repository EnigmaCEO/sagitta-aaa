import type { Metadata } from "next";
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
  breadcrumbSchema,
} from "../../components/StructuredData";

export const metadata: Metadata = {
  title: "Allocation Methodology — How Sagitta AAA Makes Decisions",
  description:
    "How Sagitta AAA's policy-driven allocation engine works: deterministic resolution, constraint evaluation, scenario governance, and audit-ready decision traces. The methodology behind non-custodial portfolio allocation intelligence.",
  alternates: { canonical: "https://aaa.sagitta.systems/methodology" },
  openGraph: {
    title: "Allocation Methodology — How Sagitta AAA Makes Decisions",
    description:
      "The methodology behind Sagitta AAA: deterministic allocation, policy constraints, scenario governance, and audit-ready decision traces.",
    url: "https://aaa.sagitta.systems/methodology",
  },
};

const PRINCIPLES = [
  {
    title: "Determinism before discretion",
    body: "The same inputs — portfolio state, policy constraints, regime context — always produce the same allocation output. Determinism is the foundation of legibility: decisions can be audited, replayed, and explained without requiring faith in a model.",
  },
  {
    title: "Policy as executable doctrine",
    body: "Allocation policy is not a guideline or a suggestion. In AAA, policy is a set of machine-checkable constraints: asset eligibility rules, concentration caps, liquidity requirements, rebalance bounds, and regime-specific behavior. The allocator resolves outputs inside that constraint set.",
  },
  {
    title: "Regime awareness without abandoning rules",
    body: "Markets are not stationary. AAA models allocation as regime-aware: conservative postures in drawdown conditions, neutral in stability, calibrated expansion when conditions permit. Regime context adjusts constraint sensitivity — it doesn't override determinism.",
  },
  {
    title: "Separation of decision and execution",
    body: "AAA produces decisions. Execution is always separate. This is not an implementation choice — it is a design principle. Mixing decision intelligence with execution authority creates accountability problems that no audit trail can fix.",
  },
  {
    title: "Governance before automation",
    body: "Autonomous operation is the last tier, not the default. AAA is structured so that governance, authority qualification, and policy validation precede any form of automated execution. The allocator can be strong without being dangerous.",
  },
];

const PIPELINE_STEPS = [
  {
    step: "1",
    title: "Portfolio state ingestion",
    body: "Wallet balances are imported from connected chains and normalized into a policy-compatible portfolio model. Each asset is mapped to a risk class and role classification used in constraint evaluation.",
  },
  {
    step: "2",
    title: "Policy and regime configuration",
    body: "The operator defines or selects a versioned policy set: eligibility rules, exposure constraints, liquidity floors, concentration limits. A market regime is declared — conservative, neutral, or expansion — which adjusts constraint sensitivity.",
  },
  {
    step: "3",
    title: "Constraint evaluation",
    body: "The allocator evaluates the current portfolio state against all active policy constraints. Violations are flagged. Permitted allocation space is computed. All constraint evaluations are logged.",
  },
  {
    step: "4",
    title: "Allocation resolution",
    body: "Within the permitted space defined by policy, the allocator resolves a target allocation. Multiple allocator versions can be run and compared before a target is selected. Churn, sensitivity, and regime behavior are all measurable before commitment.",
  },
  {
    step: "5",
    title: "Decision record emission",
    body: "The output is not just an allocation — it is a decision record: a machine-readable document containing the inputs evaluated, constraints applied, allocator version used, and the resolved output. This record is the basis for review, governance reporting, and audit.",
  },
  {
    step: "6",
    title: "Approval and execution routing",
    body: "The decision record routes through the approval tier defined by the operator's authority level. At Production and Doctrine tiers, review gates are enforced before outputs proceed to downstream execution infrastructure.",
  },
];

export default function MethodologyPage() {
  return (
    <PublicPage>
      <StructuredData data={ORGANIZATION_SCHEMA} />
      <StructuredData
        data={breadcrumbSchema([
          { name: "Home", url: "https://aaa.sagitta.systems/" },
          { name: "Methodology", url: "https://aaa.sagitta.systems/methodology" },
        ])}
      />

      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Methodology" }]} />

      <PageHeader
        eyebrow="How AAA works"
        title="Deterministic allocation methodology"
        lead="AAA is not a black box. Every allocation output is the result of a defined pipeline: portfolio state in, policy constraints applied, decision record out. This page documents the methodology — what it does, what it assumes, and what it explicitly does not do."
      />

      <SectionTitle>Design principles</SectionTitle>
      <div style={{ display: "flex", flexDirection: "column", gap: 20, maxWidth: 860 }}>
        {PRINCIPLES.map((p) => (
          <div key={p.title} style={{ paddingBottom: 20, borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
            <h3 style={{ fontSize: 16, fontWeight: 600, color: "#e6edf3", marginBottom: 8 }}>{p.title}</h3>
            <p style={{ fontSize: 14, color: "rgba(255,255,255,0.72)", lineHeight: 1.65, margin: 0 }}>{p.body}</p>
          </div>
        ))}
      </div>

      <SectionTitle>The allocation pipeline</SectionTitle>
      <p style={{ fontSize: 15, color: "rgba(255,255,255,0.72)", lineHeight: 1.6, maxWidth: 760, marginBottom: 24 }}>
        Every allocation decision in AAA follows this pipeline. There are no shortcuts, no bypasses, and no undocumented steps.
      </p>
      <ol style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 16, maxWidth: 860 }}>
        {PIPELINE_STEPS.map((s) => (
          <li
            key={s.step}
            className="surface panel"
            style={{ borderRadius: 12, display: "grid", gridTemplateColumns: "40px 1fr", gap: 16, alignItems: "start" }}
          >
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: 10,
                background: "rgba(99,212,255,0.12)",
                border: "1px solid rgba(99,212,255,0.25)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 14,
                fontWeight: 700,
                color: "var(--sagitta-blue, #63D4FF)",
                flexShrink: 0,
              }}
            >
              {s.step}
            </div>
            <div>
              <div style={{ fontSize: 15, fontWeight: 600, color: "#e6edf3", marginBottom: 6 }}>{s.title}</div>
              <p style={{ fontSize: 14, color: "rgba(255,255,255,0.7)", lineHeight: 1.6, margin: 0 }}>{s.body}</p>
            </div>
          </li>
        ))}
      </ol>

      <SectionTitle>What the methodology explicitly excludes</SectionTitle>
      <ul
        style={{
          fontSize: 15,
          color: "rgba(255,255,255,0.72)",
          lineHeight: 1.65,
          paddingLeft: 20,
          maxWidth: 760,
          display: "flex",
          flexDirection: "column",
          gap: 10,
        }}
      >
        <li><strong style={{ color: "#e6edf3" }}>Execution.</strong> AAA does not initiate, sign, or broadcast transactions. All execution is handled externally.</li>
        <li><strong style={{ color: "#e6edf3" }}>Custody.</strong> AAA does not hold private keys or request signing permissions. Portfolio import is read-only.</li>
        <li><strong style={{ color: "#e6edf3" }}>Signal aggregation.</strong> AAA does not aggregate on-chain signals, social sentiment, or external data feeds for alpha. Policy constraints are the signal.</li>
        <li><strong style={{ color: "#e6edf3" }}>Discretionary overrides.</strong> The allocator does not support manual output overrides that bypass constraint evaluation. If policy needs to change, policy is updated through a versioned update — not through an undocumented runtime override.</li>
      </ul>

      <div style={{ marginTop: 40, display: "flex", flexWrap: "wrap", gap: 16 }}>
        <InternalLink href="/decision-records">How decision records are structured</InternalLink>
        <InternalLink href="/security">Security and non-custody details</InternalLink>
        <InternalLink href="/research-notes">Research notes on allocation theory</InternalLink>
      </div>
    </PublicPage>
  );
}
