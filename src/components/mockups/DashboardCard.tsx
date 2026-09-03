import type { SiteContent } from "@/content";
import { Icon } from "../Icon";
import { MiniCheck, MockButton, MockChip } from "./parts";

/** Merchant screen M09 — Store dashboard. */
export function DashboardCard({ c }: { c: SiteContent }) {
  const m = c.mock;
  const stats: [string, string][] = [
    ["8", m.statActive],
    ["3", m.statAwaiting],
    ["2", m.statReturns],
    ["1", m.statCases],
  ];
  const attention: [string, string, "amber" | "red" | "green", string][] = [
    [m.sampleItem1, "R-2481", "amber", m.tagCustomerReview],
    [m.sampleItem2, "R-2395", "red", m.tagLate],
    [m.sampleItem3, "R-2440", "green", m.tagReturnTomorrow],
  ];
  return (
    <div className="phone flex flex-col gap-3 p-4" aria-hidden="true">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-[11.5px] text-ink-muted">{m.dashboardStore}</p>
          <p className="text-[17px] font-bold text-navy">{m.dashboardTitle}</p>
        </div>
        <MockChip tone="green">
          <MiniCheck /> {m.verifiedStore}
        </MockChip>
      </div>
      <div className="grid grid-cols-2 gap-2.5">
        {stats.map(([n, label], i) => (
          <div key={label} className="card px-3.5 py-3">
            <p className={`num text-2xl font-bold ${i === 1 ? "text-amber" : i === 3 ? "text-red" : "text-navy"}`}>{n}</p>
            <p className="mt-0.5 text-[11.5px] leading-snug text-ink-muted">{label}</p>
          </div>
        ))}
      </div>
      <MockButton variant="green">
        <span className="inline-flex items-center gap-2">
          <Icon name="plus" size={14} strokeWidth={2} /> {m.issueNew}
        </span>
      </MockButton>
      <p className="px-1 pt-1 text-xs font-bold text-navy">{m.needsAttention}</p>
      <div className="flex flex-col gap-2">
        {attention.map(([title, id, tone, tag]) => (
          <div key={id} className="card flex items-center justify-between gap-3 px-3.5 py-3">
            <div className="min-w-0">
              <p className="truncate text-[13px] font-semibold text-navy">{title}</p>
              <p className="num text-[11px] text-ink-muted">{id}</p>
            </div>
            <MockChip tone={tone}>{tag}</MockChip>
          </div>
        ))}
      </div>
    </div>
  );
}
