import Link from "next/link";
import { LogoMark } from "@/components/Logo";
import { buttonClass } from "@/components/ui";
import { getContent } from "@/content";
import { localeHref, type Locale } from "@/lib/i18n";

export function NotFoundPage({ locale }: { locale: Locale }) {
  const c = getContent(locale);
  return (
    <main id="main" className="grid flex-1 place-items-center px-5 py-24 text-center">
      <div>
        <LogoMark size={56} className="mx-auto" />
        <h1 className="mt-6 text-3xl font-bold text-navy">{c.notFound.title}</h1>
        <p className="mt-3 text-ink-body">{c.notFound.body}</p>
        <Link href={localeHref(locale)} className={buttonClass("primary", "md", "mt-8")}>
          {c.notFound.back}
        </Link>
      </div>
    </main>
  );
}
