/**
 * IndexNow submission endpoint.
 *
 * IndexNow lets search engines discover updated URLs immediately rather than
 * waiting for the next crawl. Call this route after deployments or content
 * updates to notify Bing, Yandex, and other IndexNow-compatible engines.
 *
 * Environment variables required:
 *   INDEXNOW_KEY — your IndexNow API key (generate once at bing.com/indexnow)
 *
 * The key file must also be served at:
 *   https://aaa.sagitta.systems/<INDEXNOW_KEY>.txt
 * Place it in /public/<INDEXNOW_KEY>.txt with the key as the file content.
 *
 * Usage (from deployment script or CI):
 *   POST /api/indexnow
 *   Authorization: Bearer <INDEXNOW_INTERNAL_SECRET>
 *   Content-Type: application/json
 *   Body: { "urls": ["https://aaa.sagitta.systems/changelog"] }   // optional override
 *
 * When no body is provided, all canonical public URLs are submitted.
 */

import { NextRequest, NextResponse } from "next/server";

const BASE_URL = "https://aaa.sagitta.systems";

const PUBLIC_URLS = [
  "/",
  "/what-is-aaa",
  "/for-daos",
  "/for-portfolio-managers",
  "/for-treasury-operators",
  "/methodology",
  "/decision-records",
  "/security",
  "/pricing",
  "/faq",
  "/docs",
  "/compare/aaa-vs-manual-allocation",
  "/compare/aaa-vs-signal-tools",
  "/changelog",
  "/research-notes",
  "/research-notes/determinism-discretion-and-trust-in-automated-allocation",
  "/research-notes/authority-gated-decision-intelligence-in-crypto-native-institutions",
  "/research-notes/designing-enforceable-allocation-policy-for-decentralized-organizations",
  "/research-notes/scenario-governance-in-on-chain-markets",
].map((path) => `${BASE_URL}${path}`);

export async function POST(req: NextRequest) {
  const key = process.env.INDEXNOW_KEY;
  if (!key) {
    return NextResponse.json({ error: "INDEXNOW_KEY not configured" }, { status: 503 });
  }

  // Simple bearer token gate to prevent public abuse.
  const secret = process.env.INDEXNOW_INTERNAL_SECRET;
  if (secret) {
    const authHeader = req.headers.get("authorization") ?? "";
    if (authHeader !== `Bearer ${secret}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }

  let urlList = PUBLIC_URLS;
  try {
    const body = await req.json().catch(() => null);
    if (body?.urls && Array.isArray(body.urls)) {
      urlList = body.urls;
    }
  } catch {
    // Use default list
  }

  const payload = {
    host: "aaa.sagitta.systems",
    key,
    keyLocation: `${BASE_URL}/${key}.txt`,
    urlList,
  };

  const response = await fetch("https://api.indexnow.org/IndexNow", {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const text = await response.text().catch(() => "");
    return NextResponse.json(
      { error: "IndexNow submission failed", status: response.status, detail: text },
      { status: 502 }
    );
  }

  return NextResponse.json({
    ok: true,
    submitted: urlList.length,
    urls: urlList,
  });
}
