import type { MetadataRoute } from "next";
import { localeHref, siteUrl } from "@/lib/i18n";

const paths = ["/", "/privacy", "/terms"];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return paths.flatMap((path) =>
    (["ar", "en"] as const).map((locale) => ({
      url: `${siteUrl}${localeHref(locale, path)}`,
      lastModified: now,
      changeFrequency: path === "/" ? ("weekly" as const) : ("monthly" as const),
      priority: path === "/" ? (locale === "ar" ? 1 : 0.9) : 0.3,
      alternates: {
        languages: {
          ar: `${siteUrl}${localeHref("ar", path)}`,
          en: `${siteUrl}${localeHref("en", path)}`,
        },
      },
    })),
  );
}
