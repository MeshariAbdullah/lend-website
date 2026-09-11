import Link from "next/link";
import type { ReactNode } from "react";

export function Container({
  children,
  className = "",
  wide = false,
}: {
  children: ReactNode;
  className?: string;
  wide?: boolean;
}) {
  return (
    <div className={`mx-auto w-full px-5 sm:px-8 lg:px-10 ${wide ? "max-w-wide" : "max-w-site"} ${className}`}>
      {children}
    </div>
  );
}

type ButtonVariant = "primary" | "secondary" | "green" | "onDark" | "tertiary";

const buttonBase =
  "inline-flex items-center justify-center gap-2 rounded-control font-semibold transition-colors duration-150 select-none focus-visible:shadow-[0_0_0_3px_var(--color-focus)] disabled:opacity-50";

const buttonSizes = {
  md: "min-h-11 px-5 text-[15px]",
  lg: "min-h-12 px-6 text-base",
};

const buttonVariants: Record<ButtonVariant, string> = {
  primary: "bg-navy text-white hover:bg-navy-hover active:bg-navy-pressed",
  secondary: "bg-white text-navy border-[1.5px] border-navy hover:bg-tint-navy active:bg-[#E3E9F4]",
  green: "bg-green text-white hover:bg-[#0F9A74] active:bg-green-deep",
  onDark: "bg-white text-navy hover:bg-beige active:bg-canvas",
  tertiary: "bg-transparent text-green-deep hover:underline underline-offset-4 px-2",
};

export function buttonClass(variant: ButtonVariant = "primary", size: "md" | "lg" = "md", extra = "") {
  return `${buttonBase} ${buttonSizes[size]} ${buttonVariants[variant]} ${extra}`;
}

export function ButtonLink({
  href,
  children,
  variant = "primary",
  size = "md",
  className = "",
}: {
  href: string;
  children: ReactNode;
  variant?: ButtonVariant;
  size?: "md" | "lg";
  className?: string;
}) {
  // In-page fragment links are plain anchors: the browser scrolls, no route navigation happens.
  if (href.includes("#")) {
    return (
      <a href={href} className={buttonClass(variant, size, className)}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={buttonClass(variant, size, className)}>
      {children}
    </Link>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "start",
  onDark = false,
  as: Tag = "h2",
  className = "",
}: {
  eyebrow: string;
  title: string;
  intro?: string;
  align?: "start" | "center";
  onDark?: boolean;
  as?: "h1" | "h2";
  className?: string;
}) {
  return (
    <div className={`${align === "center" ? "text-center mx-auto" : ""} max-w-[720px] ${className}`}>
      <p className={`eyebrow ${onDark ? "text-on-navy-green" : ""}`}>{eyebrow}</p>
      <Tag
        className={`mt-3 text-[1.75rem] sm:text-[2.125rem] lg:text-[2.5rem] font-bold leading-heading tracking-[-0.01em] ${
          onDark ? "text-white" : "text-navy"
        }`}
      >
        {title}
      </Tag>
      {intro ? (
        <p className={`mt-4 text-[1.0625rem] lg:text-lg leading-body ${onDark ? "text-on-navy-muted" : "text-ink-body"}`}>
          {intro}
        </p>
      ) : null}
    </div>
  );
}

type ChipTone = "green" | "amber" | "red" | "navy" | "neutral";
const chipTones: Record<ChipTone, string> = {
  green: "bg-tint-green text-green-deep",
  amber: "bg-tint-amber text-amber",
  red: "bg-tint-red text-red",
  navy: "bg-tint-navy text-navy",
  neutral: "bg-beige text-ink-muted",
};

export function Chip({
  children,
  tone = "neutral",
  className = "",
}: {
  children: ReactNode;
  tone?: ChipTone;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold leading-5 whitespace-nowrap ${chipTones[tone]} ${className}`}
    >
      {children}
    </span>
  );
}

export function CheckDot({ size = 22, className = "" }: { size?: number; className?: string }) {
  return (
    <span
      className={`inline-grid place-items-center rounded-full bg-green-deep text-white shrink-0 ${className}`}
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      <svg width={size * 0.5} height={size * 0.5} viewBox="0 0 12 12" fill="none">
        <path d="M2 6.5L4.8 9.2 10 3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}
