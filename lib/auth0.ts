import { Auth0Client } from "@auth0/nextjs-auth0/server";

const AAA_AUDIENCE =
  process.env.AAA_API_AUDIENCE ||
  process.env.AUTH0_AUDIENCE ||
  process.env.NEXT_PUBLIC_AAA_API_AUDIENCE ||
  undefined;

const AAA_SCOPE = process.env.AAA_API_SCOPE || "openid profile email offline_access aaa:read";

const _client = new Auth0Client({
  authorizationParameters: AAA_AUDIENCE
    ? { audience: AAA_AUDIENCE, scope: AAA_SCOPE }
    : { scope: "openid profile email offline_access" },
});

function keysOfUnknown(obj: unknown) {
  if (!obj || typeof obj !== "object") return [];
  try {
    return Object.keys(obj as Record<string, unknown>);
  } catch {
    return ["(unreadable)"];
  }
}

type SessionLike = { user?: unknown } | null;

export const auth0 = {
  async middleware(req: Request) {
    const res = await _client.middleware(req);
    return res;
  },

  // IMPORTANT: in App Router, getAccessToken should be called with request context when available.
  // Your /api routes already have NextRequest; pass it through from the caller.
  async getAccessToken(req?: Request) {
    const res = req
      ? await (_client.getAccessToken as unknown as (r: Request) => Promise<unknown>)(req)
      : await (_client.getAccessToken as unknown as () => Promise<unknown>)();

    console.log("[sagitta:auth0] getAccessToken result shape:", keysOfUnknown(res));
    return res;
  },

  async getAccessTokenString(req?: Request): Promise<string | undefined> {
    const res = await this.getAccessToken(req);
    if (typeof res === "string") return res;
    if (res && typeof res === "object") {
      const r = res as Record<string, unknown>;
      return (
        (typeof r.token === "string" && r.token) ||
        (typeof r.accessToken === "string" && r.accessToken) ||
        (typeof r.access_token === "string" && r.access_token) ||
        undefined
      );
    }
    return undefined;
  },

  async getSession(req?: Request) {
    const res = req
      ? await (_client.getSession as unknown as (r: Request) => Promise<unknown>)(req)
      : await (_client.getSession as unknown as () => Promise<unknown>)();
    return res;
  },
  
  
} as {
    middleware(req: Request): Promise<Response | undefined>;
    getSession(req?: Request): Promise<SessionLike>;          // ✅ add this
    getAccessToken(req?: Request): Promise<unknown>;
    getAccessTokenString(req?: Request): Promise<string | undefined>;
    [k: string]: unknown;
  };

