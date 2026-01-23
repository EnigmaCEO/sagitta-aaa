import { fetchWithCredentials } from "./fetchWithCredentials";

// Normalize a frontend path to the Next proxy path and call fetch with credentials.
// Usage: apiFetch("/scenario", { method: "POST", body: JSON.stringify(payload) })
export async function apiFetch(path: string, init?: RequestInit) {
	// allow passing either "/scenario" or "scenario" or full "/api/aaa/..." paths
	const normalizedPath = path.startsWith("/api/aaa/")
		? path
		: `/api/aaa/${path.replace(/^\/+/, "")}`;
	return fetchWithCredentials(normalizedPath, init);
}

// Convenience helper for your scenario endpoint
export async function postScenario(payload: unknown) {
	return apiFetch("/scenario", {
		method: "POST",
		headers: { "content-type": "application/json" },
		body: JSON.stringify(payload),
	});
}

/*
Minimal migration hint:
- Replace direct calls to the backend like:
    fetch("http://localhost:8000/scenario", { ... })
  or
    fetch("/scenario", { ... })
  with:
    import { apiFetch, postScenario } from "@/lib/apiProxy";
    await postScenario({ ... });
  or:
    await apiFetch("/scenario", { method: "POST", body: JSON.stringify(...) });

- Ensure client-side calls run in browser context so cookies exist and use fetchWithCredentials which sets credentials: "include".
*/
