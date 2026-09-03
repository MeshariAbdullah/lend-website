import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Icon } from "@/components/Icon";
import { Container, buttonClass } from "@/components/ui";
import { getContent } from "@/content";
import { isLocale, localeHref, otherLocale, type Locale } from "@/lib/i18n";

type Kind = "privacy" | "terms";

export async function legalMetadata(kind: Kind, params: Promise<{ locale: string }>): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const c = getContent(locale);
  const path = `/${kind}`;
  return {
    title: c.legal[kind].title,
    description: c.legal[kind].body,
    alternates: {
      canonical: localeHref(locale, path),
      languages: { ar: localeHref("ar", path), en: localeHref("en", path), "x-default": localeHref("ar", path) },
    },
    robots: { index: false, follow: true },
  };
}

export async function LegalPage({ kind, params }: { kind: Kind; params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale: Locale = raw;
  const c = getContent(locale);
  const home = localeHref(locale);
  const page = c.legal[kind];

  return (
    <>
      <Header
        homeHref={home}
        brandName={c.brand.name}
        links={[
          { href: `${home}#how`, label: c.nav.how },
          { href: `${home}#customers`, label: c.nav.customers },
          { href: `${home}#business`, label: c.nav.business },
          { href: `${home}#faq`, label: c.nav.faq },
        ]}
        cta={{ href: `${home}#contact`, label: c.nav.cta }}
        switchHref={localeHref(otherLocale(locale), `/${kind}`)}
        switchLabel={c.nav.switchLabel}
        switchTo={c.nav.switchTo}
        openMenu={c.nav.openMenu}
        closeMenu={c.nav.closeMenu}
      />
      <main id="main" className="flex-1 py-16 lg:py-24">
        <Container>
          <div className="mx-auto max-w-[720px]">
            <p className="eyebrow">{page.updated}</p>
            <h1 className="mt-3 text-3xl font-bold leading-heading text-navy sm:text-4xl">{page.title}</h1>
            <p className="mt-6 text-lg leading-body text-ink-body">{page.body}</p>
            <Link href={home} className={buttonClass("secondary", "md", "mt-10")}>
              <Icon name="arrow" size={18} className="rotate-180" mirror />
              {c.legal.back}
            </Link>
          </div>
        </Container>
      </main>
      <Footer c={c} locale={locale} />
    </>
  );
}
