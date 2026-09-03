import type { ReactNode } from "react";
import { Icon } from "../Icon";

/** App top bar as in the customer screens: back tile + title + optional chip. */
export function ScreenBar({ title, trailing }: { title: ReactNode; trailing?: ReactNode }) {
  return (
    <div className="flex items-center gap-3 px-4 pt-4 pb-2">
      <span className="grid size-9 shrink-0 place-items-center rounded-control bg-white text-navy" aria-hidden="true">
        <Icon name="chevron" size={14} strokeWidth={1.8} mirror />
      </span>
      <div className="flex-1 truncate text-[15px] font-bold text-navy">{title}</div>
      {trailing}
    </div>
  );
}

export function Row({ label, value, strong = true, ltr = false }: { label: string; value: ReactNode; strong?: boolean; ltr?: boolean }) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-line-soft py-2.5 last:border-b-0">
      <span className="text-xs text-ink-muted">{label}</span>
      <span className={`text-[13px] text-navy ${strong ? "font-semibold" : ""} ${ltr ? "num" : ""}`}>{value}</span>
    </div>
  );
}

export function MockButton({ children, variant = "primary" }: { children: ReactNode; variant?: "primary" | "secondary" | "green" | "red" | "ghost" }) {
  const styles = {
    primary: "bg-navy text-white",
    secondary: "bg-white text-navy border-[1.5px] border-navy",
    green: "bg-green text-white",
    red: "bg-red text-white",
    ghost: "text-green-deep",
  }[variant];
  return (
    <div className={`grid min-h-11 place-items-center rounded-control px-4 text-[13.5px] font-semibold ${styles}`} aria-hidden="true">
      {children}
    </div>
  );
}

export function ActivityRow({ text, time, tone = "green" }: { text: string; time: string; tone?: "green" | "amber" }) {
  return (
    <div className="flex items-center gap-3 border-b border-line-soft py-2.5 last:border-b-0">
      <span className={`size-2 shrink-0 rounded-full ${tone === "green" ? "bg-green" : "bg-amber"}`} aria-hidden="true" />
      <span className={`flex-1 text-[12.5px] ${tone === "amber" ? "font-semibold text-amber" : "text-navy"}`}>{text}</span>
      <span className="num text-[11px] text-ink-faint">{time}</span>
    </div>
  );
}

export function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`card p-4 ${className}`}>{children}</div>;
}

export function MockChip({ children, tone }: { children: ReactNode; tone: "green" | "amber" | "red" | "navy" }) {
  const t = {
    green: "bg-tint-green text-green-deep",
    amber: "bg-tint-amber text-amber",
    red: "bg-tint-red text-red",
    navy: "bg-tint-navy text-navy",
  }[tone];
  return <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-semibold ${t}`}>{children}</span>;
}

export function MiniCheck({ className = "" }: { className?: string }) {
  return (
    <svg width="10" height="10" viewBox="0 0 12 12" fill="none" aria-hidden="true" className={className}>
      <path d="M2 6.5L4.8 9.2 10 3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
