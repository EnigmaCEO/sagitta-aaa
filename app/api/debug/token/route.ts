import { NextRequest, NextResponse } from "next/server";
import { auth0 } from "@/lib/auth0";

// Debug route: GET /api/debug/token
//
// This endpoint exists only to diagnose Auth0 audience/scope misconfiguration
// during local development. It is INVISIBLE (404) in production and requires a
// signed-in session everywhere else. It never returns token material -- only
// shape metadata and the non-secret `aud`/`exp`/`scope` claims.

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const notFound = () =>
  NextResponse.json({ error: "not_found" }, { status: 404 });

/**
 * Debug routes are exposed only outside production, and only when explicitly
 * opted in. Anything else resolves to 404 so the route is indistinguishable
 * from a nonexistent path.
 */
function debugRoutesEnabled(): boolean {
  if (process.env.NODE_ENV === "production") return false;
  return process.env.ENABLE_DEBUG_ROUTES === "1";
}

function describeJwt(token: string | undefined) {
  if (!token) return undefined;
  const parts = token.split(".");
  if (parts.length !== 3) return undefined;
  try {
    const payloadPart = parts[1];
    const pad =
      payloadPart.length % 4 === 0 ? "" : "=".repeat(4 - (payloadPart.length % 4));
    const b64 = payloadPart.replace(/-/g, "+").replace(/_/g, "/") + pad;
    const payload = JSON.parse(
      Buffer.from(b64, "base64").toString("utf8"),
    ) as Record<string, unknown>;
    // Only non-secret, diagnostic claims. Never `sub`, never the raw payload.
    return {
      aud: payload.aud ?? payload.audience,
      exp: payload.exp,
      scope: payload.scope ?? payload.scopes,
    };
  } catch {
    return undefined;
  }
}

export async function GET(req: NextRequest) {
  if (!debugRoutesEnabled()) return notFound();

  // Never disclose token shape to an anonymous caller.
  let session: unknown;
  try {
    session = await auth0.getSession(req);
  } catch {
    session = null;
  }
  if (!session) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  try {
    const token = await auth0.getAccessTokenString(req);
    return NextResponse.json({
      ok: true,
      tokenPresent: !!token,
      tokenLength: token?.length ?? 0,
      tokenLooksLikeJwt: typeof token === "string" && token.split(".").length === 3,
      claims: describeJwt(token),
      hint:
        "If aud does not match your AAA API Identifier, set AAA_API_AUDIENCE in .env.local and restart Next.",
    });
  } catch {
    // Controlled failure: no error string, no token, no stack.
    return NextResponse.json(
      { ok: false, error: "token_unavailable" },
      { status: 200 },
    );
  }
}
