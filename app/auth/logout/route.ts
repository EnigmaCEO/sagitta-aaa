import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

function safeReturnTo(req: NextRequest) {
  const origin = req.nextUrl.origin;
  const raw = req.nextUrl.searchParams.get("returnTo") || origin;

  try {
    const parsed = new URL(raw, origin);
    if (parsed.origin !== origin) return origin;
    return parsed.toString();
  } catch {
    return origin;
  }
}

function auth0LogoutUrl(req: NextRequest) {
  const issuer =
    process.env.AUTH0_ISSUER_BASE_URL ||
    (process.env.AUTH0_DOMAIN ? `https://${process.env.AUTH0_DOMAIN}` : "");
  const clientId = process.env.AUTH0_CLIENT_ID || "";
  const returnTo = safeReturnTo(req);

  if (!issuer || !clientId) return returnTo;

  const url = new URL("/v2/logout", issuer);
  url.searchParams.set("client_id", clientId);
  url.searchParams.set("returnTo", returnTo);
  return url.toString();
}

export async function GET(req: NextRequest) {
  const target = auth0LogoutUrl(req);
  const res = NextResponse.redirect(target);

  // Best-effort clear of local session cookies (no-op if absent).
  res.cookies.set("appSession", "", { path: "/", maxAge: 0 });
  res.cookies.set("appSession.0", "", { path: "/", maxAge: 0 });
  res.cookies.set("appSession.1", "", { path: "/", maxAge: 0 });

  return res;
}
