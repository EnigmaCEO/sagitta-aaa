/**
 * Regression tests for four GET-observable production defects.
 *
 * 1. /auth/logs returned 404: app/auth/logs/ was matched by a machine-level
 *    core.excludesFile rule (`Logs/`) and never committed, so it never shipped.
 * 2. /fixtures/observe/sim_state.json returned 404: lib/api.ts mapped an
 *    Observer path to a fixture that did not exist.
 * 3. /api/debug/token returned 500 anonymously and could disclose token data.
 * 4. /SKILL.md served Selun's x402 documentation instead of AAA's.
 */

import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { test } from "node:test";

// tsx transpiles this suite to CJS, where import.meta.dirname is undefined.
const HERE =
  typeof __dirname !== "undefined" ? __dirname : path.dirname(new URL(".", import.meta.url).pathname);
const ROOT = path.resolve(HERE, "..");
const PUBLIC = path.join(ROOT, "public");

function read(rel: string): string {
  return fs.readFileSync(path.join(ROOT, rel), "utf8");
}

// ---------------------------------------------------------------------------
// 1. /auth/logs must exist AND be committable
// ---------------------------------------------------------------------------

test("/auth/logs route source exists", () => {
  assert.ok(
    fs.existsSync(path.join(ROOT, "app/auth/logs/page.tsx")),
    "app/auth/logs/page.tsx is missing",
  );
});

test("/auth/logs redirects to a canonical logs page that exists", () => {
  const src = read("app/auth/logs/page.tsx");
  const target = src.match(/redirect\(\s*["'`]([^"'`]+)["'`]\s*\)/)?.[1];
  assert.ok(target, "expected app/auth/logs/page.tsx to redirect to a canonical path");

  const candidates = [
    `app${target}/page.tsx`,
    `app${target}/route.ts`,
    `app${target}/page.jsx`,
  ];
  assert.ok(
    candidates.some((c) => fs.existsSync(path.join(ROOT, c))),
    `redirect target ${target} has no corresponding route file`,
  );
});

test("no app route file is excluded by gitignore", () => {
  // The original defect: the route existed on disk, worked in dev, and was
  // silently absent from every deploy because git ignored it.
  const routes = execFileSync(
    "git",
    ["ls-files", "--others", "--ignored", "--exclude-standard", "--directory", "app/"],
    { cwd: ROOT, encoding: "utf8" },
  )
    .split("\n")
    .map((s) => s.trim())
    .filter(Boolean);

  assert.deepEqual(
    routes,
    [],
    `these app/ paths are git-ignored and will never deploy: ${routes.join(", ")}`,
  );
});

// ---------------------------------------------------------------------------
// 2. Observer fixtures
// ---------------------------------------------------------------------------

/** Every "/fixtures/..." string literal referenced anywhere in lib/ or app/. */
function referencedFixtures(): string[] {
  const found = new Set<string>();
  const walk = (dir: string) => {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        if (entry.name === "node_modules" || entry.name === ".next") continue;
        walk(full);
      } else if (/\.(ts|tsx|js|jsx)$/.test(entry.name)) {
        const src = fs.readFileSync(full, "utf8");
        for (const m of src.matchAll(/["'`](\/fixtures\/[^"'`]+\.json)["'`]/g)) {
          found.add(m[1]);
        }
      }
    }
  };
  walk(path.join(ROOT, "lib"));
  walk(path.join(ROOT, "app"));
  return [...found].sort();
}

test("every fixture referenced in source exists on disk", () => {
  const refs = referencedFixtures();
  assert.ok(refs.length > 0, "expected source to reference at least one fixture");

  const missing = refs.filter((r) => !fs.existsSync(path.join(PUBLIC, r)));
  assert.deepEqual(missing, [], `referenced but missing: ${missing.join(", ")}`);
});

test("every referenced fixture parses as JSON", () => {
  for (const ref of referencedFixtures()) {
    const raw = fs.readFileSync(path.join(PUBLIC, ref), "utf8");
    assert.doesNotThrow(() => JSON.parse(raw), `${ref} is not valid JSON`);
  }
});

test("every file in public/fixtures/observe parses as JSON", () => {
  const dir = path.join(PUBLIC, "fixtures/observe");
  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".json"));
  assert.ok(files.length > 0);
  for (const f of files) {
    assert.doesNotThrow(
      () => JSON.parse(fs.readFileSync(path.join(dir, f), "utf8")),
      `${f} is not valid JSON`,
    );
  }
});

