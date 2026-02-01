import type { Portfolio } from "@/lib/imports/types"; // adjust path


// Determine backend base URL:
// 1) Use NEXT_PUBLIC_API_BASE_URL if provided (explicit override)
// 2) If running in browser and page is served from NEXT dev (port 3000), assume backend at http://localhost:8000
// 3) Otherwise use window.location.origin (same-origin) or fallback to localhost:8000
const BASE = typeof window !== "undefined" ? "/api/aaa" : (process.env.AAA_API_BASE_URL || "http://localhost:8000");

function isObservePath(path: string) {
  // handles "/scenario/observe", "/scenario/observe/ticks", etc.
  return path.includes("/observe");
}

const LOGOUT_REDIRECT =
  typeof window !== "undefined"
    ? `/auth/logout?returnTo=${encodeURIComponent(window.location.origin + "/")}`
    : "/auth/logout";

function handleForbidden(res: Response) {
  if (res.status === 403 && typeof window !== "undefined") {
    window.location.assign(LOGOUT_REDIRECT);
  }
}

function fixtureFor(path: string) {
  console.log("observeAllowsMethod", { path });
  // map API paths → fixture files
  if (path === "/scenario/observe") return "/fixtures/observe/scenario.json";
  if (path === "/scenario/observe/tick") return "/fixtures/observe/tick.json";
  if (path === "/scenario/observe/ticks") return "/fixtures/observe/ticks.json";
  if (path === "/scenario/observe/time") return "/fixtures/observe/time.json";
  if (path === "/scenario/observe/sim/run") return "/fixtures/observe/sim_run.json";
  if (path === "/scenario/observe/sim/state") return "/fixtures/observe/sim_state.json";
  if (path === "/scenario/observe/allocator_version") return "/fixtures/observe/allocator_version.json";
  if (path === "/scenario/observe/tick/tick1/explain") return "/fixtures/observe/explain.json";

  // if you need more later, add them here.
  return null;
}

function observeAllowsMethod(path: string, method: string) {
  if (method === "GET") return true;

  // allow POST only for "simulation demo" endpoints that you want to act read-only
  if (method === "POST" && (path === "/scenario/observe/sim/run" || path === "/scenario/observe/tick/tick1/explain" || path === "/scenario/observe/tick")) {
    return true;
  }
  if (method === "PUT" && (path === "/scenario/observe/allocator_version")) {
    return true;
  }

  return false;
}

async function req(path: string, opts: RequestInit = {}) {
  const method = (opts.method || "GET").toUpperCase();

  if (path.startsWith("/scenario/observe")) {
    if (!observeAllowsMethod(path, method)) {
      throw new Error("Observer mode is read-only");
    }
    const fixture = fixtureFor(path);
    if (!fixture) throw new Error(`No fixture mapped for observer path: ${method} ${path}`);
    return loadFixture(fixture);
  }

  const url = `${BASE}${path}`;

  const res = await fetch(url, {
    ...opts,
    credentials: "include", // ✅ REQUIRED so Auth0 session cookies are sent
    headers: {
      "Content-Type": "application/json",
      ...(opts.headers || {}), // ✅ preserve caller headers
    },
  });

  handleForbidden(res);

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`${res.status} ${res.statusText}: ${text}`);
  }

  // Handle empty responses safely (optional but nice)
  const ct = res.headers.get("content-type") || "";
  if (!ct.includes("application/json")) return res.text();
  return res.json();
}


async function loadFixture(path: string) {
  const r = await fetch(path, { cache: "no-store" });
  if (!r.ok) throw new Error(`Fixture load failed: ${path}`);
  return r.json();
}


export type ScenarioSummary = {
  id: string;
  name: string | null;
  label: string;
  mode: string;
  active_portfolio_id: string | null;
  active_policy_id: string | null;
  updatedAt: string | null;
};

export type ScenarioDetail = ScenarioSummary & {
  state_json: Record<string, unknown>;
};

export async function listScenarios(): Promise<ScenarioSummary[]> {
  return req("/scenarios", { method: "GET" });
}

export async function createScenario(body: { name?: string | null; mode?: "protocol" | "simulation" } = {}): Promise<ScenarioSummary> {
  return req("/scenarios", { method: "POST", body: JSON.stringify(body) });
}

