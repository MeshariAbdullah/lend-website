"use client";

import { useId, useRef, useState, type FormEvent } from "react";
import type { LeadFormCopy } from "@/content/types";
import type { Locale } from "@/lib/i18n";
import { limits, validateLead, type LeadErrorCode, type LeadErrors, type LeadField } from "@/lib/leads";
import { Icon } from "../Icon";
import { buttonClass } from "../ui";

type Status =
  | { kind: "idle" }
  | { kind: "submitting" }
  | { kind: "success" }
  | { kind: "error"; message: string };

type ApiResponse = { ok: true } | { ok: false; error: string; fields?: LeadErrors };

const emptyValues: Record<LeadField, string> = { business: "", contact: "", mobile: "", email: "", type: "", message: "" };

const inputClass = (invalid: boolean) =>
  `w-full rounded-control border-[1.5px] bg-white px-3.5 py-3 text-[15px] text-navy placeholder:text-ink-faint outline-none transition-colors focus:border-green focus:shadow-[0_0_0_3px_var(--color-tint-green)] ${
    invalid ? "border-red" : "border-control"
  }`;

export function LeadForm({
  copy,
  locale,
  onDone,
  autoFocus = false,
}: {
  copy: LeadFormCopy;
  locale: Locale;
  onDone: () => void;
  autoFocus?: boolean;
}) {
  const id = useId();
  const [values, setValues] = useState(emptyValues);
  const [errors, setErrors] = useState<LeadErrors>({});
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const formRef = useRef<HTMLFormElement>(null);

  const fieldId = (f: LeadField) => `${id}-${f}`;
  const errorId = (f: LeadField) => `${id}-${f}-error`;
  const errorText = (code: LeadErrorCode | undefined) => (code ? copy.errors[code] : "");

  const update = (f: LeadField, v: string) => {
    setValues((prev) => ({ ...prev, [f]: v }));
    if (errors[f]) setErrors((prev) => ({ ...prev, [f]: undefined }));
  };

  const focusFirstInvalid = (errs: LeadErrors) => {
    const first = (Object.keys(errs) as LeadField[]).find((f) => errs[f]);
    if (first) formRef.current?.querySelector<HTMLElement>(`#${CSS.escape(fieldId(first))}`)?.focus();
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status.kind === "submitting") return;

    const result = validateLead(values);
    if (!result.lead) {
      setErrors(result.errors);
      setStatus({ kind: "error", message: copy.errors.fixFields });
      focusFirstInvalid(result.errors);
      return;
    }

    setErrors({});
    setStatus({ kind: "submitting" });
    try {
      const form = formRef.current;
      const honeypot = (form?.elements.namedItem("website") as HTMLInputElement | null)?.value ?? "";
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, website: honeypot, locale, sourceUrl: window.location.href }),
      });
      const data = (await res.json().catch(() => null)) as ApiResponse | null;

      if (res.ok && data?.ok) {
        setValues(emptyValues);
        setStatus({ kind: "success" });
        return;
      }
      if (res.status === 400 && data && !data.ok && data.fields) {
        setErrors(data.fields);
        setStatus({ kind: "error", message: copy.errors.fixFields });
        focusFirstInvalid(data.fields);
        return;
      }
      if (res.status === 429) {
        setStatus({ kind: "error", message: copy.errors.rateLimited });
        return;
      }
      setStatus({ kind: "error", message: res.status === 503 ? copy.errors.unavailable : copy.errors.generic });
    } catch {
      setStatus({ kind: "error", message: copy.errors.generic });
    }
  };

  if (status.kind === "success") {
    return (
      <div role="status" aria-live="polite" className="flex flex-col items-start gap-4">
        <span className="grid size-12 place-items-center rounded-full bg-tint-green text-green-deep">
          <Icon name="check" size={24} strokeWidth={2} />
        </span>
        <div>
          <p className="text-lg font-bold text-navy">{copy.success.title}</p>
          <p className="mt-1.5 text-[15px] leading-body text-ink-body">{copy.success.body}</p>
        </div>
        <button type="button" onClick={onDone} className={buttonClass("secondary", "md", "mt-2")}>
          {copy.success.done}
        </button>
      </div>
    );
  }

  const submitting = status.kind === "submitting";

  const textField = (f: Exclude<LeadField, "type" | "message">, opts: { type?: string; inputMode?: "tel" | "email"; autoComplete?: string; dir?: "ltr" }) => (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={fieldId(f)} className="text-[13px] font-semibold text-navy">
        {copy.labels[f]} <span aria-hidden="true">*</span>
      </label>
      <input
        id={fieldId(f)}
        name={f}
        type={opts.type ?? "text"}
        inputMode={opts.inputMode}
        autoComplete={opts.autoComplete}
        dir={opts.dir}
        value={values[f]}
        onChange={(e) => update(f, e.target.value)}
        placeholder={copy.placeholders[f]}
        maxLength={limits[f]}
        required
        aria-required="true"
        aria-invalid={errors[f] ? "true" : undefined}
        aria-describedby={errors[f] ? errorId(f) : undefined}
        disabled={submitting}
        autoFocus={autoFocus && f === "business"}
        className={`${inputClass(!!errors[f])} ${opts.dir === "ltr" ? "text-start" : ""}`}
      />
      {errors[f] && (
        <p id={errorId(f)} className="text-[12.5px] text-red">
          {errorText(errors[f])}
        </p>
      )}
    </div>
  );

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate className="flex flex-col gap-4">
      {/* Honeypot: hidden from people and assistive tech; bots tend to fill it. */}
      <div aria-hidden="true" className="absolute -start-[9999px] top-auto h-px w-px overflow-hidden">
        <label htmlFor={`${id}-website`}>Website</label>
        <input id={`${id}-website`} name="website" type="text" tabIndex={-1} autoComplete="off" defaultValue="" />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {textField("business", { autoComplete: "organization" })}
        {textField("contact", { autoComplete: "name" })}
        {textField("mobile", { type: "tel", inputMode: "tel", autoComplete: "tel", dir: "ltr" })}
        {textField("email", { type: "email", inputMode: "email", autoComplete: "email", dir: "ltr" })}
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor={fieldId("type")} className="text-[13px] font-semibold text-navy">
          {copy.labels.type} <span aria-hidden="true">*</span>
        </label>
        <div className="relative">
          <select
            id={fieldId("type")}
            name="type"
            value={values.type}
            onChange={(e) => update("type", e.target.value)}
            required
            aria-required="true"
            aria-invalid={errors.type ? "true" : undefined}
            aria-describedby={errors.type ? errorId("type") : undefined}
            disabled={submitting}
            className={`${inputClass(!!errors.type)} appearance-none pe-10 ${values.type ? "" : "text-ink-faint"}`}
          >
            <option value="" disabled>
              {copy.typePlaceholder}
            </option>
            {copy.typeOptions.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
          <Icon name="chevron" size={14} className="pointer-events-none absolute end-3.5 top-1/2 -translate-y-1/2 rotate-90 text-ink-muted" />
        </div>
        {errors.type && (
          <p id={errorId("type")} className="text-[12.5px] text-red">
            {errorText(errors.type)}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor={fieldId("message")} className="text-[13px] font-semibold text-navy">
          {copy.labels.message} <span className="font-normal text-ink-muted">({copy.optional})</span>
        </label>
        <textarea
          id={fieldId("message")}
          name="message"
          rows={3}
          value={values.message}
          onChange={(e) => update("message", e.target.value)}
          placeholder={copy.placeholders.message}
          maxLength={limits.message}
          aria-invalid={errors.message ? "true" : undefined}
          aria-describedby={errors.message ? errorId("message") : undefined}
          disabled={submitting}
          className={`${inputClass(!!errors.message)} resize-y`}
        />
        {errors.message && (
          <p id={errorId("message")} className="text-[12.5px] text-red">
            {errorText(errors.message)}
          </p>
        )}
      </div>

      {status.kind === "error" && (
        <div role="alert" className="flex gap-2.5 rounded-[12px] border border-[#E7C2C2] bg-tint-red px-3.5 py-3 text-[13.5px] font-semibold text-red">
          <Icon name="alert" size={18} className="mt-0.5 shrink-0" />
          <p>{status.message}</p>
        </div>
      )}

      <div className="mt-1 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <button type="submit" disabled={submitting} aria-busy={submitting} className={buttonClass("green", "lg", "sm:min-w-44")}>
          {submitting && (
            <span aria-hidden="true" className="inline-block size-3.5 animate-spin rounded-full border-2 border-white/35 border-t-white" />
          )}
          {submitting ? copy.submitting : copy.submit}
        </button>
        <p className="text-xs text-ink-muted">{copy.requiredNote}</p>
      </div>
      <p className="text-xs text-ink-muted">{copy.privacy}</p>
    </form>
  );
}
