/**
 * The four-stage rental timeline from the design system.
 * Done = deep green + check · current = green ring · upcoming = grey.
 * Flows right→left in Arabic automatically (flex follows document direction).
 */
export function StageTimeline({
  stages,
  current,
  compact = false,
}: {
  stages: string[];
  current: number; // 1-based index of the current stage
  compact?: boolean;
}) {
  return (
    <ol className="flex items-start" aria-label={stages.join(" → ")}>
      {stages.map((label, i) => {
        const n = i + 1;
        const done = n < current;
        const isCurrent = n === current;
        return (
          <li key={label} className="contents">
            <div className="flex flex-1 flex-col items-center gap-1.5">
              {done ? (
                <span className={`grid ${compact ? "size-6" : "size-8"} place-items-center rounded-full bg-green-deep text-white`} aria-hidden="true">
                  <svg width={compact ? 10 : 14} height={compact ? 10 : 14} viewBox="0 0 12 12" fill="none">
                    <path d="M2 6.5L4.8 9.2 10 3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              ) : isCurrent ? (
                <span
                  className={`grid ${compact ? "size-6 text-[11px]" : "size-8 text-[13px]"} place-items-center rounded-full border-[3px] border-green bg-white font-bold text-green-deep num`}
                  aria-current="step"
                >
                  {n}
                </span>
              ) : (
                <span
                  className={`grid ${compact ? "size-6 text-[11px]" : "size-8 text-[13px]"} place-items-center rounded-full border-[1.5px] border-control bg-white font-semibold text-ink-faint num`}
                >
                  {n}
                </span>
              )}
              {!compact && (
                <span
                  className={`text-center text-[11px] leading-[1.35] ${
                    isCurrent ? "font-bold text-green-deep" : done ? "font-semibold text-navy" : "font-medium text-ink-faint"
                  }`}
                >
                  {label}
                </span>
              )}
            </div>
            {i < stages.length - 1 && (
              <div
                aria-hidden="true"
                className={`h-[3px] flex-[0.6] rounded-sm ${compact ? "mt-[10px]" : "mt-[15px]"} ${
                  n < current ? "bg-green-deep" : "bg-[#E5E7EF]"
                }`}
              />
            )}
          </li>
        );
      })}
    </ol>
  );
}
