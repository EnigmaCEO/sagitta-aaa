import type { MetadataRoute } from "next";

const BASE_URL = "https://aaa.sagitta.systems";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${BASE_URL}/`,
      lastModified: new Date("2026-01-25"),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/what-is-aaa`,
      lastModified: new Date("2026-01-25"),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/for-daos`,
      lastModified: new Date("2026-01-25"),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/for-portfolio-managers`,
      lastModified: new Date("2026-01-25"),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/for-treasury-operators`,
      lastModified: new Date("2026-01-25"),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/methodology`,
      lastModified: new Date("2026-01-25"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/decision-records`,
      lastModified: new Date("2026-01-25"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/security`,
      lastModified: new Date("2026-01-25"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/pricing`,
      lastModified: new Date("2026-01-25"),
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: `${BASE_URL}/faq`,
      lastModified: new Date("2026-01-25"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/docs`,
      lastModified: new Date("2026-01-25"),
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: `${BASE_URL}/compare/aaa-vs-manual-allocation`,
      lastModified: new Date("2026-01-25"),
      changeFrequency: "monthly",
      priority: 0.75,
    },
    {
      url: `${BASE_URL}/compare/aaa-vs-signal-tools`,
      lastModified: new Date("2026-01-25"),
      changeFrequency: "monthly",
      priority: 0.75,
    },
    {
      url: `${BASE_URL}/changelog`,
      lastModified: new Date("2026-01-25"),
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/research-notes`,
      lastModified: new Date("2026-01-25"),
      changeFrequency: "weekly",
      priority: 0.75,
    },
    {
      url: `${BASE_URL}/research-notes/determinism-discretion-and-trust-in-automated-allocation`,
      lastModified: new Date("2025-12-30"),
      changeFrequency: "yearly",
      priority: 0.65,
    },
    {
      url: `${BASE_URL}/research-notes/authority-gated-decision-intelligence-in-crypto-native-institutions`,
      lastModified: new Date("2026-01-08"),
      changeFrequency: "yearly",
      priority: 0.65,
    },
    {
      url: `${BASE_URL}/research-notes/designing-enforceable-allocation-policy-for-decentralized-organizations`,
      lastModified: new Date("2026-01-15"),
      changeFrequency: "yearly",
      priority: 0.65,
    },
    {
      url: `${BASE_URL}/research-notes/scenario-governance-in-on-chain-markets`,
      lastModified: new Date("2026-01-25"),
      changeFrequency: "yearly",
      priority: 0.65,
    },
    {
      url: `${BASE_URL}/privacy`,
      lastModified: new Date("2026-01-31"),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/terms`,
      lastModified: new Date("2026-01-31"),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/support`,
      lastModified: new Date("2026-01-25"),
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];
}
