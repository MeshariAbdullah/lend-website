import type { Locale } from "@/lib/i18n";
import { ar } from "./ar";
import { en } from "./en";
import type { SiteContent } from "./types";

export type { SiteContent } from "./types";

const dictionaries: Record<Locale, SiteContent> = { ar, en };

export function getContent(locale: Locale): SiteContent {
  return dictionaries[locale];
}
