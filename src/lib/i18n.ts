export const locales = ["ar", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "ar";

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

export function dirOf(locale: Locale): "rtl" | "ltr" {
  return locale === "ar" ? "rtl" : "ltr";
}

/** Public URL for a path in a given locale. Arabic lives at the root, English under /en. */
export function localeHref(locale: Locale, path = "/"): string {
  const clean = path.startsWith("/") ? path : `/${path}`;
  if (locale === "ar") return clean;
  return clean === "/" ? "/en" : `/en${clean}`;
}

export function otherLocale(locale: Locale): Locale {
  return locale === "ar" ? "en" : "ar";
}

export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.lend.sa"
).replace(/\/$/, "");

/** Merchant portal (business login). Opened in the same tab. */
export const merchantPortalUrl = "https://business.lend.sa";
