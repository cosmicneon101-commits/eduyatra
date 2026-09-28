type Bucket = { count: number; resetAt: number };

const buckets = new Map<string, Bucket>();

export function rateLimit(key: string, limit = 8, windowMs = 10 * 60 * 1000) {
  const now = Date.now();
  const current = buckets.get(key);
  if (!current || current.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return { allowed: true, remaining: limit - 1 };
  }
  current.count += 1;
  if (current.count > limit) return { allowed: false, remaining: 0 };
  return { allowed: true, remaining: Math.max(0, limit - current.count) };
}

export function getRequestKey(req: Request, scope: string) {
  const forwarded = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  const real = req.headers.get("x-real-ip")?.trim();
  return `${scope}:${forwarded || real || "unknown"}`;
}

export function hasAllowedOrigin(req: Request) {
  const origin = req.headers.get("origin");
  if (!origin) return true;
  const appUrl = process.env.NEXT_PUBLIC_APP_URL;
  if (!appUrl) return true;
  try {
    return new URL(origin).origin === new URL(appUrl).origin;
  } catch {
    return false;
  }
}
