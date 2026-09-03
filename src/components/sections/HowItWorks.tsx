import type { SiteContent } from "@/content";
import type { Step } from "@/content/types";
import { Icon } from "../Icon";
import { StageTimeline } from "../mockups/StageTimeline";
import { Container, SectionHeading } from "../ui";

function Flow({ title, sub, steps, icon }: { title: string; sub: string; steps: Step[]; icon: "user" | "store" }) {
  return (
    <div className="card p-6 sm:p-8">
      <div className="flex items-center gap-3">
        <span className="grid size-11 place-items-center rounded-control bg-tint-navy text-navy">
          <Icon name={icon} size={22} />
        </span>
        <div>
          <h3 className="text-lg font-semibold text-navy">{title}</h3>
          <p className="text-sm text-ink-muted">{sub}</p>
        </div>
      </div>
      <ol className="mt-7 flex flex-col">
        {steps.map((s, i) => (
          <li key={s.title} className="relative flex gap-4 pb-6 last:pb-0">
            {i < steps.length - 1 && (
              <span aria-hidden="true" className="absolute start-[15px] top-8 bottom-0 w-px bg-line" />
            )}
            <span className="num relative z-10 grid size-8 shrink-0 place-items-center rounded-full bg-tint-green text-[13px] font-bold text-green-deep">
              {i + 1}
            </span>
            <div className="pt-1">
              <p className="font-semibold text-navy">{s.title}</p>
              <p className="mt-0.5 text-[15px] leading-body text-ink-body">{s.body}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}

export function HowItWorks({ c }: { c: SiteContent }) {
  return (
    <section id="how" aria-labelledby="how-title" className="bg-white border-y border-line py-20 lg:py-28 xl:py-32">
      <Container>
        <SectionHeading eyebrow={c.how.eyebrow} title={c.how.title} intro={c.how.intro} align="center" />
        <div className="mx-auto mt-12 max-w-[860px] rounded-card border border-line bg-beige px-5 py-7 sm:px-10 sm:py-9 lg:mt-16">
          <p className="mb-6 text-center text-sm font-semibold text-ink-muted">{c.how.stagesTitle}</p>
          <StageTimeline stages={c.how.stages} current={3} />
        </div>
        <div className="mt-6 grid gap-5 lg:grid-cols-2 lg:gap-6">
          <Flow title={c.how.customerTitle} sub={c.how.customerSub} steps={c.how.customer} icon="user" />
          <Flow title={c.how.merchantTitle} sub={c.how.merchantSub} steps={c.how.merchant} icon="store" />
        </div>
      </Container>
    </section>
  );
}
