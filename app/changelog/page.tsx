import type { Metadata } from "next";
import {
  PublicPage,
  Breadcrumbs,
  PageHeader,
  InternalLink,
} from "../../components/PublicLayout";
import {
  StructuredData,
  ORGANIZATION_SCHEMA,
  breadcrumbSchema,
} from "../../components/StructuredData";

export const metadata: Metadata = {
  title: "Changelog — Sagitta AAA",
  description:
    "Product updates, allocator version releases, and system changes for Sagitta AAA. A running record of what has shipped and what has changed.",
  alternates: { canonical: "https://aaa.sagitta.systems/changelog" },
  openGraph: {
    title: "Changelog — Sagitta AAA",
    description:
      "Product updates, allocator version releases, and system changes for Sagitta AAA.",
    url: "https://aaa.sagitta.systems/changelog",
  },
};

const CHANGELOG_ENTRIES = [
  {
    version: "v2.0",
    date: "2026-01-25",
    type: "Release",
    title: "Sandbox Authority tier launch",
    changes: [
      "Policy creation with enforceable constraints now available at Sandbox tier",
      "Regime-aware scenario simulation with persistent configuration",
      "Persistent decision logs with full constraint evaluation trace",
      "Wallet-native portfolio import across supported chains",
      "A/B allocator comparison mode for strategy variant testing",
    ],
  },
  {
    version: "v1.4",
    date: "2026-01-08",
    type: "Update",
    title: "Authority-gated access model",
    changes: [
      "Observer, Sandbox, and Production authority tiers formalized",
      "Authority level metadata added to decision records",
      "Approval routing introduced for Production tier decisions",
      "MFA enforcement available for Sandbox and above",
    ],
  },
  {
    version: "v1.3",
    date: "2025-12-30",
    type: "Update",
    title: "Decision record structure and LLM explainers",
    changes: [
      "Decision records now include full constraint evaluation log",
      "LLM-generated natural language explainers for each allocation decision",
      "Portfolio snapshot included in every decision record",
      "Policy version pinned to each decision for auditability",
    ],
  },
  {
    version: "v1.2",
    date: "2025-12-15",
    type: "Update",
    title: "Scenario governance and regime context",
    changes: [
      "Conservative, neutral, and expansion regime contexts introduced",
      "Regime context stored in decision record alongside policy version",
      "Multi-tick simulation results available in observer mode",
    ],
  },
  {
    version: "v1.0",
    date: "2025-11-01",
    type: "Release",
    title: "Initial release — Observer access",
    changes: [
      "Observer access available publicly at no cost",
      "Allocator v1 running policy-driven allocation under fixed constraint set",
      "Portfolio risk, churn, and weighting insights in evaluation mode",
      "Non-custodial wallet import for portfolio state",
    ],
  },
];

const TYPE_COLORS: Record<string, string> = {
  Release: "rgba(99,212,255,0.18)",
  Update: "rgba(255,255,255,0.06)",
};

const TYPE_BORDER: Record<string, string> = {
  Release: "rgba(99,212,255,0.35)",
  Update: "rgba(255,255,255,0.12)",
};

export default function ChangelogPage() {
  return (
    <PublicPage>
      <StructuredData data={ORGANIZATION_SCHEMA} />
      <StructuredData
        data={breadcrumbSchema([
          { name: "Home", url: "https://aaa.sagitta.systems/" },
          { name: "Changelog", url: "https://aaa.sagitta.systems/changelog" },
        ])}
      />

      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Changelog" }]} />

      <PageHeader
        eyebrow="Product changelog"
        title="What has shipped"
        lead="A running record of product releases, allocator updates, and system changes. Updated with each meaningful release."
      />

      <div style={{ display: "flex", flexDirection: "column", gap: 24, maxWidth: 860 }}>
        {CHANGELOG_ENTRIES.map((entry) => (
          <article
            key={entry.version}
            style={{
              background: TYPE_COLORS[entry.type] ?? "rgba(255,255,255,0.04)",
              border: `1px solid ${TYPE_BORDER[entry.type] ?? "rgba(255,255,255,0.1)"}`,
              borderRadius: 14,
              padding: 24,
            }}
          >
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10, alignItems: "center", marginBottom: 10 }}>
              <span
                style={{
                  fontSize: 13,
                  fontWeight: 700,
                  color: "var(--sagitta-blue, #63D4FF)",
                  background: "rgba(99,212,255,0.1)",
                  border: "1px solid rgba(99,212,255,0.25)",
                  borderRadius: 6,
                  padding: "2px 10px",
                }}
              >
                {entry.version}
              </span>
              <span style={{ fontSize: 12, color: "rgba(255,255,255,0.5)" }}>{entry.date}</span>
              <span
                style={{
                  fontSize: 11,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.45)",
                  border: "1px solid rgba(255,255,255,0.12)",
                  borderRadius: 4,
                  padding: "1px 7px",
                }}
              >
                {entry.type}
              </span>
            </div>
            <h2 style={{ fontSize: 17, fontWeight: 600, color: "#e6edf3", margin: "0 0 12px" }}>
              {entry.title}
            </h2>
            <ul
              style={{
                margin: 0,
                paddingLeft: 18,
                display: "flex",
                flexDirection: "column",
                gap: 6,
              }}
            >
              {entry.changes.map((change) => (
                <li key={change} style={{ fontSize: 14, color: "rgba(255,255,255,0.72)", lineHeight: 1.55 }}>
                  {change}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>

      <div style={{ marginTop: 48, display: "flex", flexWrap: "wrap", gap: 16 }}>
        <InternalLink href="/research-notes">Research notes</InternalLink>
        <InternalLink href="/docs">Documentation</InternalLink>
        <InternalLink href="/pricing">Current pricing</InternalLink>
      </div>
    </PublicPage>
  );
}
