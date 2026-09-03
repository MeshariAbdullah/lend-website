import type { SiteContent } from "@/content";
import { ContractScreen } from "../mockups/ContractScreen";
import { DisputeCard } from "../mockups/DisputeCard";
import { OfferScreen } from "../mockups/OfferScreen";
import { ReceiptCard } from "../mockups/ReceiptCard";
import { StatusCard } from "../mockups/StatusCard";
import { Container, SectionHeading } from "../ui";

export function ProductExperience({ c }: { c: SiteContent }) {
  const shots = [
    { label: c.product.labels.offer, node: <OfferScreen c={c} /> },
    { label: c.product.labels.contract, node: <ContractScreen c={c} /> },
    { label: c.product.labels.receipt, node: <ReceiptCard c={c} /> },
    { label: c.product.labels.status, node: <StatusCard c={c} /> },
    { label: c.product.labels.dispute, node: <DisputeCard c={c} /> },
  ];
  return (
    <section id="product" aria-labelledby="product-title" className="py-20 lg:py-28 xl:py-32">
      <Container wide>
        <SectionHeading eyebrow={c.product.eyebrow} title={c.product.title} intro={c.product.intro} align="center" />
      </Container>
      <div className="mt-12 lg:mt-16">
        <Container wide className="px-0 sm:px-8 lg:px-10">
          <ul className="no-scrollbar flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-4 sm:px-0 md:grid md:grid-cols-12 md:gap-6 md:overflow-visible md:pb-0">
            {shots.map((s, i) => (
              <li
                key={s.label}
                className={`w-[300px] shrink-0 snap-center sm:w-[320px] md:w-auto md:col-span-6 lg:col-span-4 ${
                  i === 3 ? "lg:col-start-3" : ""
                } ${i === 4 ? "md:col-start-4 lg:col-start-7" : ""}`}
              >
                <div className="mx-auto max-w-[360px] rounded-[32px] bg-canvas p-3">{s.node}</div>
                <p className="mt-3 text-center text-sm font-semibold text-navy">{s.label}</p>
              </li>
            ))}
          </ul>
        </Container>
      </div>
    </section>
  );
}
