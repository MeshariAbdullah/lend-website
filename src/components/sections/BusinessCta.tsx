"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { SiteContent } from "@/content";
import type { Locale } from "@/lib/i18n";
import { Icon } from "../Icon";
import { LogoMark } from "../Logo";
import { Container, buttonClass } from "../ui";
import { LeadForm } from "./LeadForm";

/**
 * Business CTA. The button opens an inline panel holding the real
 * business-interest form, which posts to /api/leads.
 */
export function BusinessCta({ c, locale }: { c: SiteContent; locale: Locale }) {
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const copy = c.businessCta.form;

  const close = useCallback(() => {
    setOpen(false);
    triggerRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, close]);

  return (
    <section id="contact" aria-labelledby="contact-title" className="pb-20 pt-4 lg:pb-28 xl:pb-32">
      <Container wide className="px-0 sm:px-8 lg:px-10">
        <div className="relative overflow-hidden bg-navy px-5 py-14 text-white sm:rounded-panel sm:px-10 sm:py-16 lg:rounded-[28px] lg:px-16 lg:py-20 xl:px-20">
          <LogoMark
            variant="onDark"
            size={560}
            className="pointer-events-none absolute -bottom-56 -start-40 opacity-[0.06] hidden lg:block"
          />
          <div className={`relative grid gap-10 ${open ? "lg:grid-cols-[0.8fr_1.2fr]" : "lg:grid-cols-[1.1fr_0.9fr]"} lg:items-start`}>
            <div className="max-w-[640px]">
              <p className="eyebrow text-on-navy-green">{c.businessCta.eyebrow}</p>
              <h2 id="contact-title" className="mt-3 text-[1.75rem] font-bold leading-heading sm:text-[2.125rem] lg:text-[2.5rem]">
                {c.businessCta.title}
              </h2>
              <p className="mt-4 text-[1.0625rem] leading-body text-on-navy-muted lg:text-lg">{c.businessCta.body}</p>
              <div className="mt-8">
                <button
                  ref={triggerRef}
                  type="button"
                  onClick={() => setOpen(true)}
                  aria-expanded={open}
                  aria-controls="interest-panel"
                  className={buttonClass("green", "lg")}
                >
                  {c.businessCta.cta}
                  <Icon name="arrow" size={18} mirror />
                </button>
              </div>
            </div>

            <div
              id="interest-panel"
              ref={panelRef}
              hidden={!open}
              role="region"
              aria-labelledby="interest-title"
              className="relative rounded-card bg-white p-6 text-navy shadow-modal sm:p-8"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 id="interest-title" className="text-lg font-bold">
                    {copy.title}
                  </h3>
                  <p className="mt-1 text-[14px] leading-body text-ink-body">{copy.intro}</p>
                </div>
                <button
                  type="button"
                  onClick={close}
                  aria-label={copy.close}
                  className="grid size-9 shrink-0 place-items-center rounded-control bg-beige text-navy hover:bg-canvas"
                >
                  <Icon name="close" size={16} strokeWidth={1.8} />
                </button>
              </div>
              <div className="mt-6">
                {/* Remount on each open so a fresh form starts from a clean state. */}
                {open && <LeadForm copy={copy} locale={locale} onDone={close} autoFocus />}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
