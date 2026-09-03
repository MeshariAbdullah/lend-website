import type { SiteContent } from "@/content";
import { MockButton, MockChip } from "./parts";

/** Customer screen 10 — Approval success. */
export function ApprovedCard({ c }: { c: SiteContent }) {
  const m = c.mock;
  return (
    <div className="phone flex flex-col items-center gap-4 px-5 py-8 text-center" aria-hidden="true">
      <span className="grid size-[76px] place-items-center rounded-full bg-tint-green">
        <span className="grid size-14 place-items-center rounded-full bg-green-deep text-white">
          <svg width="26" height="26" viewBox="0 0 12 12" fill="none">
            <path d="M2 6.5L4.8 9.2 10 3.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </span>
      <div>
        <p className="text-[17px] font-bold text-navy">{m.approvedTitle}</p>
        <p className="mt-1.5 max-w-[260px] text-[12.5px] leading-[1.8] text-ink-body">{m.approvedBody}</p>
      </div>
      <div className="card flex w-full items-center justify-between px-4 py-3">
        <div className="text-start">
          <p className="text-[11px] text-ink-muted">{m.requestNo}</p>
          <p className="num text-[14px] font-bold text-navy">R-2481</p>
        </div>
        <MockChip tone="green">{c.how.stages[2]}</MockChip>
      </div>
      <div className="w-full">
        <MockButton>{m.rentalDetails}</MockButton>
      </div>
    </div>
  );
}
