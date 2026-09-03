import type { SiteContent } from "@/content";
import { Icon } from "../Icon";
import { MiniCheck, MockButton, ScreenBar } from "./parts";

/** Customer screen 09 — Review wizard (step 2 of 3). */
export function ContractScreen({ c }: { c: SiteContent }) {
  const m = c.mock;
  return (
    <div className="phone flex flex-col" aria-hidden="true">
      <ScreenBar title={c.product.labels.contract} />
      <div className="flex flex-col gap-3 px-4 pb-4 pt-2">
        <div className="card flex gap-1 p-1.5">
          <span className="flex flex-1 items-center justify-center gap-1 rounded-[8px] py-2 text-xs font-semibold text-green-deep">
            <MiniCheck /> {c.product.labels.offer}
          </span>
          <span className="flex flex-1 items-center justify-center rounded-[8px] bg-navy py-2 text-xs font-semibold text-white">{m.viewContract}</span>
          <span className="flex flex-1 items-center justify-center rounded-[8px] py-2 text-xs font-semibold text-ink-faint">{m.confirmReceipt.split(" ")[0]}</span>
        </div>
        <div className="card p-4">
          <div className="flex items-center gap-3 border-b border-line-soft pb-3">
            <span className="grid size-10 place-items-center rounded-control bg-tint-navy text-navy">
              <Icon name="document" size={18} />
            </span>
            <div className="min-w-0">
              <p className="truncate text-[13.5px] font-bold text-navy">{m.contractTitle}</p>
              <p className="truncate text-[11.5px] text-ink-muted">{m.contractBetween}</p>
            </div>
          </div>
          <div className="mt-3 flex flex-col gap-3 text-[12px] leading-[1.75] text-ink-body">
            <div>
              <p className="font-bold text-navy">{m.contractSubject}</p>
              <p>{m.contractSubjectBody}</p>
            </div>
            <div>
              <p className="font-bold text-navy">{m.contractTerm}</p>
              <p>{m.contractTermBody}</p>
            </div>
            <div>
              <p className="font-bold text-navy">{m.contractLiability}</p>
              <p>{m.contractLiabilityBody}</p>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-[1fr_1.6fr] gap-2">
          <MockButton variant="secondary">{m.prev}</MockButton>
          <MockButton>{m.readNext}</MockButton>
        </div>
      </div>
    </div>
  );
}
