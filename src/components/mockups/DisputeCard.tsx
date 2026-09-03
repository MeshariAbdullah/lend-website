import type { SiteContent } from "@/content";
import { Icon } from "../Icon";
import { ActivityRow, Card, MockChip, ScreenBar } from "./parts";

/** Merchant screen M15 — Damage / non-return case, with the case timeline. */
export function DisputeCard({ c }: { c: SiteContent }) {
  const m = c.mock;
  return (
    <div className="phone flex flex-col" aria-hidden="true">
      <ScreenBar title={m.caseTitle} trailing={<MockChip tone="amber">{m.caseStatus}</MockChip>} />
      <div className="flex flex-col gap-3 px-4 pb-4 pt-2">
        <div className="rounded-[12px] border border-[#E7C2C2] bg-tint-red px-3.5 py-3 text-[12px] leading-[1.7] text-[#7A2020]">{m.caseBanner}</div>
        <Card>
          <p className="text-[13px] font-bold text-navy">{m.caseType}</p>
          <div className="mt-2 flex flex-col gap-2 text-[12.5px] text-navy">
            <span className="flex items-center gap-2">
              <span className="size-[18px] rounded-full border-[5px] border-red bg-white" /> {m.caseDamage}
            </span>
            <span className="flex items-center gap-2 text-ink-muted">
              <span className="size-[18px] rounded-full border-[1.5px] border-control bg-white" /> {m.caseNoReturn}
            </span>
          </div>
        </Card>
        <Card>
          <div className="flex items-center justify-between">
            <p className="text-[13px] font-bold text-navy">{m.evidence}</p>
            <p className="text-[12px] text-ink-muted">
              {m.claim}: <span className="num font-semibold text-navy">600 {m.currency}</span>
            </p>
          </div>
          <div className="mt-2.5 grid grid-cols-3 gap-2">
            {[1, 2].map((n) => (
              <span
                key={n}
                className="grid aspect-[4/3] place-items-center rounded-control bg-tint-red text-red"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(135deg, rgba(163,45,45,.14) 0 6px, transparent 6px 14px)",
                }}
              >
                <Icon name="camera" size={16} />
              </span>
            ))}
            <span className="grid aspect-[4/3] place-items-center rounded-control border border-dashed border-control text-ink-faint">
              <Icon name="plus" size={16} />
            </span>
          </div>
          <p className="mt-2.5 text-[12px] leading-[1.7] text-ink-body">{m.caseDescBody}</p>
        </Card>
        <Card className="py-1">
          <ActivityRow text={m.caseOpened} time="09:12" />
          <ActivityRow text={m.caseEvidenceAdded} time="09:16" />
          <ActivityRow text={m.caseUnderReview} time={m.now} tone="amber" />
        </Card>
      </div>
    </div>
  );
}
