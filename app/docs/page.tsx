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
  title: "Documentation — Sagitta AAA",
  description:
    "Documentation and quick-start guides for Sagitta AAA: portfolio import, policy configuration, scenario governance, decision records, and access tier details.",
  alternates: { canonical: "https://aaa.sagitta.systems/docs" },
  openGraph: {
    title: "Documentation — Sagitta AAA",
    description:
      "Documentation and quick-start guides for Sagitta AAA. Portfolio import, policy configuration, scenario governance, and decision records.",
    url: "https://aaa.sagitta.systems/docs",
  },
};

const DOC_SECTIONS = [
  {
    title: "Getting started",
    items: [
      { heading: "What is Sagitta AAA", href: "/what-is-aaa", description: "Overview of the product, its design principles, and what it is not." },
      { heading: "Access tiers", href: "/pricing", description: "Observer, Sandbox, Production, and Doctrine authority levels — what each includes and how to qualify." },
      { heading: "Launching the evaluation", href: "/app", description: "Observer access is free. Launch the evaluation environment to see allocation decisions in action without any commitment." },
    ],
  },
  {
    title: "Core concepts",
    items: [
      { heading: "Allocation methodology", href: "/methodology", description: "How the allocation pipeline works: portfolio ingestion, policy evaluation, constraint resolution, and decision record emission." },
      { heading: "Decision records", href: "/decision-records", description: "Structure and contents of allocation decision records. How they support governance reporting, audit review, and policy iteration." },
      { heading: "Policy and constraints", href: "/methodology#policy-as-executable-doctrine", description: "How policy constraints are defined, versioned, and applied during allocation." },
      { heading: "Scenario governance", href: "/methodology#regime-awareness-without-abandoning-rules", description: "How regime contexts — conservative, neutral, expansion — adjust constraint sensitivity without overriding determinism." },
    ],
  },
  {
    title: "Use case guides",
    items: [
      { heading: "For DAOs and on-chain governance", href: "/for-daos", description: "How to encode governance votes into enforceable allocation policy and generate audit-grade decision trails for token holders." },
      { heading: "For portfolio managers", href: "/for-portfolio-managers", description: "Running systematic allocation strategies, A/B policy testing, and generating replayable decision records." },
      { heading: "For treasury operators", href: "/for-treasury-operators", description: "Policy persistence across stewards, committee-aligned deterministic execution, and post-hoc justification for treasury actions." },
    ],
  },
  {
    title: "Security and compliance",
    items: [
      { heading: "Non-custody and security model", href: "/security", description: "How wallet import works, what data is stored, and what AAA cannot do by design." },
      { heading: "Privacy policy", href: "/privacy", description: "How Sagitta collects, uses, and stores information when you use the service." },
    ],
  },
];

export default function DocsPage() {
  return (
    <PublicPage>
      <StructuredData data={ORGANIZATION_SCHEMA} />
      <StructuredData
        data={breadcrumbSchema([
          { name: "Home", url: "https://aaa.sagitta.systems/" },
          { name: "Docs", url: "https://aaa.sagitta.systems/docs" },
        ])}
      />

      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Docs" }]} />

      <PageHeader
        eyebrow="Documentation"
        title="Sagitta AAA documentation"
        lead="Guides, reference pages, and use-case walkthroughs for using Sagitta AAA. Start with the overview, dig into methodology, or go directly to the use case most relevant to your organization."
      />

      {DOC_SECTIONS.map((section) => (
        <div key={section.title}>
          <SectionTitle>{section.title}</SectionTitle>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
              gap: 14,
              marginTop: 8,
            }}
          >
            {section.items.map((item) => (
              <a
                key={item.heading}
                href={item.href}
                className="surface card-hover panel"
                style={{ borderRadius: 12, textDecoration: "none", display: "block" }}
              >
                <div
                  style={{
                    fontSize: 14,
                    fontWeight: 600,
                    color: "var(--sagitta-blue, #63D4FF)",
                    marginBottom: 8,
                  }}
                >
                  {item.heading} &rarr;
                </div>
                <p style={{ fontSize: 13, color: "rgba(255,255,255,0.68)", lineHeight: 1.55, margin: 0 }}>
                  {item.description}
                </p>
              </a>
            ))}
          </div>
        </div>
      ))}

      <div
        className="surface-strong panel"
        style={{ marginTop: 52, borderRadius: 14 }}
      >
        <div style={{ fontSize: 18, fontWeight: 600, color: "#e6edf3", marginBottom: 8 }}>
          Can&apos;t find what you need?
        </div>
        <p style={{ fontSize: 14, color: "rgba(255,255,255,0.7)", marginBottom: 20, maxWidth: 620 }}>
          The FAQ covers common questions about AAA, custody, access tiers, and how decisions are structured. For anything else, contact support.
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
          <InternalLink href="/faq">Read the FAQ</InternalLink>
          <InternalLink href="/support">Contact support</InternalLink>
        </div>
      </div>
    </PublicPage>
  );
}