export async function getScenario(id: string): Promise<ScenarioDetail> {
  return req(`/scenarios/${encodeURIComponent(id)}`, { method: "GET" });
}

export async function setScenarioActive(id: string, body: { active_portfolio_id?: string | null; active_policy_id?: string | null }): Promise<ScenarioSummary> {
  return req(`/scenarios/${encodeURIComponent(id)}/active`, { method: "PUT", body: JSON.stringify(body) });
}

export async function createScenarioSession(body: Record<string, unknown> = {}): Promise<{ scenario_id: string }> {
  // legacy session endpoint for full scenario state creation
  return req("/scenario", { method: "POST", body: JSON.stringify(body) });
}

export async function getActiveScenario(): Promise<unknown> {
  return req("/scenario/active");
}

export async function getPolicyTemplates(): Promise<unknown> {
  return req("/policies");
}

export async function getPolicyTemplate(policy_id: string): Promise<unknown> {
  return req(`/policies/${encodeURIComponent(policy_id)}`);
}

export async function upsertPolicyTemplate(body: { id?: string; name: string; policy: Record<string, unknown> }): Promise<unknown> {
  return req("/policies", { method: "POST", body: JSON.stringify(body) });
}

export type SavedPolicyRow = { id: string; name: string; updatedAt: string };

export async function listPolicies(): Promise<{ items: SavedPolicyRow[] }> {
  return req("/policies", { method: "GET" });
}

export async function getPolicy(id: string): Promise<{ id: string; name: string; updatedAt: string; policy: Record<string, unknown> }> {
  return req(`/policies/${encodeURIComponent(id)}`, { method: "GET" });
}

export async function upsertPolicy(body: { id?: string; name: string; policy: Record<string, unknown> }): Promise<{ id: string; name: string; updatedAt: string; policy: Record<string, unknown> }> {
  return req("/policies", { method: "POST", body: JSON.stringify(body) });
}

export async function getScenarioSession(scenario_id: string): Promise<unknown> {
  return req(`/scenario/${encodeURIComponent(scenario_id)}`);
}

export async function putPortfolio(scenario_id: string, portfolio: unknown): Promise<unknown> {
  return req(`/scenario/${encodeURIComponent(scenario_id)}/portfolio`, {
    method: "PUT",
    body: JSON.stringify(portfolio),
  });
}

export async function putConstraints(scenario_id: string, constraints: unknown): Promise<unknown> {
  return req(`/scenario/${encodeURIComponent(scenario_id)}/constraints`, {
    method: "PUT",
    body: JSON.stringify(constraints),
  });
}

export async function putAllocatorVersion(scenario_id: string, allocator_version: string): Promise<unknown> {
  
  return req(`/scenario/${encodeURIComponent(scenario_id)}/allocator_version`, {
    method: "PUT",
    body: JSON.stringify({ allocator_version }),
  });
}

export async function putInflow(scenario_id: string, inflow: { capital_inflow_amount: number }): Promise<unknown> {
  return req(`/scenario/${encodeURIComponent(scenario_id)}/inflow`, {
    method: "PUT",
    body: JSON.stringify(inflow),
  });
}

export async function runTick(scenario_id: string, body: Record<string, unknown> = {}): Promise<unknown> {
  return req(`/scenario/${encodeURIComponent(scenario_id)}/tick`, { method: "POST", body: JSON.stringify(body) });
}

export async function explainTick(scenario_id: string, tick_id: string): Promise<unknown> {
  return req(
    `/scenario/${encodeURIComponent(scenario_id)}/tick/${encodeURIComponent(tick_id)}/explain`,
    { method: "POST" }
  );
}

export async function getTicks(scenario_id: string): Promise<unknown> {
  const res = (await req(`/scenario/${encodeURIComponent(scenario_id)}/ticks`)) as unknown;
  if (res && typeof res === "object" && "ticks" in (res as Record<string, unknown>)) {
    const ticks = (res as Record<string, unknown>)["ticks"];
    return Array.isArray(ticks) ? ticks : [];
  }
  return res;
}

export type DecisionRunRow = {
  id: string;
  scenarioId: string | null;
  allocatorVersion: string;
  decisionType: string;
  createdAt: string;
};

