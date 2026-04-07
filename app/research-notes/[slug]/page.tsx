import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { notes, getNoteBySlug } from "../../../lib/content/notes";
import {
  PublicPage,
  Breadcrumbs,
  InternalLink,
} from "../../../components/PublicLayout";
import {
  StructuredData,
  ORGANIZATION_SCHEMA,
  breadcrumbSchema,
  articleSchema,
} from "../../../components/StructuredData";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return notes.map((note) => ({ slug: note.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const note = getNoteBySlug(slug);
  if (!note) return {};
  return {
    title: note.title,
    description: `${note.subtitle} — ${note.content.trim().split(/\n/)[0].slice(0, 140)}`,
    alternates: { canonical: `https://aaa.sagitta.systems/research-notes/${slug}` },
    openGraph: {
      title: note.title,
      description: note.content.trim().split(/\n/)[0].slice(0, 160),
      url: `https://aaa.sagitta.systems/research-notes/${slug}`,
      type: "article",
    },
  };
}

/** Very minimal markdown → React. No dependencies. */
function renderContent(content: string) {
  const paragraphs: React.ReactNode[] = [];
  const lines = content.split(/\r?\n/);
  let buffer: string[] = [];
  let listItems: string[] = [];

  const flushBuffer = () => {
    if (buffer.length) {
      const text = buffer.join(" ").trim();
      if (text) {
        paragraphs.push(
          <p key={paragraphs.length} style={{ fontSize: 16, color: "rgba(255,255,255,0.78)", lineHeight: 1.7, marginBottom: 18 }}>
            {text}
          </p>
        );
      }
      buffer = [];
    }
  };

  const flushList = () => {
    if (listItems.length) {
      paragraphs.push(
        <ul key={paragraphs.length} style={{ paddingLeft: 20, marginBottom: 18, display: "flex", flexDirection: "column", gap: 6 }}>
          {listItems.map((item, i) => (
            <li key={i} style={{ fontSize: 15, color: "rgba(255,255,255,0.75)", lineHeight: 1.65 }}>{item}</li>
          ))}
        </ul>
      );
      listItems = [];
    }
  };

  for (const raw of lines) {
    const line = raw.trim();

    if (line.startsWith("## ")) {
      flushBuffer();
      flushList();
      paragraphs.push(
        <h2 key={paragraphs.length} style={{ fontSize: 22, fontWeight: 600, color: "#e6edf3", marginTop: 36, marginBottom: 12 }}>
          {line.slice(3)}
        </h2>
      );
    } else if (line.startsWith("### ")) {
      flushBuffer();
      flushList();
      paragraphs.push(
        <h3 key={paragraphs.length} style={{ fontSize: 17, fontWeight: 600, color: "rgba(255,255,255,0.88)", marginTop: 24, marginBottom: 10 }}>
          {line.slice(4)}
        </h3>
      );
    } else if (line.startsWith("- ") || line.startsWith("* ")) {
      flushBuffer();
      listItems.push(line.slice(2));
    } else if (!line) {
      flushBuffer();
      flushList();
    } else {
      listItems.length > 0 && flushList();
      buffer.push(line);
    }
  }
  flushBuffer();
  flushList();
  return paragraphs;
}

export default async function ResearchNotePage({ params }: Props) {
  const { slug } = await params;
  const note = getNoteBySlug(slug);
  if (!note) notFound();

  const wordCount = note.content.replace(/[#*_`>-]/g, " ").trim().split(/\s+/).length;
  const readingTime = Math.max(1, Math.ceil(wordCount / 200));

  return (
    <PublicPage maxWidth={760}>
      <StructuredData data={ORGANIZATION_SCHEMA} />
      <StructuredData
        data={breadcrumbSchema([
          { name: "Home", url: "https://aaa.sagitta.systems/" },
          { name: "Research Notes", url: "https://aaa.sagitta.systems/research-notes" },
          { name: note.title, url: `https://aaa.sagitta.systems/research-notes/${slug}` },
        ])}
      />
      <StructuredData
        data={articleSchema({
          headline: note.title,
          description: note.subtitle,
          datePublished: note.date,
          url: `https://aaa.sagitta.systems/research-notes/${slug}`,
        })}
      />

      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Research Notes", href: "/research-notes" },
          { label: note.title },
        ]}
      />

      <header style={{ marginBottom: 36 }}>
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
          {note.subtitle}
        </div>
        <h1
          style={{
            fontSize: "clamp(26px, 4vw, 40px)",
            fontWeight: 700,
            lineHeight: 1.15,
            color: "#ededed",
            margin: "0 0 14px",
          }}
        >
          {note.title}
        </h1>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", fontSize: 13, color: "rgba(255,255,255,0.5)", alignItems: "center" }}>
          <span>{note.date}</span>
          <span aria-hidden="true">&middot;</span>
          <span>{readingTime} min read</span>
          {note.audioUrl && (
            <>
              <span aria-hidden="true">&middot;</span>
              <span
                style={{
                  fontSize: 11,
                  color: "var(--sagitta-blue-muted, #7AA1C2)",
                  border: "1px solid rgba(122,161,194,0.35)",
                  padding: "2px 8px",
                  borderRadius: 999,
                }}
              >
                Audio available
              </span>
            </>
          )}
        </div>
      </header>

      {note.audioUrl && (
        <div style={{ marginBottom: 28 }}>
          <audio controls preload="none" style={{ width: "100%", maxWidth: 420, height: 36 }}>
            <source src={note.audioUrl} />
          </audio>
        </div>
      )}

      <article style={{ maxWidth: 720 }}>
        {renderContent(note.content)}
      </article>

      <hr style={{ border: "none", borderTop: "1px solid rgba(255,255,255,0.08)", margin: "40px 0" }} />

      <section aria-label="Related notes">
        <div style={{ fontSize: 11, fontWeight: 600, color: "rgba(255,255,255,0.55)", marginBottom: 16, textTransform: "uppercase", letterSpacing: "0.12em" }}>
          Other research notes
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {notes
            .filter((n) => n.slug !== slug)
            .map((n) => (
              <Link
                key={n.slug}
                href={`/research-notes/${n.slug}`}
                style={{ textDecoration: "none" }}
              >
                <div
                  className="surface panel"
                  style={{ borderRadius: 10, transition: "border-color 0.15s" }}
                >
                  <div style={{ fontSize: 14, fontWeight: 600, color: "#e6edf3", marginBottom: 4 }}>{n.title}</div>
                  <div style={{ fontSize: 12, color: "rgba(255,255,255,0.5)" }}>{n.date} &middot; {n.subtitle}</div>
                </div>
              </Link>
            ))}
        </div>
      </section>

      <div style={{ marginTop: 40, display: "flex", flexWrap: "wrap", gap: 16 }}>
        <InternalLink href="/research-notes">All research notes</InternalLink>
        <InternalLink href="/methodology">Allocation methodology</InternalLink>
        <InternalLink href="/decision-records">Decision records</InternalLink>
      </div>
    </PublicPage>
  );
}
