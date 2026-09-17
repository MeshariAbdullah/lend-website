"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Icon } from "./Icon";
import { Logo } from "./Logo";
import { buttonClass } from "./ui";

export type NavLink = { href: string; label: string };

/**
 * Section links ("/#how") are plain anchors so the browser handles the
 * fragment scroll itself; only real page links go through the Next.js router.
 */
function NavAnchor({
  href,
  className,
  onClick,
  children,
}: {
  href: string;
  className: string;
  onClick?: () => void;
  children: React.ReactNode;
}) {
  if (href.includes("#") || href.startsWith("http")) {
    return (
      <a href={href} onClick={onClick} className={className}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} onClick={onClick} className={className}>
      {children}
    </Link>
  );
}

type Props = {
  homeHref: string;
  links: NavLink[];
  cta: NavLink;
  /** External merchant portal link; opens in the same tab. */
  merchantLogin: NavLink;
  switchHref: string;
  switchLabel: string;
  switchTo: string;
  openMenu: string;
  closeMenu: string;
  brandName: string;
};

export function Header({
  homeHref,
  links,
  cta,
  merchantLogin,
  switchHref,
  switchLabel,
  switchTo,
  openMenu,
  closeMenu,
  brandName,
}: Props) {
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  /**
   * Switching language keeps the reader on the same section: the current
   * hash is appended at click time, since hashes never reach the server and
   * cannot be known during render. A full document navigation is deliberate:
   * the page language, direction and fonts are rebuilt from scratch, and the
   * browser lands on the hash. The plain href stays correct for crawlers and
   * for opening in a new tab.
   */
  const onSwitch = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
    e.preventDefault();
    const destination = new URL(`${switchHref}${window.location.hash}`, window.location.origin);
    window.location.assign(destination.href);
  };

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-beige/95 backdrop-blur-[2px]">
      <div className="mx-auto flex h-16 max-w-site items-center gap-4 px-5 sm:px-8 lg:h-[72px] lg:px-10">
        <Link href={homeHref} className="rounded-control shrink-0" aria-label={brandName}>
          <Logo markSize={32} label={brandName} />
        </Link>

        <nav aria-label="Primary" className="mx-auto hidden xl:block">
          <ul className="flex items-center gap-1">
            {links.map((l) => (
              <li key={l.href}>
                <NavAnchor
                  href={l.href}
                  className="inline-flex min-h-10 items-center whitespace-nowrap rounded-control px-3.5 text-[15px] font-medium text-ink-body transition-colors hover:bg-white hover:text-navy"
                >
                  {l.label}
                </NavAnchor>
              </li>
            ))}
          </ul>
        </nav>

        <div className="ms-auto flex shrink-0 items-center gap-2 xl:ms-0">
          <Link
            href={switchHref}
            hrefLang={switchHref.startsWith("/en") ? "en" : "ar"}
            aria-label={switchLabel}
            onClick={onSwitch}
            className="inline-flex min-h-10 items-center whitespace-nowrap rounded-full border border-control bg-white px-3.5 text-sm font-semibold text-navy transition-colors hover:border-navy"
          >
            {switchTo}
          </Link>
          <span className="hidden md:block">
            <NavAnchor href={merchantLogin.href} className={buttonClass("secondary", "md", "whitespace-nowrap")}>
              {merchantLogin.label}
            </NavAnchor>
          </span>
          <span className="hidden sm:block">
            <NavAnchor href={cta.href} className={buttonClass("primary", "md", "whitespace-nowrap")}>
              {cta.label}
            </NavAnchor>
          </span>
          <button
            ref={toggleRef}
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? closeMenu : openMenu}
            className="grid size-10 place-items-center rounded-control border border-control bg-white text-navy xl:hidden"
          >
            <Icon name={open ? "close" : "menu"} size={18} strokeWidth={1.8} />
          </button>
        </div>
      </div>

      <div id="mobile-nav" hidden={!open} className="border-t border-line bg-beige xl:hidden">
        <nav aria-label="Mobile" className="mx-auto max-w-site px-5 py-3 sm:px-8">
          <ul className="flex flex-col">
            {links.map((l) => (
              <li key={l.href}>
                <NavAnchor
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="flex min-h-12 items-center rounded-control px-3 text-base font-medium text-navy hover:bg-white"
                >
                  {l.label}
                </NavAnchor>
              </li>
            ))}
            <li className="pt-2 md:hidden">
              <NavAnchor href={merchantLogin.href} onClick={() => setOpen(false)} className={buttonClass("secondary", "lg", "w-full")}>
                {merchantLogin.label}
              </NavAnchor>
            </li>
            <li className="pt-2 sm:hidden">
              <NavAnchor href={cta.href} onClick={() => setOpen(false)} className={buttonClass("primary", "lg", "w-full")}>
                {cta.label}
              </NavAnchor>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
