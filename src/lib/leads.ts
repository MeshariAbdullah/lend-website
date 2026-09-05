/**
 * Business-interest lead: shared validation and normalization.
 * Pure functions only, so the same rules run in the browser and on the server.
 * Never import server-only modules here.
 */

export const businessTypes = ["dresses", "bags", "watches", "formalwear", "equipment", "other"] as const;
export type BusinessType = (typeof businessTypes)[number];

export type LeadInput = {
  business: string;
  contact: string;
  mobile: string;
  email: string;
  type: string;
  message: string;
};

export type LeadField = keyof LeadInput;

export type Lead = {
  business: string;
  contact: string;
  mobile: string; // normalized, e.g. +9665XXXXXXXX
  email: string;
  type: BusinessType;
  message: string;
};

export type LeadErrorCode = "required" | "email" | "mobile" | "type" | "tooLong";
export type LeadErrors = Partial<Record<LeadField, LeadErrorCode>>;

export const limits: Record<LeadField, number> = {
  business: 120,
  contact: 120,
  mobile: 32,
  email: 254,
  type: 32,
  message: 1000,
};

// C0 controls except tab and newline, DEL, and C1 controls.
const CONTROL_CHARS = /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F-\u009F]/g;

/** Trim, drop control characters, collapse runs of whitespace (newlines kept for messages). */
export function sanitizeText(value: unknown, { multiline = false, max = 1000 } = {}): string {
  if (typeof value !== "string") return "";
  let out = value.replace(CONTROL_CHARS, "");
  out = multiline ? out.replace(/[ \t]+/g, " ").replace(/\n{3,}/g, "\n\n") : out.replace(/\s+/g, " ");
  return out.trim().slice(0, max);
}

/** Convert Arabic-Indic and Eastern Arabic-Indic digits to ASCII. */
export function toLatinDigits(value: string): string {
  return value
    .replace(/[٠-٩]/g, (d) => String(d.charCodeAt(0) - 0x0660))
    .replace(/[۰-۹]/g, (d) => String(d.charCodeAt(0) - 0x06f0));
}

/**
 * Accepts common Saudi mobile formats and returns E.164 (+9665XXXXXXXX), or null.
 * Accepted: 05X XXX XXXX · 5XXXXXXXX · +966 5X… · 00966 5X… · 966 5X…, with spaces, dashes or parentheses.
 */
export function normalizeSaudiMobile(value: string): string | null {
  let digits = toLatinDigits(value).replace(/[\s\-().]/g, "");
  if (digits.startsWith("+")) digits = digits.slice(1);
  if (!/^\d+$/.test(digits)) return null;
  if (digits.startsWith("00966")) digits = digits.slice(2);
  if (digits.startsWith("966")) digits = digits.slice(3);
  if (digits.startsWith("0")) digits = digits.slice(1);
  return /^5\d{8}$/.test(digits) ? `+966${digits}` : null;
}

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function isValidEmail(value: string): boolean {
  return value.length <= limits.email && EMAIL.test(value);
}

/** Validate raw input. Returns the normalized lead, or per-field error codes. */
export function validateLead(
  raw: Partial<Record<LeadField, unknown>>,
): { lead: Lead; errors: null } | { lead: null; errors: LeadErrors } {
  const input: LeadInput = {
    business: sanitizeText(raw.business, { max: limits.business + 1 }),
    contact: sanitizeText(raw.contact, { max: limits.contact + 1 }),
    mobile: sanitizeText(raw.mobile, { max: limits.mobile + 1 }),
    email: sanitizeText(raw.email, { max: limits.email + 1 }).toLowerCase(),
    type: sanitizeText(raw.type, { max: limits.type + 1 }),
    message: sanitizeText(raw.message, { multiline: true, max: limits.message + 1 }),
  };

  const errors: LeadErrors = {};
  for (const field of ["business", "contact", "mobile", "email", "type"] as const) {
    if (!input[field]) errors[field] = "required";
  }
  for (const field of Object.keys(limits) as LeadField[]) {
    if (!errors[field] && input[field].length > limits[field]) errors[field] = "tooLong";
  }
  if (!errors.email && !isValidEmail(input.email)) errors.email = "email";
  const mobile = errors.mobile ? null : normalizeSaudiMobile(input.mobile);
  if (!errors.mobile && !mobile) errors.mobile = "mobile";
  if (!errors.type && !(businessTypes as readonly string[]).includes(input.type)) errors.type = "type";

  if (Object.keys(errors).length > 0) return { lead: null, errors };
  return {
    lead: { ...input, mobile: mobile as string, type: input.type as BusinessType },
    errors: null,
  };
}
