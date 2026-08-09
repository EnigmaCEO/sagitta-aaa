# Sagitta AAA — Agent Skill Guide

**What this is:** Sagitta AAA (Autonomous Allocation Agent) is a policy-constrained
portfolio allocation and simulation engine. It maintains *scenarios* — a portfolio,
a constraint set, a market regime, and a belief state — and advances them through
ticks or multi-year simulations, producing auditable allocation decisions.

**Frontend:** `https://aaa.sagitta.systems`
**API:** `https://sagitta-aaa-api.fly.dev`
**OpenAPI:** `https://sagitta-aaa-api.fly.dev/openapi.json`
**Interactive docs:** `https://sagitta-aaa-api.fly.dev/docs`

> This document describes Sagitta AAA only. Sagitta's separate Selun agent is a
> different product with a different API, payment model, and agent identity.
> Do not apply Selun's x402 endpoints or pay-per-call semantics to AAA.

---

## Authentication

AAA uses **OAuth 2.0 bearer tokens issued by Auth0**. There is no pay-per-call
or on-chain payment model.

```
Authorization: Bearer <auth0-access-token>
```

The token must be issued for the AAA API audience (the API's Auth0 API
Identifier). Tokens minted for a different audience are rejected.

### Scopes

| Scope       | Grants                                                        |
| ----------- | ------------------------------------------------------------- |
| `aaa:read`  | Read scenarios, ticks, beliefs, simulation state, allocators   |
| `aaa:write` | Mutate scenarios: portfolio, constraints, inflow, regime, time |

Additionally, most account-scoped routes resolve an **authority level** from the
caller's plan. Level 0 (observer) is read-only; mutating routes require level 1
or higher and return `403` otherwise.

### Response codes

| Code  | Meaning                                                     |
| ----- | ----------------------------------------------------------- |
| `401` | Missing or invalid bearer token                              |
| `403` | Authenticated, but missing the required scope or authority   |
| `404` | Unknown scenario — or a route not exposed in this environment |

---

## Read-only capabilities

These require `aaa:read` and never mutate state. Prefer these when exploring.

### Scenarios

* `GET /scenarios` — list scenarios for the account
* `GET /scenarios/{scenario_id}` — scenario summary record
* `GET /scenario/active` — the account's currently active scenario
* `GET /scenario/{scenario_id}` — full scenario: portfolio, constraints,
  `protocol_state`, `simulation_state`, `last_tick`

### Decision history

* `GET /scenario/{scenario_id}/ticks` — tick history
* `GET /scenarios/{scenario_id}/decision-runs` — decision runs for a scenario
* `GET /decision-runs` / `GET /decision-runs/{run_id}` — decision run records

### Simulation

* `GET /scenario/{scenario_id}/sim/state` — current simulation state
  → `{ "sim_state": { … }, "needs_reset": bool }`
* `GET /scenario/{scenario_id}/sim/score_trace` — per-asset scoring trace

### Time & beliefs

* `GET /scenario/{scenario_id}/time` — `sim_now` and the decision window
* `GET /scenario/{scenario_id}/beliefs` — current belief state

### Reference data

* `GET /allocators` — supported allocator versions (`v1`…`v6`)
* `GET /portfolios`, `GET /portfolios/{portfolio_id}`
* `GET /policies`, `GET /policies/{policy_id}`
* `GET /me` — the caller's identity, plan, and authority level

---

## Mutating capabilities

All require `aaa:write` **and** authority level ≥ 1. Each changes durable
scenario state — call them only with explicit user intent.

* `POST /scenario` — create a scenario
* `POST /scenario/{id}/tick` — advance one decision tick
* `PUT /scenario/{id}/portfolio` — replace the portfolio
* `PUT /scenario/{id}/constraints` — replace the constraint set
* `PUT /scenario/{id}/inflow` — set capital inflow
* `PUT /scenario/{id}/regime`, `PUT /scenario/{id}/market_regime` — set regime
* `PUT /scenario/{id}/mission` — set mission parameters
* `PUT /scenario/{id}/allocator_version` — select the allocator
* `POST /scenario/{id}/time/advance`, `POST /scenario/{id}/time/set`
* `POST /scenario/{id}/sim/reset`, `/sim/step`, `/sim/run` — simulation control
* `POST /scenario/{id}/tick/{tick_id}/explain` — generate a tick explanation

---

## Recommended call order

Read the world before changing it:

```
GET /me → GET /scenario/active → GET /scenario/{id} → GET /scenario/{id}/ticks
```

Run a simulation:

```
POST /scenario/{id}/sim/reset → POST /scenario/{id}/sim/run → GET /scenario/{id}/sim/state
```

Advance a live scenario one decision step:

```
GET /scenario/{id} → POST /scenario/{id}/tick → GET /scenario/{id}/sim/score_trace
```

---

## Safe usage boundaries

Agents integrating with AAA should observe these limits:

1. **Read before write.** Fetch the scenario and confirm `scenario_id`, `mode`,
   and `authority_level` before issuing any mutation.
2. **Simulation ≠ execution.** `/sim/*` routes model outcomes. They do not move
   capital. AAA does not execute trades or custody assets.
3. **Do not call billing routes programmatically.** `/billing/checkout`,
   `/billing/portal`, and `/billing/webhook` are for the web UI and Stripe
   only. `/billing/webhook` verifies a Stripe signature and will reject you.
4. **Treat `403` as final.** Do not retry with a different scenario id or
   escalate; the caller's plan does not permit the operation.
5. **One tick at a time.** Ticks are ordered and stateful. Do not issue
   concurrent `POST /scenario/{id}/tick` calls for the same scenario.
6. **Debug routes are not an API.** Any `/debug/*` path is environment-gated,
   unversioned, and returns `404` in production. Never depend on one.

---

## Advisory scope

AAA produces allocation analysis under a stated policy and constraint set. Its
output is decision support, not investment advice, and not an instruction to
transact. Callers remain responsible for suitability and execution.

---

## Discovery

* OpenAPI contract: `https://sagitta-aaa-api.fly.dev/openapi.json`
* The contract above is authoritative. Where this guide and the OpenAPI
  document disagree, follow the OpenAPI document.
