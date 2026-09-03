import type { IconName } from "@/content/types";

const paths: Record<IconName, React.ReactNode> = {
  document: (
    <>
      <rect x="4" y="3" width="12" height="14" rx="2" />
      <path d="M7 7.5h6M7 10.5h6M7 13.5h4" />
    </>
  ),
  check: <path d="M4 10.5l3.5 3.5L16 6" />,
  location: (
    <>
      <path d="M10 17.5s5.5-4.9 5.5-9A5.5 5.5 0 0 0 4.5 8.5c0 4.1 5.5 9 5.5 9Z" />
      <circle cx="10" cy="8.5" r="1.9" />
    </>
  ),
  phone: (
    <>
      <rect x="5.5" y="2.5" width="9" height="15" rx="2" />
      <path d="M9 14.5h2" />
    </>
  ),
  lock: (
    <>
      <rect x="4.5" y="8.5" width="11" height="9" rx="2" />
      <path d="M7 8.5V6.5a3 3 0 0 1 6 0v2" />
      <circle cx="10" cy="13" r="1" />
    </>
  ),
  clock: (
    <>
      <circle cx="10" cy="10" r="7" />
      <path d="M10 6v4l2.5 1.5" />
    </>
  ),
  list: (
    <>
      <rect x="4" y="3" width="12" height="14" rx="2" />
      <path d="M7 7.5h6M7 10.5h6" />
    </>
  ),
  user: (
    <>
      <circle cx="10" cy="7" r="3.2" />
      <path d="M4 17c.7-3.2 3-5 6-5s5.3 1.8 6 5" />
    </>
  ),
  home: <path d="M3 9l7-6 7 6v7a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1Z" />,
  plus: <path d="M10 4v12M4 10h12" />,
  info: (
    <>
      <circle cx="10" cy="10" r="7" />
      <path d="M10 9v5M10 6.5v.5" />
    </>
  ),
  chevron: <path d="M8 4l5 6-5 6" />,
  arrow: <path d="M4 10h12M11 5l5 5-5 5" />,
  menu: <path d="M3 6h14M3 10h14M3 14h14" />,
  close: <path d="M5 5l10 10M15 5L5 15" />,
  camera: (
    <>
      <path d="M3 7.5A1.5 1.5 0 0 1 4.5 6h2l1.2-1.8h4.6L13.5 6h2A1.5 1.5 0 0 1 17 7.5v7A1.5 1.5 0 0 1 15.5 16h-11A1.5 1.5 0 0 1 3 14.5Z" />
      <circle cx="10" cy="11" r="2.6" />
    </>
  ),
  alert: (
    <>
      <path d="M10 3l7.5 13h-15Z" />
      <path d="M10 8v3.5M10 13.5v.5" />
    </>
  ),
  eye: (
    <>
      <path d="M2.5 10C4.6 6.4 7.2 5 10 5s5.4 1.4 7.5 5c-2.1 3.6-4.7 5-7.5 5s-5.4-1.4-7.5-5Z" />
      <circle cx="10" cy="10" r="2.3" />
    </>
  ),
  shield: (
    <>
      <path d="M10 2.5l6 2.2v5c0 3.7-2.5 6.5-6 7.8-3.5-1.3-6-4.1-6-7.8v-5Z" />
      <path d="M7.5 10l1.8 1.8L12.8 8" />
    </>
  ),
  layers: (
    <>
      <path d="M10 3l7 3.5-7 3.5-7-3.5Z" />
      <path d="M3 10l7 3.5 7-3.5M3 13.5L10 17l7-3.5" />
    </>
  ),
  store: (
    <>
      <path d="M3.5 8.5V16a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1V8.5" />
      <path d="M2.5 6l1.4-3h12.2l1.4 3c0 1.4-1.2 2.5-2.6 2.5S12.4 7.4 12.4 6c0 1.4-1 2.5-2.4 2.5S7.6 7.4 7.6 6c0 1.4-1.2 2.5-2.6 2.5S2.5 7.4 2.5 6Z" />
      <path d="M8 17v-4h4v4" />
    </>
  ),
  history: (
    <>
      <path d="M3.5 10a6.5 6.5 0 1 0 1.9-4.6" />
      <path d="M3.5 3.5v3.5H7M10 6.5V10l2.5 1.5" />
    </>
  ),
  route: (
    <>
      <circle cx="5" cy="5" r="2" />
      <circle cx="15" cy="15" r="2" />
      <path d="M7 5h5.5a2.5 2.5 0 0 1 0 5h-5a2.5 2.5 0 0 0 0 5H13" />
    </>
  ),
};

type Props = {
  name: IconName;
  className?: string;
  size?: number;
  strokeWidth?: number;
  /** Mirror directional icons in RTL. */
  mirror?: boolean;
};

export function Icon({ name, className = "", size = 20, strokeWidth = 1.7, mirror = false }: Props) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      className={`${mirror ? "rtl:-scale-x-100" : ""} ${className}`}
    >
      {paths[name]}
    </svg>
  );
}
