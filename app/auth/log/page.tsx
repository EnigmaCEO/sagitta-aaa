import { headers } from "next/headers";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function resolveOrigin() {
  const h = headers();
  const host = h.get("x-forwarded-host") || h.get("host") || "aaa.sagitta.systems";
  const proto = h.get("x-forwarded-proto") || "https";
  return `${proto}://${host}`;
}

export default function AuthLogPage() {
  const origin = resolveOrigin();
  const endpoint = `${origin}/api/aaa/auth/logs`;

  return (
    <main className="marketing-page">
      <div className="marketing-shell">
        <div className="container" style={{ maxWidth: 860 }}>
          <a href="/" className="focus-ring" style={{ textDecoration: "none" }}>
            &lt;- Back to home
          </a>

          <header style={{ marginTop: 24 }}>
            <div style={{ fontSize: 12, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.6)" }}>
              Sagitta AAA
            </div>
            <h1 style={{ marginTop: 12, fontSize: 40, lineHeight: 1.1 }}>
              Auth0 Log Stream
            </h1>
            <p style={{ marginTop: 8, color: "rgba(255,255,255,0.65)" }}>
              Configure an Auth0 Log Stream to send security events into the Sagitta AAA API logs.
            </p>
          </header>

          <section className="section" style={{ marginTop: 32 }}>
            <h2>Destination</h2>
            <p style={{ color: "rgba(255,255,255,0.75)" }}>
              Use an HTTP log stream with the endpoint below:
            </p>
            <div
              style={{
                marginTop: 12,
                padding: 16,
                background: "#0f0f0f",
                border: "1px solid var(--border)",
                borderRadius: 12,
                fontFamily: "var(--font-geist-mono, ui-monospace, SFMono-Regular, Menlo, monospace)",
                fontSize: 13,
                color: "var(--sagitta-blue, #63D4FF)",
                wordBreak: "break-all",
              }}
            >
              {endpoint}
            </div>
            <p style={{ marginTop: 12, color: "rgba(255,255,255,0.65)" }}>
              If you need to send logs from a different environment, replace the origin with your deployment base URL.
            </p>
          </section>

          <section className="section">
            <h2>Recommended Log Stream Settings</h2>
            <ul style={{ marginTop: 12, color: "rgba(255,255,255,0.75)" }}>
              <li>Type: HTTP (JSON)</li>
              <li>Obfuscation: XXHash (recommended)</li>
              <li>Obscure: first_name, last_name, email, phone, address, username</li>
              <li>Format: default Auth0 log stream payload</li>
            </ul>
          </section>

          <section className="section">
            <h2>Validation</h2>
            <p style={{ color: "rgba(255,255,255,0.75)" }}>
              After saving the log stream, trigger a login or logout event in Auth0 and confirm the payload appears in
              your API logs. If your environment requires a shared secret, add a header in Auth0 Log Stream settings as
              provided by your administrator.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
