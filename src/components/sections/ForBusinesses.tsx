import type { SiteContent } from "@/content";
import type { Locale } from "@/lib/i18n";
import { localeHref } from "@/lib/i18n";
import { Icon } from "../Icon";
import { DashboardCard } from "../mockups/DashboardCard";
import { ButtonLink, Container, SectionHeading } from "../ui";

export function ForBusinesses({ c, locale }: { c: SiteContent; locale: Locale }) {
  return (
    <section id="business" aria-labelledby="business-title" className="bg-white border-y border-line py-20 lg:py-28 xl:py-32">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[380px_1fr] lg:items-start lg:gap-16 xl:grid-cols-[420px_1fr]">
          <div className="order-2 mx-auto w-full max-w-[380px] lg:order-1 lg:sticky lg:top-28">
            <DashboardCard c={c} />
          </div>
          <div className="order-1 lg:order-2">
            <SectionHeading eyebrow={c.business.eyebrow} title={c.business.title} intro={c.business.intro} />
            <ul className="mt-10 grid gap-x-8 gap-y-7 sm:grid-cols-2">
              {c.business.items.map((b) => (
                <li key={b.title} className="flex gap-4">
                  <span className="grid size-10 shrink-0 place-items-center rounded-control bg-tint-navy text-navy">
                    <Icon name={b.icon} size={20} />
                  </span>
                  <div>
                    <h3 className="text-[17px] font-semibold text-navy">{b.title}</h3>
                    <p className="mt-1 text-[15px] leading-body text-ink-body">{b.body}</p>
                  </div>
                </li>
              ))}
            </ul>
            <div className="mt-10">
              <ButtonLink href={`${localeHref(locale)}#contact`} variant="green" size="lg">
                {c.business.cta}
                <Icon name="arrow" size={18} mirror />
              </ButtonLink>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
