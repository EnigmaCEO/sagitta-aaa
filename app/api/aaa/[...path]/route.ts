import { NextRequest, NextResponse } from "next/server";
import { auth0 } from "@/lib/auth0";

export const runtime = "nodejs";

const API_BASE = process.env.AAA_API_BASE_URL;
const DEBUG = true;

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
    upstreamPath === "/portfolios" || upstreamPath.startsWith("/portfolios/");
    
  // ✅ In App Router, pass the request for correct cookie scope
  const tokenRes = await auth0.getAccessToken().catch(() => null);

  const accessToken =
    tokenRes && typeof tokenRes === "object" && "token" in tokenRes
      ? (tokenRes as { token?: string }).token
      : undefined;
  

  //console.log("[sagitta:api] proxy", { method: req.method, upstreamPath, protectedRead, authed: !!accessToken });


  // ✅ Writes require auth; reads do not
  if (!accessToken && (!isRead && !protectedRead)) {
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

  const upstream = await fetch(targetUrl, {
    method: req.method,
    headers,
    body: hasBody ? body : undefined,
    cache: "no-store",
    credentials: "include",
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
