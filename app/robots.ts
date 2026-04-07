import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/app",
          "/app/",
          "/account",
          "/account/",
          "/billing",
          "/billing/",
          "/auth",
          "/auth/",
          "/api/",
        ],
      },
      {
        userAgent: "OAI-SearchBot",
        allow: "/",
        disallow: [
          "/app",
          "/app/",
          "/account",
          "/account/",
          "/billing",
          "/billing/",
          "/auth",
          "/auth/",
          "/api/",
        ],
      },
      {
        userAgent: "GPTBot",
        disallow: "/",
      },
    ],
    sitemap: "https://aaa.sagitta.systems/sitemap.xml",
  };
}