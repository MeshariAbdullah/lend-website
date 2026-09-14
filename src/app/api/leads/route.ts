import { NextResponse } from "next/server";
import { isLocale, siteUrl } from "@/lib/i18n";
import { sanitizeText, validateLead } from "@/lib/leads";
import { sendLeadEmail } from "@/lib/leads-email";

export const runtime = "nodejs";

/**
 * POST /api/leads — business-interest form submissions.
 *
 * Responses (always JSON):
 *   200 { ok: true }
 *   400 { ok: false, error: "invalid", fields: { field: code } }
 *   429 { ok: false, error: "rate_limited" }
 *   503 { ok: false, error: "not_configured" | "provider_error" }
 */

const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

/**
 * Best-effort per-IP limiter. State is per server instance, which is enough to
 * blunt casual abuse. Set LEADS_RATE_LIMIT=off (test runs only) to disable it.
 */
function rateLimited(ip: string): boolean {
  if (process.env.LEADS_RATE_LIMIT === "off") return false;
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > MAX_PER_WINDOW;
}

function clientIp(req: Request): string {
  return req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || req.headers.get("x-real-ip") || "unknown";
}

function safeSourceUrl(candidate: unknown, req: Request): string {
  const raw = typeof candidate === "string" ? candidate : (req.headers.get("referer") ?? "");
  try {
    const url = new URL(raw);
    const site = new URL(siteUrl);
    const strip = (h: string) => h.replace(/^www\./, "");
    const allowed = strip(url.hostname) === strip(site.hostname) || url.hostname === "localhost" || url.hostname.endsWith(".vercel.app");
    return allowed ? url.href.slice(0, 500) : "";
  } catch {
    return "";
  }
}

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = (await req.json()) as Record<string, unknown>;
    if (!body || typeof body !== "object") throw new Error("bad body");
  } catch {
    return NextResponse.json({ ok: false, error: "invalid", fields: {} }, { status: 400 });
  }

  // Honeypot: real users never see this field. Bots that fill it are dropped quietly.
  if (sanitizeText(body.website)) {
    return NextResponse.json({ ok: true }, { status: 200 });
  }

  if (rateLimited(clientIp(req))) {
    return NextResponse.json({ ok: false, error: "rate_limited" }, { status: 429 });
  }

  const result = validateLead(body);
  if (!result.lead) {
    return NextResponse.json({ ok: false, error: "invalid", fields: result.errors }, { status: 400 });
  }

  const localeRaw = typeof body.locale === "string" ? body.locale : "ar";
  const locale = isLocale(localeRaw) ? localeRaw : "ar";

  const sent = await sendLeadEmail({
    lead: result.lead,
    locale,
    submittedAt: new Date(),
    sourceUrl: safeSourceUrl(body.sourceUrl, req),
  });

  if (!sent.ok) {
    if (sent.reason === "not_configured") {
      console.error("[leads] Email provider is not configured (RESEND_API_KEY / LEADS_FROM_EMAIL).");
    }
    return NextResponse.json({ ok: false, error: sent.reason }, { status: 503 });
  }
  return NextResponse.json({ ok: true }, { status: 200 });
}
