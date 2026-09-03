import type { SiteContent } from "@/content";
import type { Locale } from "@/lib/i18n";
import { localeHref } from "@/lib/i18n";
import { Icon } from "../Icon";
import { LogoMark } from "../Logo";
import { OfferScreen } from "../mockups/OfferScreen";
import { MiniCheck, MockChip } from "../mockups/parts";
import { ButtonLink, CheckDot, Container } from "../ui";

export function Hero({ c, locale }: { c: SiteContent; locale: Locale }) {
  const m = c.mock;
  return (
    <section id="top" aria-labelledby="hero-title" className="pt-4 sm:pt-6 lg:pt-8">
      <Container wide className="px-0 sm:px-8 lg:px-10">
        <div className="relative overflow-hidden bg-navy text-white sm:rounded-panel lg:rounded-[28px]">
          {/* Brand motif: the logo ring, oversized and faint. */}
          <LogoMark
            variant="onDark"
            size={720}
            className="pointer-events-none absolute -top-40 -end-56 opacity-[0.06] hidden lg:block"
          />
          <div className="relative grid gap-12 px-5 pb-10 pt-14 sm:px-10 sm:pt-16 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-10 lg:px-16 lg:pb-16 lg:pt-20 xl:px-20 xl:pt-24 xl:pb-20">
            <div className="max-w-[640px]">
              <p className="eyebrow text-on-navy-green">{c.hero.eyebrow}</p>
              <h1
                id="hero-title"
                className="mt-4 text-[2.5rem] font-bold leading-heading tracking-[-0.01em] sm:text-[3.25rem] lg:text-[3.5rem] xl:text-[4rem]"
              >
                {c.brand.tagline1}
                <br />
                <span className="text-green">{c.brand.tagline2}</span>
              </h1>
              <p className="mt-6 max-w-[560px] text-[1.0625rem] leading-body text-on-navy-muted sm:text-lg">{c.hero.supporting}</p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <ButtonLink href={`${localeHref(locale)}#how`} variant="onDark" size="lg">
                  {c.hero.primaryCta}
                  <Icon name="arrow" size={18} mirror />
                </ButtonLink>
                <ButtonLink
                  href={`${localeHref(locale)}#business`}
                  variant="tertiary"
                  size="lg"
                  className="text-white hover:text-on-navy-green"
                >
                  {c.hero.secondaryCta}
                </ButtonLink>
              </div>
              <ul className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-x-7">
                {c.hero.points.map((p) => (
                  <li key={p} className="flex items-center gap-2.5 text-[15px] text-white/90">
                    <CheckDot size={20} className="!bg-green" />
                    {p}
                  </li>
                ))}
              </ul>
            </div>

            <div className="relative mx-auto w-full max-w-[380px] lg:max-w-[400px] lg:justify-self-end">
              <figure className="relative">
                <OfferScreen c={c} />
                <figcaption className="sr-only">{c.hero.screenLabel}</figcaption>
              </figure>
              {/* Floating detail cards from the design system, desktop only. */}
              <div
                aria-hidden="true"
                className="card absolute -start-28 top-[58%] hidden w-[300px] items-center gap-3 p-3.5 shadow-card xl:flex"
              >
                <span className="grid size-10 shrink-0 place-items-center rounded-control bg-tint-navy text-navy">
                  <Icon name="document" size={18} />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[13px] font-bold text-navy">{m.contractTitle}</p>
                  <p className="whitespace-nowrap text-[11px] text-ink-muted">
                    {m.documentedOn} <span className="num">18/07/2026</span>
                  </p>
                </div>
                <MockChip tone="green">
                  <MiniCheck /> {m.documented}
                </MockChip>
              </div>
              <div
                aria-hidden="true"
                className="card absolute -end-14 -bottom-5 hidden w-[250px] items-center gap-3 px-4 py-3 shadow-card xl:flex"
              >
                <span className="size-2 rounded-full bg-green" />
                <span className="flex-1 text-[13px] text-navy">{m.contractApproved}</span>
                <span className="num text-[11px] text-ink-faint">10:42</span>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
