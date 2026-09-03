"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Icon } from "./Icon";
import { Logo } from "./Logo";
import { buttonClass } from "./ui";

export type NavLink = { href: string; label: string };

type Props = {
  homeHref: string;
  links: NavLink[];
  cta: NavLink;
  switchHref: string;
  switchLabel: string;
  switchTo: string;
  openMenu: string;
  closeMenu: string;
  brandName: string;
};

export function Header({ homeHref, links, cta, switchHref, switchLabel, switchTo, openMenu, closeMenu, brandName }: Props) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-beige/95 backdrop-blur-[2px]">
      <div className="mx-auto flex h-16 max-w-site items-center gap-4 px-5 sm:px-8 lg:h-[72px] lg:px-10">
        <Link href={homeHref} className="rounded-control shrink-0" aria-label={brandName}>
          <Logo markSize={32} label={brandName} />
        </Link>

        <nav aria-label="Primary" className="mx-auto hidden lg:block">
          <ul className="flex items-center gap-1">
            {links.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="inline-flex min-h-10 items-center rounded-control px-3.5 text-[15px] font-medium text-ink-body transition-colors hover:bg-white hover:text-navy"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="ms-auto flex items-center gap-2 lg:ms-0">
          <Link
            href={switchHref}
            hrefLang={switchHref.startsWith("/en") ? "en" : "ar"}
            aria-label={switchLabel}
            className="inline-flex min-h-10 items-center rounded-full border border-control bg-white px-3.5 text-sm font-semibold text-navy transition-colors hover:border-navy"
          >
            {switchTo}
          </Link>
          <span className="hidden sm:block">
            <Link href={cta.href} className={buttonClass("primary", "md")}>
              {cta.label}
            </Link>
          </span>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? closeMenu : openMenu}
            className="grid size-10 place-items-center rounded-control border border-control bg-white text-navy lg:hidden"
          >
            <Icon name={open ? "close" : "menu"} size={18} strokeWidth={1.8} />
          </button>
        </div>
      </div>

      <div id="mobile-nav" hidden={!open} className="border-t border-line bg-beige lg:hidden">
        <nav aria-label="Mobile" className="mx-auto max-w-site px-5 py-3 sm:px-8">
          <ul className="flex flex-col">
            {links.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="flex min-h-12 items-center rounded-control px-3 text-base font-medium text-navy hover:bg-white"
                >
                  {l.label}
                </Link>
              </li>
            ))}
            <li className="pt-2 sm:hidden">
              <Link href={cta.href} onClick={() => setOpen(false)} className={buttonClass("primary", "lg", "w-full")}>
                {cta.label}
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
