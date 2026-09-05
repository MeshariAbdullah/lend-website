import "server-only";
import type { Locale } from "@/lib/i18n";
import { businessTypes, type Lead } from "@/lib/leads";

/**
 * Sends a business-interest lead to the partnerships inbox through Resend's
 * HTTP API. Configuration comes from the environment only:
 *   RESEND_API_KEY   — Resend API key (secret)
 *   LEADS_FROM_EMAIL — verified sender, e.g. "Lend <no-reply@lend.sa>"
 *   LEADS_TO_EMAIL   — receiving inbox (defaults to partner@lend.sa)
 */

export type LeadEmailPayload = {
  lead: Lead;
  locale: Locale;
  submittedAt: Date;
  sourceUrl: string;
};

export type SendResult = { ok: true; id: string | null } | { ok: false; reason: "not_configured" | "provider_error" };

const DEFAULT_TO = "partner@lend.sa";

export function getLeadEmailConfig() {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  const from = process.env.LEADS_FROM_EMAIL?.trim();
  const to = process.env.LEADS_TO_EMAIL?.trim() || DEFAULT_TO;
  if (!apiKey || !from) return null;
  return { apiKey, from, to };
}

const typeLabels: Record<(typeof businessTypes)[number], string> = {
  dresses: "فساتين / Dresses",
  bags: "حقائب / Bags",
  watches: "ساعات / Watches",
  formalwear: "بشوت وأزياء رسمية / Formal wear",
  equipment: "معدات / Equipment",
  other: "أخرى / Other",
};

function escapeHtml(value: string): string {
  return value.replace(
    /[&<>"']/g,
    (ch) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[ch] as string,
  );
}

function riyadhTime(date: Date): string {
  return new Intl.DateTimeFormat("en-GB", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "Asia/Riyadh",
  }).format(date);
}

export function buildLeadEmail({ lead, locale, submittedAt, sourceUrl }: LeadEmailPayload) {
  const rows: [string, string][] = [
    ["Locale", locale === "ar" ? "Arabic (ar)" : "English (en)"],
    ["Business name", lead.business],
    ["Contact person", lead.contact],
    ["Mobile number", lead.mobile],
    ["Email address", lead.email],
    ["Business type", typeLabels[lead.type]],
    ["Message", lead.message || "—"],
    ["Submitted at", `${riyadhTime(submittedAt)} (Riyadh) · ${submittedAt.toISOString()}`],
    ["Source URL", sourceUrl || "—"],
  ];

  const subject = `Business interest: ${lead.business} (${typeLabels[lead.type].split(" / ")[1]})`;
  const text = rows.map(([k, v]) => `${k}: ${v}`).join("\n");
  const html = `<!doctype html><html><body style="margin:0;background:#F5F5F0;font-family:Inter,Arial,sans-serif;color:#1B2951">
<div style="max-width:640px;margin:0 auto;padding:32px 20px">
  <p style="font-size:12px;letter-spacing:.2em;color:#0F6E56;font-weight:600;margin:0 0 8px">LEND — BUSINESS INTEREST</p>
  <h1 style="font-size:20px;margin:0 0 20px">${escapeHtml(lead.business)}</h1>
  <table style="width:100%;border-collapse:collapse;background:#fff;border:1px solid #E7E8E1;border-radius:14px" cellpadding="0" cellspacing="0">
    ${rows
      .map(
        ([k, v]) => `<tr>
      <td style="padding:12px 16px;border-bottom:1px solid #EFEFE9;font-size:12px;color:#5B6683;white-space:nowrap;vertical-align:top">${escapeHtml(k)}</td>
      <td style="padding:12px 16px;border-bottom:1px solid #EFEFE9;font-size:14px;white-space:pre-wrap">${escapeHtml(v)}</td>
    </tr>`,
      )
      .join("")}
  </table>
  <p style="font-size:12px;color:#9AA1B5;margin:16px 0 0">Sent by the lend.sa marketing website.</p>
</div></body></html>`;

  return { subject, text, html };
}

export async function sendLeadEmail(payload: LeadEmailPayload): Promise<SendResult> {
  const config = getLeadEmailConfig();
  if (!config) return { ok: false, reason: "not_configured" };

  const { subject, text, html } = buildLeadEmail(payload);
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${config.apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: config.from,
        to: [config.to],
        reply_to: payload.lead.email,
        subject,
        text,
        html,
      }),
      signal: AbortSignal.timeout(10_000),
    });
    if (!res.ok) {
      console.error("[leads] Resend responded", res.status, await res.text().catch(() => ""));
      return { ok: false, reason: "provider_error" };
    }
    const data = (await res.json().catch(() => null)) as { id?: string } | null;
    return { ok: true, id: data?.id ?? null };
  } catch (error) {
    console.error("[leads] Resend request failed", error);
    return { ok: false, reason: "provider_error" };
  }
}
