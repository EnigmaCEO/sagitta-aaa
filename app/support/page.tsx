"use client";

import { useMemo, useState } from "react";

export default function SupportPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const mailto = useMemo(() => {
    const lines = [
      `Name: ${name || "-"}`,
      `Email: ${email || "-"}`,
      "",
      message || "",
    ];
    const body = encodeURIComponent(lines.join("\n"));
    const subjectLine = encodeURIComponent(subject || "Sagitta Support Request");
    return `mailto:support@sagitta.systems?subject=${subjectLine}&body=${body}`;
  }, [name, email, subject, message]);

  return (
    <main className="marketing-page">
      <div className="marketing-shell">
        <div className="container" style={{ maxWidth: 720 }}>
          <a href="/" className="focus-ring" style={{ textDecoration: "none" }}>
            {"<- Back to home"}
          </a>

          <header style={{ marginTop: 24 }}>
            <div
              style={{
                fontSize: 12,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.6)",
              }}
            >
              Sagitta AAA
            </div>
            <h1 style={{ marginTop: 12, fontSize: 40, lineHeight: 1.1 }}>
              Support
            </h1>
            <p style={{ marginTop: 8, color: "rgba(255,255,255,0.65)" }}>
              Submit a support request and we will follow up by email.
            </p>
          </header>

          <form
            onSubmit={(event) => {
              event.preventDefault();
              window.location.assign(mailto);
            }}
            style={{
              marginTop: 32,
              display: "grid",
              gap: 16,
              background: "var(--surface)",
              border: "1px solid var(--border)",
              borderRadius: 16,
              padding: 24,
            }}
          >
            <label style={{ display: "grid", gap: 8 }}>
              <span style={{ fontSize: 13, color: "rgba(255,255,255,0.8)" }}>
                Name
              </span>
              <input
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="Your name"
                style={{
                  height: 38,
                  borderRadius: 8,
                  border: "1px solid var(--border)",
                  background: "#0f0f0f",
                  color: "#fff",
                  padding: "0 12px",
                }}
              />
            </label>

            <label style={{ display: "grid", gap: 8 }}>
              <span style={{ fontSize: 13, color: "rgba(255,255,255,0.8)" }}>
                Email
              </span>
              <input
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                type="email"
                placeholder="you@domain.com"
                required
                style={{
                  height: 38,
                  borderRadius: 8,
                  border: "1px solid var(--border)",
                  background: "#0f0f0f",
                  color: "#fff",
                  padding: "0 12px",
                }}
              />
            </label>

            <label style={{ display: "grid", gap: 8 }}>
              <span style={{ fontSize: 13, color: "rgba(255,255,255,0.8)" }}>
                Subject
              </span>
              <input
                value={subject}
                onChange={(event) => setSubject(event.target.value)}
                placeholder="How can we help?"
                style={{
                  height: 38,
                  borderRadius: 8,
                  border: "1px solid var(--border)",
                  background: "#0f0f0f",
                  color: "#fff",
                  padding: "0 12px",
                }}
              />
            </label>

            <label style={{ display: "grid", gap: 8 }}>
              <span style={{ fontSize: 13, color: "rgba(255,255,255,0.8)" }}>
                Message
              </span>
              <textarea
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                placeholder="Describe the issue or request."
                rows={6}
                required
                style={{
                  borderRadius: 8,
                  border: "1px solid var(--border)",
                  background: "#0f0f0f",
                  color: "#fff",
                  padding: "10px 12px",
                  resize: "vertical",
                }}
              />
            </label>

            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <button type="submit" className="btn-primary">
                Send to Support
              </button>
              <a
                href={mailto}
                className="focus-ring"
                style={{ textDecoration: "none", color: "var(--sagitta-blue, #63D4FF)", alignSelf: "center" }}
              >
                Open in email client
              </a>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
