// app/api/aaa/billing/checkout/route.ts
import { NextResponse } from "next/server";
import { auth0 } from "@/lib/auth0";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const base = process.env.AAA_API_BASE_URL;
  if (!base) {
    return NextResponse.json(
      { error: "Missing AAA_API_BASE_URL env var" },
      { status: 500 }
    );
  }

  // Auth: require logged-in user
  const accessToken = await auth0.getAccessTokenString().catch(() => undefined);
  if (!accessToken) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Expect JSON body: { plan_key: "sandbox" | "production" | ... }
  let body: unknown = null;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  // Narrow the parsed body to a record so we can safely index into it
  const parsed = body as Record<string, unknown> | null;
  const plan_key = typeof parsed?.["plan_key"] === "string" ? (parsed["plan_key"] as string) : "";
  if (!plan_key) {
    return NextResponse.json(
      { error: "Missing plan_key (expected { plan_key: string })" },
      { status: 400 }
    );
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
      body: JSON.stringify({ plan_key }),
      cache: "no-store",
    });

    const contentType = upstream.headers.get("content-type") ?? "";
    const status = upstream.status;

    if (contentType.includes("application/json")) {
      const json = await upstream.json();
      return NextResponse.json(json, { status });
    } else {
      const txt = await upstream.text();
      return new NextResponse(txt, {
        status,
        headers: { "content-type": contentType || "text/plain" },
      });
    }
  } catch (err: unknown) {
    return NextResponse.json(
      { error: "proxy error", detail: err instanceof Error ? err.message : String(err) },
      { status: 502 }
    );
  }
}
