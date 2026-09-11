import Link from "next/link";
import type { SiteContent } from "@/content";
import type { Locale } from "@/lib/i18n";
import { localeHref } from "@/lib/i18n";
import { Logo } from "./Logo";
import { Container } from "./ui";

export function Footer({ c, locale }: { c: SiteContent; locale: Locale }) {
  const links = [
    { href: localeHref(locale, "/privacy"), label: c.footer.privacy },
    { href: localeHref(locale, "/terms"), label: c.footer.terms },
    { href: `${localeHref(locale)}#contact`, label: c.footer.contact },
  ];
  return (
    <footer className="border-t border-line bg-beige">
      <Container className="py-12 lg:py-16">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr] lg:grid-cols-[1.6fr_1fr_1fr]">
          <div>
            <Logo markSize={36} label={c.brand.name} />
            <p className="mt-5 max-w-md text-[15px] leading-body text-ink-body">{c.footer.description}</p>
          </div>
          <nav aria-label="Footer">
            <ul className="flex flex-col gap-3">
              {links.map((l) => (
                <li key={l.href}>
                  {l.href.includes("#") ? (
                    <a href={l.href} className="text-[15px] font-medium text-ink-body hover:text-navy hover:underline underline-offset-4">
                      {l.label}
                    </a>
                  ) : (
                    <Link href={l.href} className="text-[15px] font-medium text-ink-body hover:text-navy hover:underline underline-offset-4">
                      {l.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>
          <div className="md:col-span-2 lg:col-span-1">
            <p className="text-lg font-semibold text-navy leading-heading">
              {c.brand.tagline1} <span className="text-green-deep">{c.brand.tagline2}</span>
            </p>
            <p className="mt-2 text-sm text-ink-muted">{c.footer.madeIn}</p>
          </div>
        </div>
        <div className="mt-10 flex flex-col gap-2 border-t border-line-soft pt-6 text-sm text-ink-muted sm:flex-row sm:items-center sm:justify-between">
          <p>{c.footer.copyright}</p>
          <p dir="ltr" className="font-sans">
            lend.sa
          </p>
        </div>
      </Container>
    </footer>
  );
}