test("sim_state.json matches the API's sim/state envelope and is not a placeholder", () => {
  const doc = JSON.parse(
    fs.readFileSync(path.join(PUBLIC, "fixtures/observe/sim_state.json"), "utf8"),
  );

  // Backend contract: GET /scenario/{id}/sim/state -> { sim_state, needs_reset }
  assert.ok("sim_state" in doc, "missing sim_state envelope key");
  assert.equal(typeof doc.needs_reset, "boolean");

  const s = doc.sim_state;
  for (const key of [
    "initial_cash",
    "current_year",
    "max_years",
    "baseline_weights",
    "baseline_value",
    "aaa_value",
    "timeline",
    "summary",
  ]) {
    assert.ok(key in s, `sim_state missing ${key}`);
  }

  // Not an empty placeholder.
  assert.ok(Array.isArray(s.timeline) && s.timeline.length > 0, "timeline is empty");
  assert.ok(Object.keys(s.baseline_weights).length > 0, "baseline_weights is empty");
  assert.ok(Object.keys(s.summary).length > 0, "summary is empty");

  // Weights normalised.
  const total = Object.values(s.baseline_weights as Record<string, number>).reduce(
    (a, b) => a + b,
    0,
  );
  assert.ok(Math.abs(total - 1) < 1e-6, `baseline_weights sum to ${total}, expected 1`);

  // Timeline internally consistent.
  for (const y of s.timeline) {
    assert.equal(typeof y.year_index, "number");
    const delta = y.aaa_end_value - y.baseline_end_value;
    assert.ok(
      Math.abs(delta - y.aaa_vs_baseline_delta_usd) < 0.02,
      `year ${y.year_index}: delta_usd does not match end values`,
    );
  }
});

test("sim_state fixture is consistent with the observe scenario portfolio", () => {
  const scenario = JSON.parse(
    fs.readFileSync(path.join(PUBLIC, "fixtures/observe/scenario.json"), "utf8"),
  );
  const sim = JSON.parse(
    fs.readFileSync(path.join(PUBLIC, "fixtures/observe/sim_state.json"), "utf8"),
  ).sim_state;

  const portfolioIds = (scenario.portfolio.assets as Array<{ id: string }>)
    .map((a) => a.id)
    .sort();
  assert.deepEqual(Object.keys(sim.baseline_weights).sort(), portfolioIds);
});

// ---------------------------------------------------------------------------
// 3. /api/debug/token
// ---------------------------------------------------------------------------

test("/api/debug/token is gated and leaks no token material", () => {
  const src = read("app/api/debug/token/route.ts");

  assert.match(src, /NODE_ENV\s*===\s*["']production["']/, "route is not production-gated");
  assert.match(src, /status:\s*404/, "route has no 404 path");
  assert.match(src, /status:\s*401/, "route has no 401 path for anonymous callers");

  // The raw-token escape hatch must be gone.
  assert.ok(!src.includes("DEBUG_FULL_TOKEN"), "DEBUG_FULL_TOKEN escape hatch still present");
  assert.ok(!/\bfullToken\b/.test(src), "route can still emit a full token");
  assert.ok(!/maskedToken/.test(src), "route can still emit token material");

  // Errors must not be stringified back to the caller.
  assert.ok(!/String\(e\)/.test(src), "route echoes raw error text to the caller");
});

// ---------------------------------------------------------------------------
// 4. /SKILL.md
// ---------------------------------------------------------------------------

test("/SKILL.md documents AAA, not Selun", () => {
  const skill = fs.readFileSync(path.join(PUBLIC, "SKILL.md"), "utf8");

  assert.match(skill, /Sagitta AAA/, "SKILL.md does not identify AAA");
  assert.match(skill, /aaa\.sagitta\.systems/, "missing the AAA frontend origin");
  assert.match(skill, /sagitta-aaa-api\.fly\.dev/, "missing the AAA API origin");
  assert.match(skill, /aaa:read/, "missing the AAA scope model");
  assert.match(skill, /aaa:write/, "missing the AAA scope model");
  assert.match(skill, /openapi\.json/, "missing an OpenAPI reference");

  // Selun's payment/agent model must not have been carried over.
  for (const leak of ["x402", "PAYMENT-REQUIRED", "PAYMENT-SIGNATURE", "USDC", "facilitator"]) {
    assert.ok(
      !new RegExp(leak, "i").test(skill.replace(/^>.*$/gm, "")),
      `SKILL.md still describes Selun's ${leak}`,
    );
  }
  assert.ok(!/selun\.sagitta\.systems/.test(skill), "SKILL.md still points at Selun's origin");
});

test("SKILL.md only documents routes the API actually defines", () => {
  const skill = fs.readFileSync(path.join(PUBLIC, "SKILL.md"), "utf8");
  const mainPy = path.resolve(
    ROOT,
    "../sagitta-aaa-api/src/sagitta_aaa/app/main.py",
  );
  if (!fs.existsSync(mainPy)) return; // backend not checked out alongside

  const defined = new Set(
    [...fs.readFileSync(mainPy, "utf8").matchAll(/^@app\.\w+\(\s*["']([^"']+)["']/gm)].map(
      (m) => m[1],
    ),
  );

  // Normalise {scenario_id} / {id} placeholders to a common token.
  const norm = (p: string) => p.replace(/\{[^}]+\}/g, "{}").replace(/\/+$/, "");
  const definedNorm = new Set([...defined].map(norm));

  const documented = [...skill.matchAll(/`(?:GET|POST|PUT|PATCH|DELETE)\s+(\/[^`\s]+)`/g)].map(
    (m) => norm(m[1]),
  );
  assert.ok(documented.length > 0, "SKILL.md documents no routes");

  const bogus = documented.filter((p) => !definedNorm.has(p));
  assert.deepEqual(bogus, [], `SKILL.md documents routes the API does not define: ${bogus}`);
});
