import type { Metadata } from "next";
import Link from "next/link";
import { notes } from "../../lib/content/notes";
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
  title: "Research Notes — Sagitta AAA",
  description:
    "Public reasoning behind deterministic allocation, policy design, authority-gated decision intelligence, and scenario governance. Research notes from the Sagitta AAA team.",
  alternates: { canonical: "https://aaa.sagitta.systems/research-notes" },
  openGraph: {
    title: "Research Notes — Sagitta AAA",
    description:
      "Public reasoning behind deterministic allocation, policy design, and scenario governance. Research notes from the Sagitta team.",
    url: "https://aaa.sagitta.systems/research-notes",
  },
};

export default function ResearchNotesPage() {
  return (
    <PublicPage>
      <StructuredData data={ORGANIZATION_SCHEMA} />
      <StructuredData
        data={breadcrumbSchema([
          { name: "Home", url: "https://aaa.sagitta.systems/" },
          { name: "Research Notes", url: "https://aaa.sagitta.systems/research-notes" },
        ])}
      />

      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Research Notes" }]} />

      <PageHeader
        eyebrow="Research"
        title="Research notes"
        lead="Public reasoning behind deterministic allocation, policy governance, authority-gated decision systems, and scenario modeling. These notes document the thinking behind Sagitta AAA — not marketing, but the actual intellectual framework."
      />

      <div style={{ display: "flex", flexDirection: "column", gap: 20, maxWidth: 800 }}>
        {notes.map((note) => (
          <Link
            key={note.slug}
            href={`/research-notes/${note.slug}`}
            style={{ textDecoration: "none" }}
          >
            <article
              className="surface panel card-hover"
              style={{ borderRadius: 14, display: "block" }}
            >
              <div style={{ fontSize: 12, color: "rgba(255,255,255,0.45)", marginBottom: 8 }}>
                {note.date} &middot; {note.subtitle}
                {note.audioUrl && (
                  <span
                    style={{
                      marginLeft: 10,
                      fontSize: 11,
                      color: "var(--sagitta-blue-muted, #7AA1C2)",
                      border: "1px solid rgba(122,161,194,0.35)",
                      padding: "2px 8px",
                      borderRadius: 999,
                    }}
                  >
                    Audio available
                  </span>
                )}
              </div>
              <h2 style={{ fontSize: 17, fontWeight: 600, color: "#e6edf3", margin: "0 0 8px" }}>
                {note.title}
              </h2>
              <p style={{ fontSize: 14, color: "rgba(255,255,255,0.62)", margin: 0, lineHeight: 1.55 }}>
                {note.content.trim().split(/\n/)[0].slice(0, 160)}...
              </p>
              <div style={{ marginTop: 12, fontSize: 13, color: "var(--sagitta-blue, #63D4FF)" }}>
                Read note &rarr;
              </div>
            </article>
          </Link>
        ))}
      </div>

      <div style={{ marginTop: 48, display: "flex", flexWrap: "wrap", gap: 16 }}>
        <InternalLink href="/methodology">Allocation methodology</InternalLink>
        <InternalLink href="/decision-records">Decision records</InternalLink>
        <InternalLink href="/changelog">Changelog</InternalLink>
      </div>
    </PublicPage>
  );
}
