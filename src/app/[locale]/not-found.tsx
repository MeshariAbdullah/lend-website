import Link from "next/link";
import { LogoMark } from "@/components/Logo";
import { buttonClass } from "@/components/ui";
import { getContent } from "@/content";
import { defaultLocale, localeHref } from "@/lib/i18n";

// The locale segment is unknown when a 404 is rendered, so this falls back to Arabic.
export default function NotFound() {
  const c = getContent(defaultLocale);
  return (
    <main id="main" className="grid flex-1 place-items-center px-5 py-24 text-center">
      <div>
        <LogoMark size={56} className="mx-auto" />
        <h1 className="mt-6 text-3xl font-bold text-navy">{c.notFound.title}</h1>
        <p className="mt-3 text-ink-body">{c.notFound.body}</p>
        <Link href={localeHref(defaultLocale)} className={buttonClass("primary", "md", "mt-8")}>
          {c.notFound.back}
        </Link>
      </div>
    </main>
  );
}
