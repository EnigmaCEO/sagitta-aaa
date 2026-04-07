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
  title: "Security & Non-Custody Model — Sagitta AAA",
  description:
    "Sagitta AAA is non-custodial by design. It never holds private keys, requests signing permissions, or initiates execution. This page explains the security model, data handling, and access controls.",
  alternates: { canonical: "https://aaa.sagitta.systems/security" },
  openGraph: {
    title: "Security & Non-Custody Model — Sagitta AAA",
    description:
      "Sagitta AAA is non-custodial by design. It never holds keys, requests signing permissions, or initiates execution. Understand the full security model.",
    url: "https://aaa.sagitta.systems/security",
  },
};

const SECURITY_PRINCIPLES = [
  {
    title: "Non-custodial by design",
    body: "AAA never holds private keys, seed phrases, or signing credentials. Portfolio wallet state is imported as read-only data. The system has no authority to move assets, sign transactions, or interact with smart contracts on behalf of users.",
  },
  {
    title: "Read-only portfolio access",
    body: "Wallet connections to AAA are structured as portfolio data imports — public address resolution and on-chain balance reading only. No signing requests, no permission grants, no execution authority.",
  },
  {
    title: "Decision output, not execution",
    body: "AAA produces allocation decision records as output. What happens with those decisions is determined entirely by the operator. Execution infrastructure — custody solutions, OMS, transaction signing — is fully separate from AAA.",
  },
  {
    title: "Authority-gated access controls",
    body: "Access to AAA is structured across authority tiers. Observer users have read-only access to allocation outputs. Higher authority tiers require explicit qualification. No one can escalate their own authority within the system.",
  },
  {
    title: "Versioned policy with full auditability",
    body: "Policy changes are versioned. Every decision record includes the policy version under which it was evaluated. If policy changes, prior decisions remain readable and verifiable against the policy version that was active at the time.",
  },
  {
    title: "Authentication via industry-standard IdP",
    body: "User authentication is handled through Auth0, a widely-used identity provider with MFA support. AAA does not store passwords. Session management follows current security best practices.",
  },
];

export default function SecurityPage() {
  return (
    <PublicPage>
      <StructuredData data={ORGANIZATION_SCHEMA} />
      <StructuredData
        data={breadcrumbSchema([
          { name: "Home", url: "https://aaa.sagitta.systems/" },
          { name: "Security", url: "https://aaa.sagitta.systems/security" },
        ])}
      />

      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Security" }]} />

      <PageHeader
        eyebrow="Security model"
        title="Non-custodial architecture and access controls"
        lead="The most important security property of Sagitta AAA is what it cannot do: it cannot hold assets, sign transactions, or initiate execution. This is not a policy — it is a structural property of how the system is built."
      />

      <SectionTitle>Core security properties</SectionTitle>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: 16,
          marginTop: 8,
        }}
      >
        {SECURITY_PRINCIPLES.map((p) => (
          <div key={p.title} className="surface panel card-hover" style={{ borderRadius: 14 }}>
            <div style={{ fontSize: 15, fontWeight: 600, color: "#e6edf3", marginBottom: 10 }}>{p.title}</div>
            <p style={{ fontSize: 14, color: "rgba(255,255,255,0.7)", margin: 0, lineHeight: 1.55 }}>{p.body}</p>
          </div>
        ))}
      </div>

      <SectionTitle>Data handling</SectionTitle>
      <div style={{ display: "flex", flexDirection: "column", gap: 14, maxWidth: 800 }}>
        {[
          { heading: "Portfolio data", body: "On-chain wallet data is read from public blockchain state — balance queries against public addresses. No private data is transmitted for portfolio import. Custom portfolio inputs (manual asset entries) are stored in your account." },
          { heading: "Policy and configuration data", body: "Your policy configurations, constraint definitions, and scenario settings are stored in your account. They are not shared with other users. Policy versions are retained for auditability." },
          { heading: "Decision records", body: "All allocation decision records are stored in your account. They include portfolio snapshots, policy configurations, and allocation outputs at the time of the decision. Records are retained for audit and review purposes." },
          { heading: "Authentication data", body: "Authentication is handled by Auth0. Sagitta does not store passwords. Account credentials are managed through your Auth0 profile. MFA is available and recommended for accounts with production or doctrine authority." },
        ].map((item) => (
          <div key={item.heading} style={{ paddingBottom: 14, borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
            <h3 style={{ fontSize: 15, fontWeight: 600, color: "#e6edf3", marginBottom: 8 }}>{item.heading}</h3>
            <p style={{ fontSize: 14, color: "rgba(255,255,255,0.7)", lineHeight: 1.65, margin: 0 }}>{item.body}</p>
          </div>
        ))}
      </div>

      <SectionTitle>Responsible disclosure</SectionTitle>
      <p style={{ fontSize: 15, color: "rgba(255,255,255,0.75)", lineHeight: 1.65, maxWidth: 760, marginBottom: 16 }}>
        If you identify a security vulnerability in Sagitta AAA, please disclose it responsibly. Contact the security team directly at{" "}
        <a
          href="mailto:security@sagitta.systems"
          style={{ color: "var(--sagitta-blue, #63D4FF)", textDecoration: "none" }}
        >
          security@sagitta.systems
        </a>
        {" "}before any public disclosure. We will acknowledge reports within 2 business days and work toward remediation before public disclosure.
      </p>

      <div style={{ marginTop: 32, display: "flex", flexWrap: "wrap", gap: 16 }}>
        <InternalLink href="/methodology">How the allocation pipeline works</InternalLink>
        <InternalLink href="/decision-records">How decision records are structured</InternalLink>
        <InternalLink href="/privacy">Privacy policy</InternalLink>
      </div>
    </PublicPage>
  );
}
