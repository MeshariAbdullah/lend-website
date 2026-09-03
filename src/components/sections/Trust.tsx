import type { SiteContent } from "@/content";
import { Icon } from "../Icon";
import { Container, SectionHeading } from "../ui";

export function Trust({ c }: { c: SiteContent }) {
  return (
    <section id="trust" aria-labelledby="trust-title" className="bg-white border-y border-line py-20 lg:py-28 xl:py-32">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <SectionHeading eyebrow={c.trust.eyebrow} title={c.trust.title} intro={c.trust.intro} />
            <div className="mt-8 flex gap-3 rounded-card border border-[#D6DEED] bg-tint-navy p-5 text-[15px] leading-body text-navy">
              <Icon name="info" size={20} className="mt-0.5 shrink-0" />
              <p>{c.trust.note}</p>
            </div>
          </div>
          <ul className="flex flex-col divide-y divide-line-soft rounded-card border border-line bg-beige px-5 sm:px-8">
            {c.trust.items.map((t) => (
              <li key={t.title} className="flex gap-4 py-6">
                <span className="grid size-10 shrink-0 place-items-center rounded-control bg-white text-navy">
                  <Icon name={t.icon} size={20} />
                </span>
                <div>
                  <h3 className="text-[17px] font-semibold text-navy">{t.title}</h3>
                  <p className="mt-1.5 text-[15px] leading-body text-ink-body">{t.body}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