export type DecisionRun = DecisionRunRow & {
  portfolioFingerprint?: string | null;
  policyFingerprint?: string | null;
  result: unknown;
};

export async function listDecisionRuns(opts: { scenarioId: string; limit?: number; offset?: number }): Promise<{ items: DecisionRunRow[] }> {
  const qs = new URLSearchParams();
  qs.set("scenario_id", opts.scenarioId);
  if (typeof opts?.limit === "number") qs.set("limit", String(opts.limit));
  if (typeof opts?.offset === "number") qs.set("offset", String(opts.offset));
  const suffix = qs.toString();
  const path = suffix ? `/decision-runs?${suffix}` : "/decision-runs";
  return req(path, { method: "GET" });
}

export async function listScenarioDecisionRuns(scenarioId: string, opts?: { limit?: number; offset?: number }): Promise<{ items: DecisionRunRow[] }> {
  const qs = new URLSearchParams();
  if (typeof opts?.limit === "number") qs.set("limit", String(opts.limit));
  if (typeof opts?.offset === "number") qs.set("offset", String(opts.offset));
  const suffix = qs.toString();
  const path = suffix
    ? `/scenarios/${encodeURIComponent(scenarioId)}/decision-runs?${suffix}`
    : `/scenarios/${encodeURIComponent(scenarioId)}/decision-runs`;
  return req(path, { method: "GET" });
}

export async function getDecisionRun(id: string): Promise<DecisionRun> {
  return req(`/decision-runs/${encodeURIComponent(id)}`, { method: "GET" });
}

export async function createDecisionRun(body: {
  scenarioId: string;
  allocatorVersion: string;
  decisionType?: string;
  portfolio?: unknown;
  policy?: unknown;
  result: unknown;
  portfolioFingerprint?: string;
  policyFingerprint?: string;
}): Promise<{ id: string; createdAt: string }> {
  return req("/decision-runs", { method: "POST", body: JSON.stringify(body) });
}

export async function previewPortfolioImport(connector_id: string, payload: unknown): Promise<unknown> {
  const res = await fetch("/api/portfolio/import/preview", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ connector_id, payload }),
  });
  handleForbidden(res);

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`${res.status} ${res.statusText}: ${text}`);
  }
  return res.json();
}

export async function postPerformance(scenario_id: string, perf: unknown): Promise<unknown> {
  return req(`/scenario/${encodeURIComponent(scenario_id)}/performance`, {
    method: "POST",
    body: JSON.stringify(perf),
  });
}

// NEW: regime endpoints
export async function putRiskPosture(scenarioId: string, risk_posture: "conservative" | "neutral" | "aggressive") {
  const url = `${BASE}/scenario/${encodeURIComponent(scenarioId)}/risk_posture`;
  const res = await fetch(url, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ risk_posture }),
  });
  handleForbidden(res);

  if (!res.ok) {
    const txt = await res.text();
    throw new Error(`${res.status} ${res.statusText}: ${txt}`);
  }
  return res.json();
}

export async function putSectorSentiment(scenarioId: string, sector_sentiment: Record<string, number> | string) {
  const url = `${BASE}/scenario/${encodeURIComponent(scenarioId)}/sector_sentiment`;
  const body = typeof sector_sentiment === "string" ? sector_sentiment : JSON.stringify(sector_sentiment);
  const res = await fetch(url, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: typeof sector_sentiment === "string" ? sector_sentiment : JSON.stringify({ sector_sentiment }),
  });
  handleForbidden(res);

  if (!res.ok) {
    const txt = await res.text();
    throw new Error(`${res.status} ${res.statusText}: ${txt}`);
  }
  return res.json();
}

export async function putRegime(scenarioId: string, regime: Record<string, unknown>) {
  const url = `${BASE}/scenario/${encodeURIComponent(scenarioId)}/regime`;
  const res = await fetch(url, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(regime),
  });
  handleForbidden(res);

  if (!res.ok) {
    const txt = await res.text();
    throw new Error(`${res.status} ${res.statusText}: ${txt}`);
  }
  return res.json();
}

