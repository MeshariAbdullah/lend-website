import type { SiteContent } from "@/content";
import { StageTimeline } from "./StageTimeline";
import { ActivityRow, Card, MockButton, MockChip, Row, ScreenBar } from "./parts";

/** Customer screen 08 — Offer & contract details. */
export function OfferScreen({ c }: { c: SiteContent }) {
  const m = c.mock;
  return (
    <div className="phone flex flex-col" aria-hidden="true">
      <ScreenBar
        title={
          <>
            {m.offerTitle} <span className="num text-ink-muted font-medium">{m.offerNo}</span>
          </>
        }
        trailing={<MockChip tone="amber">{m.awaitingReview}</MockChip>}
      />
      <div className="flex flex-col gap-3 px-4 pb-4 pt-2">
        <Card className="py-4">
          <StageTimeline stages={c.how.stages} current={2} />
        </Card>
        <Card className="py-1">
          <Row label={m.merchant} value={m.sampleStore} />
          <Row label={m.customer} value={m.sampleCustomer} />
          <Row label={m.item} value={m.sampleItem1} />
          <Row label={m.rentalValue} value={<span className="num">450 {m.currency}</span>} />
          <Row label={m.originalValue} value={<span className="num">3,200 {m.currency}</span>} />
          <Row label={m.duration} value={<span>{m.days} · <span className="num">21/07 → 24/07</span></span>} />
        </Card>
        <div>
          <p className="mb-1.5 px-1 text-xs font-semibold text-navy">{m.activity}</p>
          <Card className="py-1">
            <ActivityRow text={m.actIssued} time="10:38" />
            <ActivityRow text={m.actSent} time="10:39" />
            <ActivityRow text={m.actAwaiting} time={m.now} tone="amber" />
          </Card>
        </div>
        <div className="mt-1 flex flex-col gap-2">
          <MockButton>{m.reviewApprove}</MockButton>
          <p className="text-center text-xs font-semibold text-red">{m.decline}</p>
        </div>
      </div>
    </div>
  );
}
