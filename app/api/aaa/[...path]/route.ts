import { NextRequest, NextResponse } from "next/server";
import { auth0 } from "@/lib/auth0";

export const runtime = "nodejs";

const API_BASE = process.env.AAA_API_BASE_URL;
const DEBUG = true;

async function proxy(
  req: NextRequest,
  ctx: { params: Promise<{ path?: string[] }> } // ✅ Next 16: params is async
) {
  if (!API_BASE) {
    return NextResponse.json({ ok: false, error: "AAA_API_BASE_URL not set" }, { status: 500 });
  }

  const accessToken = await auth0.getAccessTokenString().catch(() => undefined);
  if (!accessToken) {
    return NextResponse.json({ ok: false, error: "no access token available" }, { status: 401 });
  }

  // ✅ Next 16 requirement: unwrap params before use
  const { path = [] } = await ctx.params;

  const targetUrl = `${API_BASE.replace(/\/+$/, "")}/${path.join("/")}${req.nextUrl.search}`;

  const hasBody = !["GET", "HEAD"].includes(req.method);
  const body = hasBody ? await req.arrayBuffer() : undefined;

  const headers = new Headers();
  headers.set("authorization", `Bearer ${accessToken}`);
  if (req.headers.get("content-type")) headers.set("content-type", req.headers.get("content-type")!);
  if (req.headers.get("accept")) headers.set("accept", req.headers.get("accept")!);

  if (DEBUG) console.log("[sagitta:api] proxy", { method: req.method, targetUrl });

  const upstream = await fetch(targetUrl, {
    method: req.method,
    headers,
    body: hasBody ? body : undefined,
    cache: "no-store",
  });

  const contentType = upstream.headers.get("content-type") || "application/octet-stream";
  const bytes = await upstream.arrayBuffer();

  return new NextResponse(bytes, {
    status: upstream.status,
    headers: { "content-type": contentType },
  });
}

export const GET = proxy;
export const POST = proxy;
export const PUT = proxy;
export const PATCH = proxy;
export const DELETE = proxy;
