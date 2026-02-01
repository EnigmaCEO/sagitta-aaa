export const runtime = "nodejs";

const LAST_UPDATED = "January 31, 2026";

export default function PrivacyPage() {
  return (
    <main className="marketing-page">
      <div className="marketing-shell">
        <div className="container" style={{ maxWidth: 840 }}>
          <a href="/" className="focus-ring" style={{ textDecoration: "none" }}>
            {"<- Back to home"}
          </a>

          <header style={{ marginTop: 24 }}>
            <div style={{ fontSize: 12, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.6)" }}>
              Sagitta AAA
            </div>
            <h1 style={{ marginTop: 12, fontSize: 40, lineHeight: 1.1 }}>Privacy Policy</h1>
            <p style={{ marginTop: 8, color: "rgba(255,255,255,0.65)" }}>Last updated {LAST_UPDATED}</p>
          </header>

          <section className="section" style={{ marginTop: 32 }}>
            <p style={{ color: "rgba(255,255,255,0.75)" }}>
              This Privacy Policy describes how Sagitta collects, uses, and shares information when you access or use
              the Service.
            </p>
          </section>

          <section className="section">
            <h2>1. Information We Collect</h2>
            <ul style={{ marginTop: 12, color: "rgba(255,255,255,0.75)" }}>
              <li>Account information such as identifiers and authentication details.</li>
              <li>Usage data such as feature interactions, device, and browser metadata.</li>
              <li>Content you provide, including portfolios, policies, and related configuration.</li>
            </ul>
          </section>

          <section className="section">
            <h2>2. How We Use Information</h2>
            <ul style={{ marginTop: 12, color: "rgba(255,255,255,0.75)" }}>
              <li>Operate, maintain, and improve the Service.</li>
              <li>Provide customer support and communicate updates.</li>
              <li>Secure the Service and prevent abuse or fraud.</li>
            </ul>
          </section>

          <section className="section">
            <h2>3. Sharing</h2>
            <p style={{ color: "rgba(255,255,255,0.75)" }}>
              We may share information with service providers (e.g., hosting, analytics, payment processing) as needed
              to deliver the Service. We do not sell personal information.
            </p>
          </section>

          <section className="section">
            <h2>4. Data Retention</h2>
            <p style={{ color: "rgba(255,255,255,0.75)" }}>
              We retain information for as long as necessary to provide the Service and fulfill legal or operational
              obligations.
            </p>
          </section>

          <section className="section">
            <h2>5. Security</h2>
            <p style={{ color: "rgba(255,255,255,0.75)" }}>
              We implement reasonable security measures to protect your data, but no method of transmission or storage
              is 100% secure.
            </p>
          </section>

          <section className="section">
            <h2>6. Your Choices</h2>
            <p style={{ color: "rgba(255,255,255,0.75)" }}>
              You may request access, correction, or deletion of your data where applicable by contacting support.
            </p>
          </section>

          <section className="section">
            <h2>7. Contact</h2>
            <p style={{ color: "rgba(255,255,255,0.75)" }}>
              For questions about this Privacy Policy, visit{" "}
              <a href="https://aaa.sagitta.systems/support" className="focus-ring" style={{ textDecoration: "none" }}>
                support
              </a>
              .
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
