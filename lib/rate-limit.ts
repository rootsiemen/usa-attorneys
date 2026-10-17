/**
 * Simple in-memory per-IP rate limiter for API routes.
 * Suitable for a single-instance deployment; for multi-instance,
 * move to a shared store (Redis/Turso).
 */

interface Bucket {
  count: number;
  resetAt: number;
}

const buckets = new Map<string, Bucket>();

// Periodic cleanup so the map doesn't grow forever.
const cleanupTimer = setInterval(() => {
  const now = Date.now();
  buckets.forEach((b, key) => {
    if (b.resetAt <= now) buckets.delete(key);
  });
}, 60_000);
// Don't keep the Node process alive just for this timer.
(cleanupTimer as unknown as { unref?: () => void }).unref?.();

/**
 * Returns true if the request is allowed, false if rate-limited.
 * @param key  unique key (e.g. `claims:<ip>`)
 * @param max  max requests per window
 * @param windowMs  window length in ms
 */
export function checkRateLimit(
  key: string,
  max: number,
  windowMs: number
): { allowed: boolean; retryAfterSec: number } {
  const now = Date.now();
  const b = buckets.get(key);
  if (!b || b.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return { allowed: true, retryAfterSec: 0 };
  }
  if (b.count < max) {
    b.count += 1;
    return { allowed: true, retryAfterSec: 0 };
  }
  return {
    allowed: false,
    retryAfterSec: Math.ceil((b.resetAt - now) / 1000),
  };
}

/** Best-effort client IP from request headers (Vercel / proxies). */
export function getClientIp(req: Request): string {
  const fwd = req.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0].trim();
  const real = req.headers.get("x-real-ip");
  if (real) return real.trim();
  return "unknown";
}