// NEW: simulation state fetch
export async function getSimState(scenarioId: string) {
  const url = `${BASE}/scenario/${encodeURIComponent(scenarioId)}/sim/state`;
  const res = await fetch(url);
  handleForbidden(res);

  if (!res.ok) {
    const txt = await res.text();
    throw new Error(`${res.status} ${res.statusText}: ${txt}`);
  }
  return res.json();
}

export async function getScenarioTime(scenarioId: string) {
  return req(`/scenario/${encodeURIComponent(scenarioId)}/time`, {
    method: "GET",
  });
}

export async function advanceScenarioTime(scenarioId: string, delta: { days?: number; hours?: number; minutes?: number }) {
  const url = `${BASE}/scenario/${encodeURIComponent(scenarioId)}/time/advance`;
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(delta),
  });
  handleForbidden(res);

  if (!res.ok) {
    const txt = await res.text();
    throw new Error(`${res.status} ${res.statusText}: ${txt}`);
  }
  return res.json();
}

export async function setScenarioTime(scenarioId: string, sim_now: string) {
  const url = `${BASE}/scenario/${encodeURIComponent(scenarioId)}/time/set`;
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ sim_now }),
  });
  handleForbidden(res);

  if (!res.ok) {
    const txt = await res.text();
    throw new Error(`${res.status} ${res.statusText}: ${txt}`);
  }
  return res.json();
}

// NEW: simulation control helpers using explicit BASE so browser sends to backend origin
export async function simReset(scenarioId: string, body: Record<string, unknown> = {}) {
  const url = `${BASE}/scenario/${encodeURIComponent(scenarioId)}/sim/reset`;
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  handleForbidden(res);

  if (!res.ok) {
    const txt = await res.text();
    throw new Error(`${res.status} ${res.statusText}: ${txt}`);
  }
  return res.json();
}

export async function simStep(scenarioId: string, body: Record<string, unknown> = {}) {
  const url = `${BASE}/scenario/${encodeURIComponent(scenarioId)}/sim/step`;
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  handleForbidden(res);

  if (!res.ok) {
    const txt = await res.text();
    throw new Error(`${res.status} ${res.statusText}: ${txt}`);
  }
  return res.json();
}

export async function simRun(scenarioId: string, body: Record<string, unknown> = {}) {
  return req(`/scenario/${encodeURIComponent(scenarioId)}/sim/run`, {
    method: "POST",
    body: JSON.stringify(body),
  });
}

export async function getScoreTrace(scenarioId: string, year?: number) {
  const url = `${BASE}/scenario/${encodeURIComponent(scenarioId)}/sim/score_trace${typeof year === "number" ? `?year=${encodeURIComponent(String(year))}` : ""}`;
  const res = await fetch(url, { method: "GET" });
  handleForbidden(res);

  if (!res.ok) {
    const txt = await res.text();
    throw new Error(`${res.status} ${res.statusText}: ${txt}`);
  }
  return res.json();
}

export async function postStripe(plan_key: string) {
  return req(`/billing/checkout`, {
    method: "POST",
    body: JSON.stringify({ plan_key }),
  });
}

export type SavedPortfolioRow = { id: string; name: string; updatedAt: string };

export async function listPortfolios(): Promise<SavedPortfolioRow[]> {
  return req(`/portfolios`, { method: "GET" });
}

export async function getPortfolioTemplate(id: string): Promise<{ id: string; name: string; updatedAt: string; portfolio: Portfolio }> {
  return req(`/portfolios/${encodeURIComponent(id)}`, { method: "GET" });
}

export async function upsertPortfolioTemplate(body: { id?: string; name: string; portfolio: Portfolio }): Promise<{ id: string; name: string; updatedAt: string }> {
  return req(`/portfolios`, { method: "POST", body: JSON.stringify(body) });
}

export async function getPortfolio(id: string): Promise<{ id: string; name: string; updatedAt: string; portfolio: Portfolio }> {
  return getPortfolioTemplate(id);
}

export async function upsertPortfolio(body: { id?: string; name: string; portfolio: Portfolio }): Promise<{ id: string; name: string; updatedAt: string }> {
  return upsertPortfolioTemplate(body);
}

export async function deletePortfolioTemplate(id: string): Promise<{ ok: boolean }> {
  return req(`/portfolios/${encodeURIComponent(id)}`, { method: "DELETE" });
}
