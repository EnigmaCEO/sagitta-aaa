import { NextRequest, NextResponse } from "next/server";
import { getDecisionRecordHtml, putDecisionRecordHtml } from "@/lib/decisionRecordCache";

const MAX_HTML_BYTES = 5 * 1024 * 1024; // 5MB guardrail

function makeToken(): string {
  return `dr_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as { token?: string; html?: string };
    const html = typeof body?.html === "string" ? body.html : "";
    if (!html) {
      return NextResponse.json({ ok: false, error: "html is required" }, { status: 400 });
    }
    if (Buffer.byteLength(html, "utf8") > MAX_HTML_BYTES) {
      return NextResponse.json({ ok: false, error: "html payload too large" }, { status: 413 });
    }
    const token = typeof body?.token === "string" && body.token.trim() ? body.token.trim() : makeToken();
    putDecisionRecordHtml(token, html);
    return NextResponse.json({ ok: true, token });
  } catch (e: unknown) {
    return NextResponse.json({ ok: false, error: String(e) }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const token = req.nextUrl.searchParams.get("token") || "";
    if (!token) {
      return NextResponse.json({ ok: false, error: "token is required" }, { status: 400 });
    }
    const html = getDecisionRecordHtml(token);
    if (!html) {
      return NextResponse.json({ ok: false, error: "decision record not found or expired" }, { status: 404 });
    }
    return NextResponse.json({ ok: true, html });
  } catch (e: unknown) {
    return NextResponse.json({ ok: false, error: String(e) }, { status: 500 });
  }
}

