import type { SiteContent } from "@/content";
import { MiniCheck, MockButton, Row } from "./parts";

/** Merchant screen M14 — Close rental: receipt confirmation + item condition. */
export function ReceiptCard({ c }: { c: SiteContent }) {
  const m = c.mock;
  return (
    <div className="phone flex flex-col gap-3 p-4" aria-hidden="true">
      <div className="card p-4">
        <p className="text-[13.5px] font-bold text-navy">{m.confirmReceipt}</p>
        <label className="mt-3 flex items-center gap-2.5 text-[13px] text-navy">
          <span className="grid size-5 place-items-center rounded-[6px] bg-navy text-white">
            <MiniCheck />
          </span>
          {m.receivedFromCustomer}
        </label>
      </div>
      <div className="card p-4">
        <p className="text-[13.5px] font-bold text-navy">{m.itemCondition}</p>
        <div className="mt-3 grid grid-cols-2 gap-2">
          <span className="grid min-h-10 place-items-center rounded-control border-[1.5px] border-green bg-tint-green text-[13px] font-semibold text-green-deep">
            {m.conditionGood}
          </span>
          <span className="grid min-h-10 place-items-center rounded-control border-[1.5px] border-control bg-white text-[13px] font-semibold text-ink-muted">
            {m.conditionNotes}
          </span>
        </div>
      </div>
      <div className="card px-4 py-1">
        <Row label={m.customer} value={m.sampleItem3.split(" — ")[1]} />
        <Row label={m.item} value={`${m.sampleItem3.split(" — ")[0]} — ${m.conditionGood}`} />
        <Row label={m.handoverTime} value="17/07/2026 · 5:12 PM" ltr />
      </div>
      <MockButton>{m.closeRental}</MockButton>
    </div>
  );
}
