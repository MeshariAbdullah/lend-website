import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Icon } from "@/components/Icon";
import { Container, buttonClass } from "@/components/ui";
import { getContent } from "@/content";
import { localeHref, otherLocale, type Locale } from "@/lib/i18n";

type Kind = "privacy" | "terms";

export function legalMetadata(kind: Kind, locale: Locale): Metadata {
  const c = getContent(locale);
  const doc = c.legal[kind];
  const path = `/${kind}`;
  return {
    title: doc.title,
    description: doc.intro,
    alternates: {
      canonical: localeHref(locale, path),
      languages: { ar: localeHref("ar", path), en: localeHref("en", path), "x-default": localeHref("ar", path) },
    },
    openGraph: {
      type: "article",
      url: localeHref(locale, path),
      title: `${doc.title} | ${c.meta.siteName}`,
      description: doc.intro,
    },
    // Placeholder documents stay out of search results until they are real.
    robots: doc.placeholder ? { index: false, follow: true } : { index: true, follow: true },
  };
}

/**
 * Legal document page (privacy policy, terms). Arabic-first, fully public,
 * one readable column with a sticky table of contents on wide screens.
 */
export function LegalPage({ kind, locale }: { kind: Kind; locale: Locale }) {
  const c = getContent(locale);
  const home = localeHref(locale);
  const doc = c.legal[kind];

  return (
    <>
      <Header
        homeHref={home}
        brandName={c.brand.name}
        links={[
          { href: home, label: c.nav.home },
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
      <main id="main" className="flex-1">
        <Container className="py-12 sm:py-16 lg:py-20">
          <div className="lg:grid lg:grid-cols-[240px_minmax(0,720px)] lg:justify-center lg:gap-16 xl:grid-cols-[260px_minmax(0,760px)]">
            {/* Table of contents (wide screens only). */}
            {doc.sections.length > 0 && (
              <nav aria-label={c.legal.contentsLabel} className="hidden lg:block lg:sticky lg:top-28 lg:self-start">
                <p className="eyebrow">{c.legal.contentsLabel}</p>
                <ol className="mt-4 flex flex-col gap-1 border-s border-line">
                  {doc.sections.map((s) => (
                    <li key={s.id}>
                      <a
                        href={`#${s.id}`}
                        className="-ms-px block border-s-2 border-transparent py-1.5 ps-4 text-[14px] leading-snug text-ink-muted transition-colors hover:border-green hover:text-navy"
                      >
                        {s.heading}
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>
            )}

            <article className="min-w-0">
              <header>
                <p className="eyebrow">{doc.eyebrow}</p>
                <h1 className="mt-3 text-[2rem] font-bold leading-heading text-navy sm:text-[2.5rem]">{doc.title}</h1>
                <p className="mt-5 text-[1.0625rem] leading-body text-ink-body sm:text-lg">{doc.intro}</p>
                {doc.effectiveDate && (
                  <p className="mt-6 inline-flex items-center gap-2 rounded-full bg-tint-navy px-3.5 py-1.5 text-sm font-medium text-navy">
                    <Icon name="clock" size={16} />
                    <span>
                      {c.legal.effectiveLabel}: <time dateTime={doc.effectiveDateIso}>{doc.effectiveDate}</time>
                    </span>
                  </p>
                )}
              </header>

              {doc.sections.length > 0 && (
                <div className="mt-12 flex flex-col gap-10 border-t border-line pt-10">
                  {doc.sections.map((s, index) => (
                    <section key={s.id} id={s.id} aria-labelledby={`${s.id}-title`} className="scroll-mt-28">
                      <h2 id={`${s.id}-title`} className="flex items-baseline gap-3 text-xl font-semibold leading-heading text-navy sm:text-2xl">
                        <span className="num text-sm font-semibold text-green-deep">{String(index + 1).padStart(2, "0")}</span>
                        {s.heading}
                      </h2>
                      {s.paragraphs?.map((p) => (
                        <p key={p} className="mt-4 text-[15.5px] leading-body text-ink-body sm:text-base">
                          {p}
                        </p>
                      ))}
                      {s.bullets && (
                        <ul className="mt-4 flex flex-col gap-3">
                          {s.bullets.map((b) => (
                            <li key={b} className="flex gap-3 text-[15.5px] leading-body text-ink-body sm:text-base">
                              <span aria-hidden="true" className="mt-[0.7em] size-1.5 shrink-0 rounded-full bg-green" />
                              <span>{b}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                      {s.after?.map((p) => (
                        <p key={p} className="mt-4 text-[15.5px] leading-body text-ink-body sm:text-base">
                          {p}
                        </p>
                      ))}
                      {s.id === "contact" && doc.contactEmail && (
                        <div className="card mt-5 flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between">
                          <div>
                            <p className="text-xs font-semibold text-ink-muted">{c.legal.contactLabel}</p>
                            <a
                              href={`mailto:${doc.contactEmail}`}
                              dir="ltr"
                              className="num mt-1 inline-block text-lg font-semibold text-navy underline-offset-4 hover:underline"
                            >
                              {doc.contactEmail}
                            </a>
                          </div>
                          <p dir="ltr" className="num text-sm text-ink-muted">
                            lend.sa
                          </p>
                        </div>
                      )}
                    </section>
                  ))}
                </div>
              )}

              <div className="mt-12 border-t border-line pt-8">
                <Link href={home} className={buttonClass("secondary", "md")}>
                  <Icon name="arrow" size={18} className="rotate-180" mirror />
                  {c.legal.back}
                </Link>
              </div>
            </article>
          </div>
        </Container>
      </main>
      <Footer c={c} locale={locale} />
    </>
  );
}
