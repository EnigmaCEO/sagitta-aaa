import type { NextApiRequest, NextApiResponse } from "next";
import { Auth0Client } from "@auth0/nextjs-auth0/server";

const API_BASE =
  process.env.AAA_API_BASE_URL || process.env.NEXT_PUBLIC_API_BASE_URL;

const client = new Auth0Client();

function extractToken(tokenRes: unknown): string | undefined {
  if (!tokenRes) return undefined;
  if (typeof tokenRes === "string") return tokenRes;
  if (typeof tokenRes === "object") {
    const r = tokenRes as Record<string, unknown>;
    return (
      (typeof r.token === "string" && r.token) ||
      (typeof r.accessToken === "string" && r.accessToken) ||
      (typeof r.access_token === "string" && r.access_token) ||
      undefined
    );
  }
  return undefined;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (!API_BASE) {
    res.status(500).json({ ok: false, error: "AAA_API_BASE_URL not set" });
    return;
  }

  // ✅ Pages Router gives real req/res, so this works
  const tokenRes = await (client.getAccessToken as unknown as (req: NextApiRequest, res: NextApiResponse, opts?: unknown) => Promise<unknown>)(
    req,
    res,
    {
      audience: process.env.AAA_API_AUDIENCE || process.env.AUTH0_AUDIENCE,
    }
  );

  const accessToken = extractToken(tokenRes);

  if (!accessToken) {
    res.status(401).json({ ok: false, error: "no access token available" });
    return;
  }

  const pathParts = (req.query.path as string[]) || [];
  const qsIndex = (req.url || "").indexOf("?");
  const qs = qsIndex >= 0 ? (req.url || "").slice(qsIndex) : "";
  const targetUrl = `${API_BASE.replace(/\/+$/, "")}/${pathParts.join("/")}${qs}`;

  const isGetOrHead = req.method ? ["GET", "HEAD"].includes(req.method) : false;
  const body: BodyInit | undefined = isGetOrHead ? undefined : (req.body as unknown as BodyInit | undefined);

  const upstream = await fetch(targetUrl, {
    method: req.method,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      ...(req.headers["content-type"] ? { "content-type": String(req.headers["content-type"]) } : {}),
      ...(req.headers["accept"] ? { accept: String(req.headers["accept"]) } : {}),
    },
    body,
  });

  const contentType = upstream.headers.get("content-type") || "application/octet-stream";
  const buf = Buffer.from(await upstream.arrayBuffer());

  res.status(upstream.status);
  res.setHeader("content-type", contentType);
  res.send(buf);
}
