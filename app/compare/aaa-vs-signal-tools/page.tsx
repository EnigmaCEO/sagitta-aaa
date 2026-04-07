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
  title: "AAA vs Signal Tools — Policy-Driven Allocation vs Signal Aggregation",
  description:
    "How Sagitta AAA differs from crypto signal tools and signal aggregation platforms. Signals inform discretion. Policy constrains it. Understand why the distinction matters for institutions.",
  alternates: { canonical: "https://aaa.sagitta.systems/compare/aaa-vs-signal-tools" },
  openGraph: {
    title: "AAA vs Signal Tools — Policy-Driven Allocation vs Signal Aggregation",
    description:
      "Sagitta AAA is not a signal tool. Signals inform discretion. Policy constrains it. Understand the distinction for institutional allocation.",
    url: "https://aaa.sagitta.systems/compare/aaa-vs-signal-tools",
  },
};

const COMPARISON = [
  {
    dimension: "Core function",
    signal: "Aggregate on-chain data, sentiment, and market indicators to help operators make better discretionary decisions.",
    aaa: "Resolve allocation outputs deterministically within explicit policy constraints. The policy is the signal.",
  },
  {
    dimension: "Decision output",
    signal: "Signals are inputs to a human decision-maker. The decision itself is still discretionary — made by a person interpreting the signal.",
    aaa: "Allocation is the output. The system resolves targets directly from portfolio state and policy constraints. Human authority determines policy — not each individual trade.",
  },
  {
    dimension: "Auditability",
    signal: "Signals can be logged, but the allocation decision that follows a signal is still a human judgment — and human judgments are hard to audit systematically.",
    aaa: "Every allocation output includes a complete decision record: portfolio state, policy constraints applied, allocator version, and resolved output. Fully machine-readable.",
  },
  {
    dimension: "Consistency",
    signal: "Two operators looking at the same signal may act differently based on their risk tolerance, experience, or the prevailing narrative. Signals don't enforce consistency.",
    aaa: "The same inputs always produce the same outputs. Consistency is not a goal — it is a property of deterministic policy resolution.",
  },
  {
    dimension: "Governance integration",
    signal: "Signal tools typically have no integration with governance mandates. Operators use signals within whatever informal constraints exist.",
    aaa: "Policy constraints are encoded directly from governance mandates. The allocator enforces them mechanically — not through operator judgment.",
  },
  {
    dimension: "Scalability of oversight",
    signal: "Overseeing signal-driven allocation requires reviewing individual decisions made by individual operators — which doesn't scale with team size.",
    aaa: "Oversight is at the policy level. Reviewers verify that policy matches mandate and that decisions comply with policy — not that each individual decision was correct.",
  },
  {
    dimension: "Custody model",
    signal: "Signal tools typically require or assume operator access to execution infrastructure, creating custody exposure.",
    aaa: "Non-custodial by design. Decision output and execution are fully separated. AAA never requests signing permissions or execution authority.",
  },
];

export default function AAAvsSignalToolsPage() {
  return (
    <PublicPage maxWidth={1040}>
      <StructuredData data={ORGANIZATION_SCHEMA} />
      <StructuredData
        data={breadcrumbSchema([
          { name: "Home", url: "https://aaa.sagitta.systems/" },
          { name: "Compare", url: "https://aaa.sagitta.systems/compare/aaa-vs-signal-tools" },
          { name: "AAA vs Signal Tools", url: "https://aaa.sagitta.systems/compare/aaa-vs-signal-tools" },
        ])}
      />

      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Compare" },
          { label: "AAA vs Signal Tools" },
        ]}
      />

      <PageHeader
        eyebrow="Comparison"
        title="AAA vs signal tools"
        lead="Signal tools and AAA solve different problems. Signal tools give discretionary operators better information. AAA replaces discretion with policy. Understanding the difference matters for institutions where consistency, governance alignment, and auditability are not optional."
      />

      <section aria-labelledby="distinction-heading">
        <h2 id="distinction-heading" style={{ fontSize: 22, fontWeight: 600, color: "#e6edf3", marginBottom: 14 }}>
          The core distinction
        </h2>
        <p style={{ fontSize: 15, color: "rgba(255,255,255,0.75)", lineHeight: 1.65, maxWidth: 800, marginBottom: 14 }}>
          Signal tools assume a discretionary allocator. They aggregate information and present it to a person who makes a decision. The signal improves the quality of information available — but the decision is still a human judgment, and human judgments vary by individual, by day, and by narrative pressure.
        </p>
        <p style={{ fontSize: 15, color: "rgba(255,255,255,0.75)", lineHeight: 1.65, maxWidth: 800 }}>
          AAA assumes that the governance decision has already been made — by a DAO vote, a committee mandate, or an investment policy statement. The allocator&apos;s job is to enforce that decision consistently. Policy is the signal. Discretion is what policy eliminates.
        </p>
      </section>

      <SectionTitle>Head-to-head comparison</SectionTitle>
      <div style={{ overflowX: "auto", marginTop: 8 }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
          <thead>
            <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.12)" }}>
              <th style={{ textAlign: "left", padding: "10px 16px 10px 0", color: "rgba(255,255,255,0.55)", fontWeight: 500, minWidth: 180 }}>
                Dimension
              </th>
              <th style={{ textAlign: "left", padding: "10px 16px", color: "rgba(255,255,255,0.55)", fontWeight: 500, minWidth: 280 }}>
                Signal tools
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
                  {row.signal}
                </td>
                <td style={{ padding: "14px 16px", color: "rgba(255,255,255,0.82)", lineHeight: 1.6 }}>
                  {row.aaa}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <SectionTitle>When signal tools make sense</SectionTitle>
      <p style={{ fontSize: 15, color: "rgba(255,255,255,0.75)", lineHeight: 1.65, maxWidth: 800 }}>
        Signal tools are appropriate when the allocation process is intentionally discretionary — when individual judgment is the point and governance alignment is not a constraint. AAA is appropriate when allocation must comply with a mandate, when decisions must be explainable and auditable, and when consistency is a governance requirement rather than a preference.
      </p>
      <p style={{ fontSize: 15, color: "rgba(255,255,255,0.75)", lineHeight: 1.65, maxWidth: 800, marginTop: 14 }}>
        Some organizations use both: signal tools to inform policy design and AAA to enforce the resulting policy at the allocation level. This combination is intentional and supported — the key is keeping signal inputs and policy constraints cleanly separated.
      </p>

      <div style={{ marginTop: 40, display: "flex", flexWrap: "wrap", gap: 16 }}>
        <InternalLink href="/compare/aaa-vs-manual-allocation">AAA vs manual allocation</InternalLink>
        <InternalLink href="/methodology">Allocation methodology</InternalLink>
        <InternalLink href="/for-daos">For DAOs</InternalLink>
        <InternalLink href="/pricing">View pricing</InternalLink>
      </div>

      <div className="surface-strong panel" style={{ marginTop: 48, borderRadius: 14 }}>
        <div style={{ fontSize: 18, fontWeight: 600, color: "#e6edf3", marginBottom: 10 }}>
          See policy-driven allocation in action
        </div>
        <p style={{ fontSize: 14, color: "rgba(255,255,255,0.7)", maxWidth: 680, marginBottom: 20 }}>
          Observer access is free. Evaluate real allocation decisions under policy constraints without signing up for a tool that replaces your signals dashboard.
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
