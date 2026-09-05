import type { SiteContent } from "@/content";
import { Icon } from "../Icon";
import { Container, SectionHeading } from "../ui";

export function Faq({ c }: { c: SiteContent }) {
  return (
    <section id="faq" aria-labelledby="faq-title" className="py-20 lg:py-28 xl:py-32">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <SectionHeading eyebrow={c.faq.eyebrow} title={c.faq.title} intro={c.faq.intro} />
          </div>
          <div className="flex flex-col gap-3">
            {c.faq.items.map((f, i) => (
              <details key={f.q} className="faq card group open:shadow-card" open={i === 0}>
                <summary className="flex cursor-pointer items-center justify-between gap-4 rounded-card px-5 py-4 text-[17px] font-semibold text-navy sm:px-6 sm:py-5">
                  <span>{f.q}</span>
                  <span className="faq-icon grid size-8 shrink-0 place-items-center rounded-full bg-beige text-navy transition-transform duration-200 group-open:bg-tint-green group-open:text-green-deep">
                    <Icon name="plus" size={16} strokeWidth={2} />
                  </span>
                </summary>
                <div className="flex flex-col gap-3 px-5 pb-5 sm:px-6 sm:pb-6">
                  {f.a.split("\n\n").map((paragraph) => (
                    <p key={paragraph} className="text-[15px] leading-body text-ink-body">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </details>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
