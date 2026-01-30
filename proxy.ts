import { NextRequest } from "next/server";
import { auth0 } from "./lib/auth0";

const DEBUG = true;

export default async function proxy(req: NextRequest) {
  const rawCookie = req.headers.get("cookie") ?? "";
  const maskedCookiePreview = rawCookie ? `${rawCookie.slice(0, 30)}${rawCookie.length > 60 ? "…"+rawCookie.slice(-20) : ""}` : "(none)";
  if (DEBUG) {
    console.log("[sagitta:proxy] incoming", { url: req.nextUrl.pathname + req.nextUrl.search, method: req.method, cookiePreview: maskedCookiePreview });
  }
  
  try {
    // cast via unknown -> Request to avoid using `any`
    const res = await auth0.middleware(req as unknown as Request);
    if (DEBUG) {
      console.log("[sagitta:proxy] auth0.middleware returned", { ok: !!res });
    }
    return res;
  } catch (e: unknown) {
    if (DEBUG) console.log("[sagitta:proxy] auth0.middleware failed", { err: String(e) });
    throw e;
  }
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)",
  ],
};
