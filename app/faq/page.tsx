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
  faqSchema,
} from "../../components/StructuredData";

export const metadata: Metadata = {
  title: "FAQ — Sagitta AAA",
  description:
    "Frequently asked questions about Sagitta AAA: what it is, how it works, who it is for, what it costs, and how it differs from signal tools and manual allocation workflows.",
  alternates: { canonical: "https://aaa.sagitta.systems/faq" },
  openGraph: {
    title: "FAQ — Sagitta AAA",
    description:
      "Common questions about Sagitta AAA: what it is, who it serves, how it differs from signal tools, and what access tiers are available.",
    url: "https://aaa.sagitta.systems/faq",
  },
};

const FAQ_SECTIONS = [
  {
    section: "What is Sagitta AAA",
    items: [
      {
        question: "What is Sagitta AAA?",
        answer:
          "Sagitta AAA is a policy-driven, non-custodial allocation and risk engine for crypto-native institutions, DAOs, treasury operators, and portfolio managers. It converts explicit policy constraints into deterministic, audit-ready allocation decisions. It is not a trading bot, a signal aggregator, or a portfolio tracker.",
      },
      {
        question: "What problem does AAA solve?",
        answer:
          "Most crypto allocation is discretionary — driven by individual judgment, informal consensus, or opacity. AAA replaces discretionary drift with deterministic, policy-bound allocation intelligence. The same inputs always produce the same outputs. Decisions can be audited, replayed, and defended without faith in a black box.",
      },
      {
        question: "Is AAA an AI agent?",
        answer:
          "AAA is an AI crypto allocation agent in the sense that it uses structured reasoning to resolve allocation decisions within policy constraints. However, it is authority-gated: autonomous operation requires explicit governance permission. The system is designed so that policy, governance, and human review precede automation — not the other way around.",
      },
    ],
  },
  {
    section: "Custody and security",
    items: [
      {
        question: "Does AAA require custody of my assets?",
        answer:
          "No. AAA is non-custodial by design. It imports wallet state as read-only portfolio data. It produces allocation decisions as output. It has no authority to move assets, sign transactions, or initiate execution. Custody and execution remain fully separate.",
      },
      {
        question: "How does wallet import work?",
        answer:
          "Wallet import is read-only. AAA reads public on-chain balance data from wallet addresses you provide. No private keys, signing permissions, or transaction authorization is requested or stored.",
      },
      {
        question: "Who can access my policy and decision data?",
        answer:
          "Your policy configurations, decision records, and portfolio data are stored in your account. They are not shared with other users. Sagitta staff access is limited and subject to access controls.",
      },
    ],
  },
  {
    section: "How it works",
    items: [
      {
        question: "What is a decision record?",
        answer:
          "A decision record is a structured, machine-readable document that AAA produces for every allocation decision. It contains the portfolio snapshot at decision time, the policy version applied, the constraint evaluation log, the allocator version used, the resolved allocation output, and the approval routing state. Decision records can be replayed, reviewed, and used for governance reporting.",
      },
      {
        question: "What does 'policy-driven' mean in practice?",
        answer:
          "In AAA, allocation policy is a set of machine-checkable constraints: asset eligibility rules, concentration caps, liquidity floors, rebalance bounds, and regime-specific behavior. The allocator resolves outputs inside those constraints deterministically. Policy is not a suggestion — it is an enforced limit set.",
      },
      {
        question: "What are scenarios and regime contexts?",
        answer:
          "Scenarios let operators define how policy constraint sensitivity changes under different market conditions — conservative in drawdowns, neutral in stable periods, calibrated expansion when conditions permit. Regime context is declared by the operator and adjusts how the allocator interprets policy limits without overriding determinism.",
      },
    ],
  },
  {
    section: "Who it's for",
    items: [
      {
        question: "Is AAA designed for DAOs?",
        answer:
          "Yes. DAOs are a primary use case. AAA converts governance vote outcomes into enforceable allocation policy, eliminates ad-hoc treasury decisions between governance cycles, and produces audit-grade decision trails for token holders. See the For DAOs page for details.",
      },
      {
        question: "Can a crypto fund or portfolio manager use AAA?",
        answer:
          "Yes. Portfolio managers use AAA to run systematic allocation strategies inside explicit policy constraints, compare strategy variants with A/B testing before capital exposure, and generate replayable decision records. See the For Portfolio Managers page.",
      },
      {
        question: "Is AAA suitable for protocol foundations and ecosystem treasuries?",
        answer:
          "Yes. AAA is designed for treasury operations that require policy persistence across stewards, committee-aligned deterministic execution, and post-hoc justification for every treasury action. See the For Treasury Operators page.",
      },
    ],
  },
  {
    section: "Pricing and access",
    items: [
      {
        question: "What does observer access include?",
        answer:
          "Observer access is free and provides read-only visibility into allocation decisions generated under policy constraints. You can evaluate portfolio risk, weighting logic, and scenario sensitivity without any authority to modify policy or act on decisions. No credit card is required.",
      },
      {
        question: "What is Sandbox Authority?",
        answer:
          "Sandbox Authority ($79/month) enables policy creation with enforceable constraints, regime-aware scenario simulation, persistent decision logs, and wallet-native portfolio imports. It is designed for teams that want to design and test allocation policies before operational deployment.",
      },
      {
        question: "What does Production Authority add?",
        answer:
          "Production Authority ($499/month) adds team-based access with role controls, real-time Agent mode workflows, enforced policy and risk guardrails, and version-controlled portfolio and policy updates. It is designed for operational deployment with institutional accountability.",
      },
    ],
  },
];

