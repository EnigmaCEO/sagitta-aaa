type DecisionRecordEntry = {
  html: string;
  createdAt: number;
};

const CACHE_TTL_MS = 10 * 60 * 1000; // 10 minutes
const CACHE_LIMIT = 64;

const cacheRef = (() => {
  const g = globalThis as unknown as {
    __sagittaDecisionRecordCache__?: Map<string, DecisionRecordEntry>;
  };
  if (!g.__sagittaDecisionRecordCache__) {
    g.__sagittaDecisionRecordCache__ = new Map<string, DecisionRecordEntry>();
  }
  return g.__sagittaDecisionRecordCache__;
})();

function purgeExpired(now: number) {
  for (const [key, value] of cacheRef.entries()) {
    if (now - value.createdAt > CACHE_TTL_MS) {
      cacheRef.delete(key);
    }
  }
}

function enforceLimit() {
  while (cacheRef.size > CACHE_LIMIT) {
    const firstKey = cacheRef.keys().next().value as string | undefined;
    if (!firstKey) break;
    cacheRef.delete(firstKey);
  }
}

export function putDecisionRecordHtml(token: string, html: string) {
  const now = Date.now();
  purgeExpired(now);
  cacheRef.set(token, { html, createdAt: now });
  enforceLimit();
}

export function getDecisionRecordHtml(token: string): string | null {
  const now = Date.now();
  purgeExpired(now);
  const entry = cacheRef.get(token);
  if (!entry) return null;
  if (now - entry.createdAt > CACHE_TTL_MS) {
    cacheRef.delete(token);
    return null;
  }
  return entry.html;
}

