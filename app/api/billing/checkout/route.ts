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

  const accessToken = await auth0.getAccessTokenString(request).catch(() => undefined);
  if (!accessToken) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const authorityLevel = await fetchAuthorityLevel(base, accessToken);
  if (authorityLevel === null) {
    return NextResponse.json({ error: "authority_lookup_failed" }, { status: 502 });
  }
  if (authorityLevel > 0) {
    return NextResponse.json({ error: "not_observer" }, { status: 409 });
  }

  let planKey = "sandbox";
  try {
    const body = await request.json().catch(() => null);
    if (body && typeof body.plan_key === "string" && body.plan_key.trim()) {
      planKey = body.plan_key.trim().toLowerCase();
    }
  } catch {
    // ignore invalid body; default to sandbox
  }

  const target = `${base.replace(/\/+$/, "")}/billing/checkout`;

  try {
    const upstream = await fetch(target, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ plan_key: planKey }),
      cache: "no-store",
    });

    const contentType = upstream.headers.get("content-type") ?? "";
    const status = upstream.status;

    if (contentType.includes("application/json")) {
      const json = await upstream.json();
      return NextResponse.json(json, { status });
    }

    const text = await upstream.text();
    if (!upstream.ok) {
      return NextResponse.json({ error: text || "checkout_failed" }, { status });
    }
    return new NextResponse(text, {
      status,
      headers: { "content-type": contentType || "text/plain" },
    });
  } catch (err: unknown) {
    return NextResponse.json(
      { error: "proxy_error", detail: err instanceof Error ? err.message : String(err) },
      { status: 502 }
    );
  }
}
