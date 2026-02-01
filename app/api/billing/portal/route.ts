import { NextResponse } from "next/server";
import { auth0 } from "@/lib/auth0";

export const runtime = "nodejs";

async function fetchAuthorityLevel(base: string, accessToken: string) {
  try {
    const res = await fetch(`${base.replace(/\/+$/, "")}/me`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: "application/json",
      },
      cache: "no-store",
    });
    if (!res.ok) return null;
    const data = (await res.json()) as Record<string, unknown>;
    return Number(data.authority_level ?? 0);
  } catch {
    return null;
  }
}

export async function POST(request: Request) {
  const base = process.env.AAA_API_BASE_URL;
  if (!base) {
    return NextResponse.json({ error: "Missing AAA_API_BASE_URL env var" }, { status: 500 });
  }

  const accessToken =
    (await auth0.getAccessTokenString(request).catch(() => undefined)) ||
    (await auth0.getAccessTokenString().catch(() => undefined));
  if (!accessToken) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const authorityLevel = await fetchAuthorityLevel(base, accessToken);
  if (authorityLevel === null) {
    return NextResponse.json({ error: "authority_lookup_failed" }, { status: 502 });
  }
  if (authorityLevel !== 1) {
    return NextResponse.json({ error: "not_sandbox" }, { status: 409 });
  }

  const appBase = (process.env.APP_BASE_URL || process.env.NEXT_PUBLIC_BASE_URL || "").trim();
  const returnUrl = appBase ? `${appBase.replace(/\/+$/, "")}/account` : undefined;

  const target = `${base.replace(/\/+$/, "")}/billing/portal`;

  try {
    const upstream = await fetch(target, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(returnUrl ? { return_url: returnUrl } : {}),
      cache: "no-store",
    });

    const contentType = upstream.headers.get("content-type") ?? "";
    const status = upstream.status;

    if (contentType.includes("application/json")) {
      const json = await upstream.json();
      if (!upstream.ok) {
        if (status === 409) {
          return NextResponse.json({ error: "stripe_customer_missing" }, { status: 409 });
        }
        if (status >= 500) {
          return NextResponse.json({ error: "portal_create_failed" }, { status: 500 });
        }
      }
      return NextResponse.json(json, { status });
    }
    const txt = await upstream.text();
    if (!upstream.ok) {
      if (status === 409) {
        return NextResponse.json({ error: "stripe_customer_missing" }, { status: 409 });
      }
      if (status >= 500) {
        return NextResponse.json({ error: "portal_create_failed" }, { status: 500 });
      }
      return NextResponse.json({ error: txt || "portal_request_failed" }, { status });
    }
    return new NextResponse(txt, {
      status,
      headers: { "content-type": contentType || "text/plain" },
    });
  } catch (err: unknown) {
    return NextResponse.json(
      { error: "proxy error", detail: err instanceof Error ? err.message : String(err) },
      { status: 502 }
    );
  }
}
