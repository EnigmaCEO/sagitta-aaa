// app/api/aaa/me/route.ts
import { NextResponse } from "next/server";
import { auth0 } from "@/lib/auth0";

export const runtime = "nodejs";

export async function GET() {
  const base = process.env.AAA_API_BASE_URL;
  if (!base) {
    return NextResponse.json({ error: "Missing AAA_API_BASE_URL env var" }, { status: 500 });
  }

  // ✅ App Router: do NOT pass req/res
  const accessToken = await auth0.getAccessTokenString().catch(() => undefined);

  if (!accessToken) {
    return NextResponse.json(
      { error: "failed to obtain access token", detail: "no access token available" },
      { status: 401 }
    );
  }

  const target = `${base.replace(/\/+$/, "")}/me`;

  try {
    const upstream = await fetch(target, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: "application/json",
      },
      cache: "no-store",
    });

    const contentType = upstream.headers.get("content-type") ?? "";
    const status = upstream.status;

    if (contentType.includes("application/json")) {
      const json = await upstream.json();
      return NextResponse.json(json, { status });
    } else {
      const txt = await upstream.text();
      return new NextResponse(txt, { status, headers: { "content-type": contentType || "text/plain" } });
    }
  } catch (err: unknown) {
    return NextResponse.json(
      { error: "proxy error", detail: err instanceof Error ? err.message : String(err) },
      { status: 502 }
    );
  }
}
