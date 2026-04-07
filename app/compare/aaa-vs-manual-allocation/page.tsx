import type { Metadata } from "next";
import {
  PublicPage,
  Breadcrumbs,
  PageHeader,
  SectionTitle,
  InternalLink,
} from "../../../components/PublicLayout";
import {
  StructuredData,
  ORGANIZATION_SCHEMA,
  breadcrumbSchema,
} from "../../../components/StructuredData";

export const metadata: Metadata = {
  title: "AAA vs Manual Allocation — Why Policy-Driven Beats Discretionary",
  description:
    "How Sagitta AAA compares to manual allocation workflows. Policy-driven allocation produces deterministic, auditable, and defensible decisions that discretionary approaches cannot match at institutional scale.",
  alternates: { canonical: "https://aaa.sagitta.systems/compare/aaa-vs-manual-allocation" },
  openGraph: {
    title: "AAA vs Manual Allocation — Why Policy-Driven Beats Discretionary",
    description:
      "Compare Sagitta AAA's policy-driven allocation engine against manual discretionary workflows. Determinism, auditability, and governance continuity.",
    url: "https://aaa.sagitta.systems/compare/aaa-vs-manual-allocation",
  },
};

const COMPARISON = [
  {
    dimension: "Consistency",
    manual: "Decisions vary with the individual, their stress level, and the prevailing narrative. The same situation on two different days may produce two different decisions.",
    aaa: "Identical inputs always produce identical outputs. Policy constraints are enforced mechanically, not interpreted situationally.",
  },
  {
    dimension: "Auditability",
    manual: "Decisions are hard to document retroactively. Meeting notes, chat messages, and spreadsheets are not audit trails.",
    aaa: "Every allocation produces a structured decision record: portfolio snapshot, policy version, constraint evaluation log, and resolved output — all machine-readable and timestamped.",
  },
  {
    dimension: "Governance alignment",
    manual: "Policy documents don't constrain execution. Treasury operators or fund managers may deviate from ratified mandate without realizing it.",
    aaa: "Policy is encoded as machine-checkable constraints. The allocator cannot produce outputs that violate active policy. Alignment is structural.",
  },
  {
    dimension: "Continuity across personnel changes",
    manual: "When a key person leaves, institutional memory about allocation rationale often leaves with them.",
    aaa: "Policy is versioned and explicit. Decision records are persistent. New operators work within the same documented constraint set.",
  },
  {
    dimension: "Stress testing",
    manual: "Manually modeling how different policies perform under regime changes is slow, inconsistent, and rarely done before capital is exposed.",
    aaa: "A/B policy comparison and regime simulation are built-in. Multiple allocation strategies can be tested against the same portfolio state before any commitment.",
  },
  {
    dimension: "Defensibility under scrutiny",
    manual: "Explaining a decision under governance review or to a regulator requires reconstructing reasoning that may not have been documented at the time.",
    aaa: "The decision record contains all the justification required: what constraints were active, what the portfolio state was, and why the allocation resolved as it did.",
  },
  {
    dimension: "Custody exposure",
    manual: "Manual allocation requires operators who can actually execute — often with signing permissions or direct access to execution infrastructure.",
    aaa: "Non-custodial by design. Decision authority and execution authority are fully separated. AAA never holds keys or requests signing permissions.",
  },
];

export default function AAAvsManualAllocationPage() {
  return (
    <PublicPage maxWidth={1040}>
      <StructuredData data={ORGANIZATION_SCHEMA} />
      <StructuredData
        data={breadcrumbSchema([
          { name: "Home", url: "https://aaa.sagitta.systems/" },
          { name: "Compare", url: "https://aaa.sagitta.systems/compare/aaa-vs-manual-allocation" },
          { name: "AAA vs Manual Allocation", url: "https://aaa.sagitta.systems/compare/aaa-vs-manual-allocation" },
        ])}
      />

      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Compare" },
          { label: "AAA vs Manual Allocation" },
        ]}
      />

      <PageHeader
        eyebrow="Comparison"
        title="AAA vs manual allocation"
        lead="Manual allocation is a default, not a strategy. It works until it doesn't — until a key person leaves, a governance vote is disputed, or an auditor asks why a specific decision was made. AAA is built for the environments where those questions are inevitable."
      />

      <SectionTitle>Head-to-head comparison</SectionTitle>
      <div style={{ overflowX: "auto", marginTop: 8 }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
          <thead>
            <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.12)" }}>
              <th style={{ textAlign: "left", padding: "10px 16px 10px 0", color: "rgba(255,255,255,0.55)", fontWeight: 500, minWidth: 180 }}>
                Dimension
              </th>
              <th style={{ textAlign: "left", padding: "10px 16px", color: "rgba(255,255,255,0.55)", fontWeight: 500, minWidth: 280 }}>
                Manual allocation
              </th>
              <th style={{ textAlign: "left", padding: "10px 16px", color: "var(--sagitta-blue, #63D4FF)", fontWeight: 600, minWidth: 280 }}>
                Sagitta AAA
              </th>
            </tr>
          </thead>
          <tbody>
            {COMPARISON.map((row, i) => (
              <tr
                key={row.dimension}
                style={{
                  borderBottom: "1px solid rgba(255,255,255,0.06)",
                  background: i % 2 === 0 ? "rgba(255,255,255,0.015)" : "transparent",
                  verticalAlign: "top",
                }}
              >
                <td style={{ padding: "14px 16px 14px 0", fontWeight: 600, color: "#e6edf3", fontSize: 13 }}>
                  {row.dimension}
                </td>
                <td style={{ padding: "14px 16px", color: "rgba(255,255,255,0.6)", lineHeight: 1.6 }}>
                  {row.manual}
                </td>
                <td style={{ padding: "14px 16px", color: "rgba(255,255,255,0.82)", lineHeight: 1.6 }}>
                  {row.aaa}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <SectionTitle>When manual allocation is adequate</SectionTitle>
      <p style={{ fontSize: 15, color: "rgba(255,255,255,0.75)", lineHeight: 1.65, maxWidth: 800 }}>
        Manual allocation is adequate when decisions are low-stakes, infrequent, and made by a single person with no governance obligations. As soon as allocation decisions involve multiple stakeholders, require accountability to token holders or committees, must be explainable under audit, or happen at any meaningful frequency — manual processes become a liability. AAA is built for the second environment.
      </p>

      <div style={{ marginTop: 40, display: "flex", flexWrap: "wrap", gap: 16 }}>
        <InternalLink href="/compare/aaa-vs-signal-tools">AAA vs signal tools</InternalLink>
        <InternalLink href="/methodology">Allocation methodology</InternalLink>
        <InternalLink href="/decision-records">How decision records work</InternalLink>
        <InternalLink href="/pricing">View pricing</InternalLink>
      </div>

      <div className="surface-strong panel" style={{ marginTop: 48, borderRadius: 14 }}>
        <div style={{ fontSize: 18, fontWeight: 600, color: "#e6edf3", marginBottom: 10 }}>
          Evaluate AAA against your current workflow
        </div>
        <p style={{ fontSize: 14, color: "rgba(255,255,255,0.7)", maxWidth: 680, marginBottom: 20 }}>
          Observer access is free. See how policy-driven allocation compares to what you&apos;re doing today — without any commitment or custody requirement.
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
