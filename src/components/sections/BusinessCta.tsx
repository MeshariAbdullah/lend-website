"use client";

import { useEffect, useRef, useState } from "react";
import type { SiteContent } from "@/content";
import { Icon } from "../Icon";
import { LogoMark } from "../Logo";
import { Container, buttonClass } from "../ui";

/**
 * Business CTA. There is no backend yet, so the button opens an honest
 * placeholder panel: nothing is submitted and no data is collected.
 */
export function BusinessCta({ c }: { c: SiteContent }) {
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const p = c.businessCta.placeholder;

  useEffect(() => {
    if (open) panelRef.current?.focus();
  }, [open]);

  return (
    <section id="contact" aria-labelledby="contact-title" className="pb-20 pt-4 lg:pb-28 xl:pb-32">
      <Container wide className="px-0 sm:px-8 lg:px-10">
        <div className="relative overflow-hidden bg-navy px-5 py-14 text-white sm:rounded-panel sm:px-10 sm:py-16 lg:rounded-[28px] lg:px-16 lg:py-20 xl:px-20">
          <LogoMark
            variant="onDark"
            size={560}
            className="pointer-events-none absolute -bottom-56 -start-40 opacity-[0.06] hidden lg:block"
          />
          <div className="relative grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div className="max-w-[640px]">
              <p className="eyebrow text-on-navy-green">{c.businessCta.eyebrow}</p>
              <h2 id="contact-title" className="mt-3 text-[1.75rem] font-bold leading-heading sm:text-[2.125rem] lg:text-[2.5rem]">
                {c.businessCta.title}
              </h2>
              <p className="mt-4 text-[1.0625rem] leading-body text-on-navy-muted lg:text-lg">{c.businessCta.body}</p>
              <div className="mt-8">
                <button
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
              tabIndex={-1}
              hidden={!open}
              role="region"
              aria-labelledby="interest-title"
              className="rounded-card bg-white p-6 text-navy shadow-modal outline-none sm:p-8"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span className="grid size-10 shrink-0 place-items-center rounded-full bg-tint-amber text-amber">
                    <Icon name="clock" size={20} />
                  </span>
                  <h3 id="interest-title" className="text-lg font-bold">
                    {p.title}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label={p.close}
                  className="grid size-9 shrink-0 place-items-center rounded-control bg-beige text-navy hover:bg-canvas"
                >
                  <Icon name="close" size={16} strokeWidth={1.8} />
                </button>
              </div>
              <p className="mt-4 text-[15px] leading-body text-ink-body">{p.body}</p>
              <p className="mt-5 text-sm font-semibold text-navy">{p.listTitle}</p>
              <ul className="mt-2 flex flex-col gap-2">
                {p.list.map((item) => (
                  <li key={item} className="flex items-center gap-2.5 text-[15px] text-ink-body">
                    <span className="size-1.5 rounded-full bg-green" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-5 text-sm text-ink-muted">{p.note}</p>
              <button type="button" onClick={() => setOpen(false)} className={buttonClass("secondary", "md", "mt-6 w-full sm:w-auto")}>
                {p.close}
              </button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
