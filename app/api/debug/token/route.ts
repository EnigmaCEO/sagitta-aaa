import { NextRequest, NextResponse } from "next/server";
import { auth0 } from "@/lib/auth0";

// Quick debug route: GET /api/debug/token
// - returns masked token info, keys present on the token response, and decoded JWT payload (if possible)
// - DO NOT enable in production; remove when debugging is complete.

function mask(s: string | undefined) {
  if (!s) return undefined;
  if (s.length <= 12) return "****";
  return `${s.slice(0, 6)}…${s.slice(-6)}`;
}

function tryDecodeJwtPayload(token: string | undefined) {
  if (!token) return undefined;
  const parts = token.split(".");
  if (parts.length !== 3) return undefined;
  try {
    const payloadPart = parts[1];
    const pad = payloadPart.length % 4 === 0 ? "" : "=".repeat(4 - (payloadPart.length % 4));
    const b64 = payloadPart.replace(/-/g, "+").replace(/_/g, "/") + pad;
    const json = Buffer.from(b64, "base64").toString("utf8");
    return JSON.parse(json) as Record<string, unknown>;
  } catch {
    return undefined;
  }
}

export async function GET(req: NextRequest) {
  try {
    // 1) normalized token string
    const tokenString = await auth0.getAccessTokenString();
    // 2) full raw response from SDK (keys only)
    let raw: unknown;
    try {
      raw = await auth0.getAccessToken();
    } catch (e: unknown) {
      raw = { error: String(e) };
    }

    const payload = tryDecodeJwtPayload(tokenString ?? undefined);
    const tokenIsJwt = typeof tokenString === "string" && tokenString.split(".").length === 3;
    const tokenLength = typeof tokenString === "string" ? tokenString.length : 0;
    const dotCount = typeof tokenString === "string" ? (tokenString.match(/\./g) || []).length : 0;

    const body: Record<string, unknown> = {
      ok: true,
      tokenPresent: !!tokenString,
      maskedToken: mask(tokenString),
      tokenLength,
      dotCount,
      tokenLooksLikeJwt: tokenIsJwt,
      tokenKeys: raw && typeof raw === "object" ? Object.keys(raw as Record<string, unknown>) : [typeof raw],
      jwtPayloadKeys: payload ? Object.keys(payload) : undefined,
      jwtPayloadSubset: payload
        ? {
            aud: payload.aud ?? payload.audience,
            exp: payload.exp,
            sub: payload.sub,
            scope: payload.scope ?? payload.scopes,
          }
        : undefined,
      hint: "If aud does not match your AAA API Identifier, set AAA_API_AUDIENCE in .env.local and restart Next.",
    };

    // Include full token only when explicitly enabled for debugging (safer)
    if (process.env.DEBUG_FULL_TOKEN === "1" && tokenString) {
      body.fullToken = tokenString;
    }

    return NextResponse.json(body);
  } catch (e: unknown) {
    return NextResponse.json({ ok: false, error: String(e) }, { status: 500 });
  }
}
