/**
 * Official Lend mark. Geometry is extracted 1:1 from the Lend Brand Guidelines
 * (public/brand/logo). The wordmark is typeset in Inter Bold with wide tracking,
 * exactly as the guidelines and the design system set it.
 */
type MarkProps = {
  size?: number;
  variant?: "primary" | "onDark" | "mono" | "monoWhite";
  className?: string;
};

const palette = {
  primary: { top: "#1B2951", bottom: "#12A67E", dot: "#1B2951" },
  onDark: { top: "#FFFFFF", bottom: "#12A67E", dot: "#FFFFFF" },
  mono: { top: "#1B2951", bottom: "#1B2951", dot: "#1B2951" },
  monoWhite: { top: "#FFFFFF", bottom: "#FFFFFF", dot: "#FFFFFF" },
};

export function LogoMark({ size = 32, variant = "primary", className = "" }: MarkProps) {
  const c = palette[variant];
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 80 80"
      fill="none"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      <path d="M5 40C5 16.667 16.667 5 40 5C63.333 5 75 16.667 75 40" stroke={c.top} strokeWidth="8.75" strokeLinecap="round" />
      <path d="M75 40C75 63.333 63.333 75 40 75C16.667 75 5 63.333 5 40" stroke={c.bottom} strokeWidth="8.75" strokeLinecap="round" />
      <circle cx="40" cy="40" r="7" fill={c.dot} />
    </svg>
  );
}

type LogoProps = {
  variant?: "primary" | "onDark";
  markSize?: number;
  className?: string;
  label?: string;
};

export function Logo({ variant = "primary", markSize = 32, className = "", label = "Lend" }: LogoProps) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`} role="img" aria-label={label}>
      <LogoMark size={markSize} variant={variant} />
      <span
        dir="ltr"
        className={`font-sans font-bold tracking-[0.35em] leading-none ${variant === "onDark" ? "text-white" : "text-navy"}`}
        style={{ fontSize: Math.round(markSize * 0.56), marginInlineEnd: "-0.35em" }}
        aria-hidden="true"
      >
        LEND
      </span>
    </span>
  );
}
