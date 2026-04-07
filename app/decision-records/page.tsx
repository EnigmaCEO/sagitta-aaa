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
  title: "Allocation Decision Records — Audit-Ready Decision Traces in Sagitta AAA",
  description:
    "Every allocation decision in Sagitta AAA produces a machine-readable decision record: constraints evaluated, policy applied, and output resolved. Audit-ready allocation decisions for DAOs, portfolio managers, and treasury operators.",
  alternates: { canonical: "https://aaa.sagitta.systems/decision-records" },
  openGraph: {
    title: "Allocation Decision Records — Audit-Ready Decision Traces",
    description:
      "Every allocation decision in Sagitta AAA produces a machine-readable record. Constraints evaluated, policy applied, and output resolved — audit-ready for governance and compliance review.",
    url: "https://aaa.sagitta.systems/decision-records",
  },
};

const RECORD_FIELDS = [
  { field: "Portfolio snapshot", description: "The normalized portfolio state at the time of the decision: assets, balances, risk class assignments, and chain scope." },
  { field: "Policy version", description: "The versioned policy set applied: eligibility rules, concentration limits, liquidity requirements, and rebalance bounds." },
  { field: "Regime context", description: "The market regime declared at decision time — conservative, neutral, or expansion — and how it modified constraint sensitivity." },
  { field: "Constraint evaluation log", description: "A complete record of each policy constraint evaluated: what was checked, what the portfolio state was, and whether the constraint passed or flagged." },
  { field: "Allocator version", description: "The specific allocator version used to resolve the output. Multiple versions can be compared in A/B mode before one is selected." },
  { field: "Resolved allocation", description: "The target allocation output: per-asset weights, expected churn from current state, and sensitivity metrics." },
  { field: "Approval routing", description: "The authority level required to act on this decision, and the review status at the time of the record." },
  { field: "Timestamp and hash", description: "Immutable timestamp and content hash for the decision record, enabling replay and verification at any future point." },
];

export default function DecisionRecordsPage() {
  return (
    <PublicPage>
      <StructuredData data={ORGANIZATION_SCHEMA} />
      <StructuredData
        data={breadcrumbSchema([
          { name: "Home", url: "https://aaa.sagitta.systems/" },
          { name: "Decision Records", url: "https://aaa.sagitta.systems/decision-records" },
        ])}
      />

      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Decision Records" }]} />

      <PageHeader
        eyebrow="Audit-Ready Allocation"
        title="Allocation decision records"
        lead="In most allocation systems, decisions happen and then disappear — replaced by new positions without any record of what was evaluated, why, and under what constraints. Sagitta AAA treats every decision as a document: a structured, machine-readable record that can be reviewed, replayed, and defended at any time."
      />

      <section aria-labelledby="why-heading">
        <h2 id="why-heading" style={{ fontSize: 22, fontWeight: 600, color: "#e6edf3", marginBottom: 14 }}>
          Why decision records matter
        </h2>
        <p style={{ fontSize: 15, color: "rgba(255,255,255,0.75)", lineHeight: 1.65, maxWidth: 800, marginBottom: 14 }}>
          In capital allocation, defensibility is as important as performance. When a decision is questioned — by a governance committee, an auditor, a regulator, or a token holder — you need to be able to explain not just what was decided, but what constraints were active, what the portfolio state was, and what logic was applied.
        </p>
        <p style={{ fontSize: 15, color: "rgba(255,255,255,0.75)", lineHeight: 1.65, maxWidth: 800 }}>
          AAA produces that record automatically. It is not a log entry or a note — it is a structured document with all the data needed to replay and verify the decision independently. This is not a compliance feature. It is a fundamental property of deterministic allocation.
        </p>
      </section>

      <SectionTitle>What a decision record contains</SectionTitle>
      <div style={{ display: "flex", flexDirection: "column", gap: 12, maxWidth: 860 }}>
        {RECORD_FIELDS.map((item) => (
          <div
            key={item.field}
            className="surface panel"
            style={{ borderRadius: 12, display: "grid", gridTemplateColumns: "200px 1fr", gap: 16, alignItems: "start" }}
          >
            <div style={{ fontSize: 13, fontWeight: 600, color: "var(--sagitta-blue, #63D4FF)" }}>{item.field}</div>
            <p style={{ fontSize: 14, color: "rgba(255,255,255,0.7)", lineHeight: 1.6, margin: 0 }}>{item.description}</p>
          </div>
        ))}
      </div>

      <SectionTitle>How decision records are used</SectionTitle>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: 16,
          marginTop: 8,
          maxWidth: 900,
        }}
      >
        {[
          { title: "Governance reporting", body: "Submit decision records as evidence of mandate compliance to DAO token holders or foundation boards. Records are structured for both human review and machine verification." },
          { title: "Steward accountability", body: "Treasury stewards can demonstrate that allocations were constrained by ratified policy — not by individual judgment or informal consensus." },
          { title: "Regulatory and audit review", body: "Decision records provide auditors with a complete, structured account of allocation logic — the inputs, constraints, and outputs — at any point in time." },
          { title: "Policy iteration", body: "Historical decision records reveal how constraints performed under different conditions. They inform policy updates without requiring memory of undocumented decisions." },
        ].map((item) => (
          <div key={item.title} className="surface panel card-hover" style={{ borderRadius: 14 }}>
            <div style={{ fontSize: 15, fontWeight: 600, color: "#e6edf3", marginBottom: 10 }}>{item.title}</div>
            <p style={{ fontSize: 14, color: "rgba(255,255,255,0.7)", margin: 0, lineHeight: 1.55 }}>{item.body}</p>
          </div>
        ))}
      </div>

      <SectionTitle>Access to decision records</SectionTitle>
      <p style={{ fontSize: 15, color: "rgba(255,255,255,0.75)", lineHeight: 1.65, maxWidth: 760, marginBottom: 16 }}>
        Observer access provides read-only visibility into allocation decisions and their records. Sandbox Authority adds persistent decision logs. Production Authority adds team-based review workflows and approval gates before any decision proceeds to execution.
      </p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 16 }}>
        <InternalLink href="/pricing">View access tiers</InternalLink>
        <InternalLink href="/methodology">Full allocation methodology</InternalLink>
        <InternalLink href="/security">Security and non-custody</InternalLink>
      </div>
    </PublicPage>
  );
}
