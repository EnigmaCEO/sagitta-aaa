import { NextRequest, NextResponse } from "next/server";
import { auth0 } from "@/lib/auth0";

export const runtime = "nodejs";

const API_BASE = process.env.AAA_API_BASE_URL;
const DEBUG = process.env.AAA_PROXY_DEBUG === "1" || process.env.NODE_ENV !== "production";

async function proxy(
  req: NextRequest,
  ctx: { params: Promise<{ path?: string[] }> }
) {
  if (!API_BASE) {
    return NextResponse.json({ ok: false, error: "AAA_API_BASE_URL not set" }, { status: 500 });
  }

  const isRead = req.method === "GET" || req.method === "HEAD";

  const { path = [] } = await ctx.params;
  const targetUrl = `${API_BASE.replace(/\/+$/, "")}/${path.join("/")}${req.nextUrl.search}`;

  const upstreamPath = `/${path.join("/")}`;

  // ✅ reads that must still be authenticated
  const protectedRead =
    upstreamPath === "/me" ||
    upstreamPath.startsWith("/scenarios") ||
    upstreamPath.startsWith("/portfolios") ||
    upstreamPath.startsWith("/policies") ||
    upstreamPath.startsWith("/decision-runs");

  // ✅ In App Router, pass the request for correct cookie scope (fallback to global if needed)
  const accessToken =
    (await auth0.getAccessTokenString(req).catch(() => undefined)) ??
    (await auth0.getAccessTokenString().catch(() => undefined));

  const cookieHeader = req.headers.get("cookie") ?? "";
  const cookieNames = cookieHeader
    ? cookieHeader
        .split(";")
        .map((part) => part.split("=")[0]?.trim())
        .filter(Boolean)
    : [];

  if (DEBUG) {
    const session = await auth0.getSession(req).catch(() => null);
    console.log("[sagitta:api] proxy request", {
      method: req.method,
      upstreamPath,
      targetUrl,
      apiBasePresent: !!API_BASE,
      protectedRead,
      hasAccessToken: !!accessToken,
      hasSession: !!session,
      cookieNames,
      contentType: req.headers.get("content-type"),
      accept: req.headers.get("accept"),
    });
  }
  

  //console.log("[sagitta:api] proxy", { method: req.method, upstreamPath, protectedRead, authed: !!accessToken });


  // ✅ Writes require auth; reads require auth for protected endpoints
  if (!accessToken && (!isRead || protectedRead)) {
    return NextResponse.json({ ok: false, error: "Not authenticated (no access token)" }, { status: 401 });
  }
  
  const hasBody = !isRead;
  const body = hasBody ? await req.arrayBuffer() : undefined;

  const headers = new Headers();

  //console.log("[sagitta:api] proxy", { method: req.method, authed: !!accessToken });

  // ✅ Only set Authorization if we actually have a token
  if (accessToken) headers.set("authorization", `Bearer ${accessToken}`);

  if (req.headers.get("content-type")) headers.set("content-type", req.headers.get("content-type")!);
  if (req.headers.get("accept")) headers.set("accept", req.headers.get("accept")!);

  //if (DEBUG) console.log("[sagitta:api] proxy", { method: req.method, targetUrl, authed: !!accessToken });
  //console.log("[sagitta:api] proxy headers", req.method, targetUrl, Array.from(headers.entries()));

  let upstream: Response;
  try {
    upstream = await fetch(targetUrl, {
      method: req.method,
      headers,
      body: hasBody ? body : undefined,
      cache: "no-store",
      credentials: "include",
    });
  } catch (err) {
    if (DEBUG) {
      console.log("[sagitta:api] proxy fetch failed", {
        upstreamPath,
        targetUrl,
        error: err instanceof Error ? err.message : String(err),
      });
    }
    const detail = err instanceof Error ? err.message : String(err);
    return NextResponse.json(
      {
        ok: false,
        error: "upstream_unreachable",
        detail,
        path: upstreamPath,
        target: targetUrl,
      },
      { status: 502 }
    );
  }

  const contentType = upstream.headers.get("content-type") || "application/octet-stream";
  const bytes = await upstream.arrayBuffer();
  if (DEBUG) {
    console.log("[sagitta:api] proxy response", {
      upstreamPath,
      targetUrl,
      status: upstream.status,
      contentType,
    });
  }

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
