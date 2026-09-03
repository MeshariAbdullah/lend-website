import type { SiteContent } from "@/content";
import { Icon } from "../Icon";
import { ApprovedCard } from "../mockups/ApprovedCard";
import { Container, SectionHeading } from "../ui";

export function ForCustomers({ c }: { c: SiteContent }) {
  return (
    <section id="customers" aria-labelledby="customers-title" className="py-20 lg:py-28 xl:py-32">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[1fr_380px] lg:items-start lg:gap-16 xl:grid-cols-[1fr_420px]">
          <div>
            <SectionHeading eyebrow={c.customers.eyebrow} title={c.customers.title} intro={c.customers.intro} />
            <ul className="mt-10 grid gap-4 sm:grid-cols-2">
              {c.customers.benefits.map((b, i) => (
                <li key={b.title} className={`card p-5 sm:p-6 ${i === 0 ? "sm:col-span-2" : ""}`}>
                  <span className="grid size-10 place-items-center rounded-control bg-tint-green text-green-deep">
                    <Icon name={b.icon} size={20} />
                  </span>
                  <h3 className="mt-4 text-[17px] font-semibold text-navy">{b.title}</h3>
                  <p className="mt-1.5 text-[15px] leading-body text-ink-body">{b.body}</p>
                </li>
              ))}
            </ul>
          </div>
          <div className="mx-auto w-full max-w-[380px] lg:sticky lg:top-28">
            <ApprovedCard c={c} />
          </div>
        </div>
      </Container>
    </section>
  );
}
