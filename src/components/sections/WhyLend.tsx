import type { SiteContent } from "@/content";
import { Icon } from "../Icon";
import { CheckDot, Container, SectionHeading } from "../ui";

export function WhyLend({ c }: { c: SiteContent }) {
  return (
    <section id="why" aria-labelledby="why-title" className="py-20 lg:py-28 xl:py-32">
      <Container>
        <SectionHeading eyebrow={c.why.eyebrow} title={c.why.title} intro={c.why.intro} />
        <div className="mt-12 grid gap-5 lg:mt-16 lg:grid-cols-2 lg:gap-6">
          <div className="card p-6 sm:p-8">
            <div className="flex items-center gap-3">
              <span className="grid size-9 place-items-center rounded-control bg-beige text-ink-muted">
                <Icon name="alert" size={18} />
              </span>
              <h3 className="text-lg font-semibold text-navy">{c.why.beforeTitle}</h3>
            </div>
            <ol className="mt-6 flex flex-col divide-y divide-line-soft">
              {c.why.pains.map((p) => (
                <li key={p.title} className="flex gap-4 py-4 first:pt-0 last:pb-0">
                  <span className="mt-2 size-2 shrink-0 rounded-full bg-ink-faint" aria-hidden="true" />
                  <div>
                    <p className="font-semibold text-navy">{p.title}</p>
                    <p className="mt-1 text-[15px] leading-body text-ink-body">{p.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
          <div className="rounded-card border border-[#BFE8DB] bg-tint-green/60 p-6 sm:p-8">
            <div className="flex items-center gap-3">
              <span className="grid size-9 place-items-center rounded-control bg-white text-green-deep">
                <Icon name="check" size={18} strokeWidth={2} />
              </span>
              <h3 className="text-lg font-semibold text-navy">{c.why.afterTitle}</h3>
            </div>
            <ol className="mt-6 flex flex-col divide-y divide-[#BFE8DB]">
              {c.why.gains.map((g) => (
                <li key={g.title} className="flex gap-4 py-4 first:pt-0 last:pb-0">
                  <CheckDot size={22} className="mt-0.5" />
                  <div>
                    <p className="font-semibold text-navy">{g.title}</p>
                    <p className="mt-1 text-[15px] leading-body text-ink-body">{g.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </Container>
    </section>
  );
}
