/**
 * StructuredData — injects JSON-LD script tags for structured data.
 * All data must match visible page content. Do not add fake ratings or reviews.
 */

type JsonLdValue = string | number | boolean | null | JsonLdObject | JsonLdValue[];
type JsonLdObject = { [key: string]: JsonLdValue };

export function StructuredData({ data }: { data: JsonLdObject | JsonLdObject[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

// ── Prebuilt schemas ────────────────────────────────────────────────────────

export const ORGANIZATION_SCHEMA: JsonLdObject = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Sagitta Labs",
  url: "https://aaa.sagitta.systems",
  logo: "https://aaa.sagitta.systems/logo.png",
  contactPoint: {
    "@type": "ContactPoint",
    email: "support@sagitta.systems",
    contactType: "customer support",
  },
};

export const SOFTWARE_APPLICATION_SCHEMA: JsonLdObject = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Sagitta AAA",
  applicationCategory: "FinanceApplication",
  operatingSystem: "Web",
  url: "https://aaa.sagitta.systems",
  description:
    "Policy-driven, non-custodial allocation and risk engine for crypto-native institutions, DAOs, treasury operators, and portfolio managers.",
  offers: [
    {
      "@type": "Offer",
      name: "Observer Access",
      price: "0",
      priceCurrency: "USD",
    },
    {
      "@type": "Offer",
      name: "Sandbox Authority",
      price: "79",
      priceCurrency: "USD",
      billingIncrement: "P1M",
    },
    {
      "@type": "Offer",
      name: "Production Authority",
      price: "499",
      priceCurrency: "USD",
      billingIncrement: "P1M",
    },
  ],
};

export function breadcrumbSchema(
  items: Array<{ name: string; url: string }>
): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function faqSchema(
  items: Array<{ question: string; answer: string }>
): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export function articleSchema(opts: {
  headline: string;
  description: string;
  datePublished: string;
  dateModified?: string;
  url: string;
}): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: opts.headline,
    description: opts.description,
    datePublished: opts.datePublished,
    dateModified: opts.dateModified ?? opts.datePublished,
    url: opts.url,
    publisher: {
      "@type": "Organization",
      name: "Sagitta Labs",
      url: "https://aaa.sagitta.systems",
    },
  };
}
