// fetchWithCredentials.ts
export async function fetchWithCredentials(input: RequestInfo | URL, init: RequestInit = {}) {
  return fetch(input, {
    ...init,
    // ✅ send Auth0 session cookies to Next.js
    credentials: "include",
    // ✅ avoid caching auth-protected requests in dev
    cache: "no-store",
  });
}
