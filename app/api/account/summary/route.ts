import { NextResponse } from "next/server";
import { auth0 } from "@/lib/auth0";

export const runtime = "nodejs";

type Summary = {
  user: { sub: string; email: string | null };
  account: { account_id: string | null };
  authority_level: number;
  plan_key: string | null;
  billing: {
    mode: "stripe" | "invoice";
    status?: string | null;
    term_end?: string | null;
    stripe_customer_id?: string | null;
  };
  security: {
    mfa_required: boolean;
    mfa_enrolled?: boolean | null;
  };
};

function inferMfaEnrolled(user: Record<string, unknown>): boolean | null {
  const amr = user["amr"];
  if (!Array.isArray(amr)) return null;
  const values = amr.map((v) => String(v).toLowerCase());
  return values.some((v) => ["mfa", "otp", "sms", "totp", "ga"].includes(v));
}

export async function GET(request: Request) {
  const session = await auth0.getSession(request).catch(() => null);
  if (!session || !session.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const accessToken = await auth0.getAccessTokenString(request).catch(() => undefined);
  if (!accessToken) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const base = process.env.AAA_API_BASE_URL;
  if (!base) {
    return NextResponse.json({ error: "Missing AAA_API_BASE_URL env var" }, { status: 500 });
  }

  const sessionUser = session.user as Record<string, unknown>;
  const user = {
    sub: typeof sessionUser.sub === "string" ? sessionUser.sub : "",
    email: typeof sessionUser.email === "string" ? sessionUser.email : null,
  };

  let authority_level = 0;
  let plan_key: string | null = null;
  let account_id: string | null = null;

  try {
    const meRes = await fetch(`${base.replace(/\/+$/, "")}/me`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: "application/json",
      },
      cache: "no-store",
    });
    if (meRes.ok) {
      const me = (await meRes.json()) as Record<string, unknown>;
      authority_level = Number(me.authority_level ?? 0);
      plan_key = typeof me.plan_key === "string" ? me.plan_key : null;
      account_id = typeof me.account_id === "string" ? me.account_id : null;
    }
  } catch {
    // ignore
  }

  const mode: Summary["billing"]["mode"] =
    authority_level === 1 ? "stripe" : "invoice";

  const billing: Summary["billing"] = { mode, status: null, term_end: null, stripe_customer_id: null };

  try {
    const billRes = await fetch(`${base.replace(/\/+$/, "")}/billing/summary`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: "application/json",
      },
      cache: "no-store",
    });
    if (billRes.ok) {
      const data = (await billRes.json()) as Record<string, unknown>;
      const sub = data["subscription"] as Record<string, unknown> | null;
      billing.status = typeof sub?.status === "string" ? sub?.status : null;
      billing.term_end = typeof sub?.current_period_end === "string" ? sub?.current_period_end : null;
      billing.stripe_customer_id = typeof data["stripe_customer_id"] === "string" ? (data["stripe_customer_id"] as string) : null;
    }
  } catch {
    // ignore
  }

  const summary: Summary = {
    user,
    account: { account_id },
    authority_level,
    plan_key,
    billing,
    security: {
      mfa_required: authority_level >= 2,
      mfa_enrolled: inferMfaEnrolled(session.user as Record<string, unknown>),
    },
  };

  return NextResponse.json(summary);
}