// Flatten for structured data
const ALL_FAQ_ITEMS = FAQ_SECTIONS.flatMap((s) => s.items);

export default function FAQPage() {
  return (
    <PublicPage>
      <StructuredData data={ORGANIZATION_SCHEMA} />
      <StructuredData
        data={breadcrumbSchema([
          { name: "Home", url: "https://aaa.sagitta.systems/" },
          { name: "FAQ", url: "https://aaa.sagitta.systems/faq" },
        ])}
      />
      <StructuredData
        data={faqSchema(ALL_FAQ_ITEMS.map((item) => ({ question: item.question, answer: item.answer })))}
      />

      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "FAQ" }]} />

      <PageHeader
        eyebrow="Frequently asked questions"
        title="Common questions about Sagitta AAA"
        lead="Answers to the most common questions about what AAA is, how it works, who it's for, and how access is structured."
      />

      {FAQ_SECTIONS.map((section) => (
        <div key={section.section}>
          <SectionTitle>{section.section}</SectionTitle>
          <div style={{ display: "flex", flexDirection: "column", gap: 16, maxWidth: 860 }}>
            {section.items.map((item) => (
              <details
                key={item.question}
                className="surface panel"
                style={{ borderRadius: 12, cursor: "pointer" }}
              >
                <summary
                  style={{
                    fontSize: 15,
                    fontWeight: 600,
                    color: "#e6edf3",
                    listStyle: "none",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: 12,
                    cursor: "pointer",
                  }}
                >
                  {item.question}
                  <span
                    style={{
                      flexShrink: 0,
                      color: "var(--sagitta-blue-muted, #7AA1C2)",
                      fontSize: 20,
                      lineHeight: 1,
                    }}
                    aria-hidden="true"
                  >
                    +
                  </span>
                </summary>
                <p
                  style={{
                    marginTop: 12,
                    fontSize: 14,
                    color: "rgba(255,255,255,0.72)",
                    lineHeight: 1.65,
                    margin: "12px 0 0",
                  }}
                >
                  {item.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      ))}

      <div style={{ marginTop: 52, display: "flex", flexWrap: "wrap", gap: 16 }}>
        <InternalLink href="/what-is-aaa">What is Sagitta AAA</InternalLink>
        <InternalLink href="/methodology">Full methodology</InternalLink>
        <InternalLink href="/pricing">Pricing and access tiers</InternalLink>
        <InternalLink href="/support">Contact support</InternalLink>
      </div>
    </PublicPage>
  );
}
