export const runtime = "nodejs";

const LAST_UPDATED = "January 31, 2026";

export default function TermsPage() {
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
            <h1 style={{ marginTop: 12, fontSize: 40, lineHeight: 1.1 }}>Terms of Service</h1>
            <p style={{ marginTop: 8, color: "rgba(255,255,255,0.65)" }}>Last updated {LAST_UPDATED}</p>
          </header>

          <section className="section" style={{ marginTop: 32 }}>
            <p style={{ color: "rgba(255,255,255,0.75)" }}>
              These Terms of Service (&quot;Terms&quot;) govern your access to and use of Sagitta Autonomous Allocation
              Agent (AAA) and related services (the &quot;Service&quot;). By accessing or using the Service, you agree to
              these Terms.
            </p>
          </section>

          <section className="section">
            <h2>1. Eligibility & Account Access</h2>
            <p style={{ color: "rgba(255,255,255,0.75)" }}>
              You must be at least 18 years old and able to form a binding contract. You are responsible for all
              activity that occurs under your account and for maintaining the confidentiality of your credentials.
            </p>
          </section>

          <section className="section">
            <h2>2. Use of the Service</h2>
            <ul style={{ marginTop: 12, color: "rgba(255,255,255,0.75)" }}>
              <li>Do not misuse the Service or attempt to access it using automated or unauthorized means.</li>
              <li>Do not reverse engineer, decompile, or attempt to extract source code except as permitted by law.</li>
              <li>Do not use the Service to violate laws, regulations, or third-party rights.</li>
            </ul>
          </section>

          <section className="section">
            <h2>3. Decision Support Disclaimer</h2>
            <p style={{ color: "rgba(255,255,255,0.75)" }}>
              The Service provides analytical tooling and decision support. It is not investment advice, a solicitation,
              or a recommendation to buy or sell any asset. You remain solely responsible for your decisions.
            </p>
          </section>

          <section className="section">
            <h2>4. Data & Content</h2>
            <p style={{ color: "rgba(255,255,255,0.75)" }}>
              You retain rights to data you submit. By using the Service, you grant Sagitta the right to process your
              data to operate, maintain, and improve the Service in accordance with the Privacy Policy.
            </p>
          </section>

          <section className="section">
            <h2>5. Paid Plans</h2>
            <p style={{ color: "rgba(255,255,255,0.75)" }}>
              Paid plans, if enabled, are billed in advance on a recurring basis. Taxes and third-party fees may apply.
              All sales are final unless required by law.
            </p>
          </section>

          <section className="section">
            <h2>6. Availability & Changes</h2>
            <p style={{ color: "rgba(255,255,255,0.75)" }}>
              We may modify, suspend, or discontinue the Service at any time. We may update these Terms by posting a
              revised version with a new &quot;Last updated&quot; date.
            </p>
          </section>

          <section className="section">
            <h2>7. Limitation of Liability</h2>
            <p style={{ color: "rgba(255,255,255,0.75)" }}>
              To the maximum extent permitted by law, Sagitta will not be liable for any indirect, incidental, special,
              consequential, or punitive damages, or any loss of profits or data arising from your use of the Service.
            </p>
          </section>

          <section className="section">
            <h2>8. Contact</h2>
            <p style={{ color: "rgba(255,255,255,0.75)" }}>
              For questions about these Terms, visit{" "}
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
