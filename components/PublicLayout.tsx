/**
 * PublicLayout — server component shell for all public marketing pages.
 * Provides consistent header, footer, and nav links without JS requirement.
 */
import Link from "next/link";
import Image from "next/image";

const NAV_LINKS = [
  { href: "/what-is-aaa", label: "What Is AAA" },
  { href: "/for-daos", label: "For DAOs" },
  { href: "/for-portfolio-managers", label: "For PMs" },
  { href: "/for-treasury-operators", label: "For Treasury" },
  { href: "/pricing", label: "Pricing" },
  { href: "/docs", label: "Docs" },
];

const FOOTER_COLUMNS = [
  {
    heading: "Product",
    links: [
      { href: "/what-is-aaa", label: "What Is AAA" },
      { href: "/methodology", label: "Methodology" },
      { href: "/decision-records", label: "Decision Records" },
      { href: "/security", label: "Security" },
      { href: "/pricing", label: "Pricing" },
      { href: "/changelog", label: "Changelog" },
    ],
  },
  {
    heading: "Use Cases",
    links: [
      { href: "/for-daos", label: "For DAOs" },
      { href: "/for-portfolio-managers", label: "For Portfolio Managers" },
      { href: "/for-treasury-operators", label: "For Treasury Operators" },
      { href: "/compare/aaa-vs-manual-allocation", label: "vs Manual Allocation" },
      { href: "/compare/aaa-vs-signal-tools", label: "vs Signal Tools" },
    ],
  },
  {
    heading: "Learn",
    links: [
      { href: "/docs", label: "Documentation" },
      { href: "/faq", label: "FAQ" },
      { href: "/research-notes", label: "Research Notes" },
    ],
  },
  {
    heading: "Company",
    links: [
      { href: "/support", label: "Support" },
      { href: "/privacy", label: "Privacy Policy" },
      { href: "/terms", label: "Terms of Service" },
    ],
  },
];

export function PublicHeader() {
  return (
    <header className="marketing-header">
      <div className="marketing-shell marketing-header-shell">
        <div className="marketing-header-row">
          <Link href="/" className="marketing-brand">
            <Image
              className="marketing-brand-logo"
              src="/logo.png"
              alt="Sagitta AAA logo"
              width={88}
              height={88}
              priority
            />
            <span className="marketing-brand-text">Sagitta Autonomous Allocation Agent</span>
          </Link>

          <nav aria-label="Primary navigation" style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
            {NAV_LINKS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                style={{
                  fontSize: 13,
                  color: "rgba(255,255,255,0.75)",
                  textDecoration: "none",
                  padding: "6px 10px",
                  borderRadius: 8,
                }}
              >
                {item.label}
              </Link>
            ))}
            <form action="/auth/login" method="get" style={{ marginLeft: 8 }}>
              <input type="hidden" name="returnTo" value="/app" />
              <button type="submit" className="btn-primary focus-ring">
                Sign in
              </button>
            </form>
          </nav>
        </div>
      </div>
    </header>
  );
}

export function PublicFooter() {
  return (
    <footer
      style={{
        marginTop: 80,
        borderTop: "1px solid rgba(255,255,255,0.1)",
        paddingTop: 48,
        paddingBottom: 48,
        fontSize: 14,
        color: "rgba(255,255,255,0.6)",
      }}
    >
      <div style={{ maxWidth: 1120, margin: "0 auto", padding: "0 32px" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
            gap: 32,
            marginBottom: 40,
          }}
        >
          {FOOTER_COLUMNS.map((col) => (
            <div key={col.heading}>
              <div
                style={{
                  fontSize: 11,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.45)",
                  marginBottom: 14,
                  fontWeight: 600,
                }}
              >
                {col.heading}
              </div>
              <nav aria-label={col.heading}>
                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 10 }}>
                  {col.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        style={{
                          color: "rgba(255,255,255,0.62)",
                          textDecoration: "none",
                          fontSize: 13,
                          transition: "color 0.15s",
                        }}
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          ))}
        </div>

        <div
          style={{
            borderTop: "1px solid rgba(255,255,255,0.08)",
            paddingTop: 24,
            display: "flex",
            flexWrap: "wrap",
            gap: 12,
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span>&copy; {new Date().getFullYear()} Sagitta Labs. All rights reserved.</span>
          <span style={{ fontSize: 12 }}>
            Non-custodial &middot; Audit-ready &middot; Policy-driven
          </span>
        </div>
      </div>
    </footer>
  );
}

