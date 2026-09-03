import type { SiteContent } from "@/content";
import { Icon } from "../Icon";
import { StageTimeline } from "./StageTimeline";
import { Card, MiniCheck, MockChip, Row, ScreenBar } from "./parts";

/** Customer screen 12 — Rental details. */
export function StatusCard({ c }: { c: SiteContent }) {
  const m = c.mock;
  return (
    <div className="phone flex flex-col" aria-hidden="true">
      <ScreenBar
        title={
          <>
            {m.rentalDetails} <span className="num text-ink-muted font-medium">#R-2440</span>
          </>
        }
        trailing={<MockChip tone="green">{m.statusActive}</MockChip>}
      />
      <div className="flex flex-col gap-3 px-4 pb-4 pt-2">
        <Card className="py-4">
          <StageTimeline stages={c.how.stages} current={3} />
        </Card>
        <Card className="flex items-center gap-3">
          <span className="grid size-10 shrink-0 place-items-center rounded-control bg-tint-navy text-navy">
            <Icon name="document" size={18} />
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-[13.5px] font-bold text-navy">{m.contractTitle.replace("R-2481", "R-2440")}</p>
            <p className="text-[11.5px] text-ink-muted">
              {m.documentedOn} <span className="num">18/07/2026</span>
            </p>
          </div>
          <MockChip tone="green">
            <MiniCheck /> {m.documented}
          </MockChip>
        </Card>
        <Card className="py-1">
          <Row label={m.item} value={m.sampleItem3.split(" — ")[0]} />
          <Row label={m.start} value="18/07/2026 · 4:00 PM" ltr />
          <Row label={m.returnDate} value="23/07/2026" ltr />
          <Row label={m.branch} value={m.sampleBranch} />
        </Card>
        <div className="flex gap-2.5 rounded-[12px] border border-[#D6DEED] bg-tint-navy px-3.5 py-3 text-[12px] leading-[1.7] text-navy">
          <Icon name="info" size={16} className="mt-0.5 shrink-0" />
          <p>{m.readyToReturn}</p>
        </div>
      </div>
    </div>
  );
}