export function PublicPage({
  children,
  maxWidth = 960,
}: {
  children: React.ReactNode;
  maxWidth?: number;
}) {
  return (
    <div className="marketing-page">
      <PublicHeader />
      <main className="marketing-shell" style={{ maxWidth, margin: "0 auto", padding: "56px 32px 0" }}>
        {children}
      </main>
      <div style={{ maxWidth, margin: "0 auto", padding: "0 32px" }}>
        <PublicFooter />
      </div>
    </div>
  );
}

/** Breadcrumb nav rendered as visible HTML (crawlable). */
export function Breadcrumbs({ items }: { items: Array<{ label: string; href?: string }> }) {
  return (
    <nav aria-label="Breadcrumb" style={{ marginBottom: 28 }}>
      <ol
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "4px 6px",
          listStyle: "none",
          padding: 0,
          margin: 0,
          fontSize: 13,
          color: "rgba(255,255,255,0.5)",
        }}
      >
        {items.map((item, i) => (
          <li key={item.label} style={{ display: "flex", alignItems: "center", gap: 6 }}>
            {i > 0 && <span aria-hidden="true">/</span>}
            {item.href ? (
              <Link href={item.href} style={{ color: "rgba(255,255,255,0.55)", textDecoration: "none" }}>
                {item.label}
              </Link>
            ) : (
              <span style={{ color: "rgba(255,255,255,0.75)" }}>{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

/** Reusable page header block. */
export function PageHeader({
  eyebrow,
  title,
  lead,
}: {
  eyebrow?: string;
  title: string;
  lead?: string;
}) {
  return (
    <header style={{ marginBottom: 48 }}>
      {eyebrow && (
        <div
          style={{
            fontSize: 11,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "var(--sagitta-blue-muted, #7AA1C2)",
            marginBottom: 12,
            fontWeight: 600,
          }}
        >
          {eyebrow}
        </div>
      )}
      <h1
        style={{
          fontSize: "clamp(30px, 5vw, 48px)",
          fontWeight: 700,
          lineHeight: 1.1,
          color: "#ededed",
          margin: 0,
        }}
      >
        {title}
      </h1>
      {lead && (
        <p
          style={{
            marginTop: 16,
            fontSize: 17,
            lineHeight: 1.5,
            color: "rgba(255,255,255,0.72)",
            maxWidth: 760,
          }}
        >
          {lead}
        </p>
      )}
    </header>
  );
}

/** Section divider with title. */
export function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2
      style={{
        fontSize: 22,
        fontWeight: 600,
        color: "#e6edf3",
        marginTop: 48,
        marginBottom: 16,
      }}
    >
      {children}
    </h2>
  );
}

/** Highlight card for feature lists. */
export function FeatureCard({
  title,
  body,
}: {
  title: string;
  body: string;
}) {
  return (
    <div
      className="surface panel card-hover"
      style={{ borderRadius: 14 }}
    >
      <div style={{ fontSize: 15, fontWeight: 600, color: "#e6edf3", marginBottom: 10 }}>
        {title}
      </div>
      <p style={{ fontSize: 14, color: "rgba(255,255,255,0.7)", margin: 0, lineHeight: 1.55 }}>
        {body}
      </p>
    </div>
  );
}

/** Internal link with arrow. */
export function InternalLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      style={{
        color: "var(--sagitta-blue, #63D4FF)",
        textDecoration: "none",
        fontSize: 14,
        display: "inline-flex",
        alignItems: "center",
        gap: 4,
      }}
    >
      {children} &rarr;
    </Link>
  );
}
