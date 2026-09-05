import { expect, test, type Page } from "@playwright/test";

/**
 * Business-interest form: validation, controlled failure when the email
 * provider is not configured (the test server has no RESEND_API_KEY), and a
 * mocked success path. No real email is ever sent from these tests.
 */
const locales = [
  {
    code: "ar",
    home: "/",
    required: "هذا الحقل مطلوب.",
    email: "أدخل بريدًا إلكترونيًا صحيحًا.",
    mobile: "أدخل رقم جوال سعودي صحيح",
    unavailable: "تعذر إرسال الطلب حاليًا. يرجى المحاولة لاحقًا.",
    success: "تم إرسال طلبك بنجاح.",
  },
  {
    code: "en",
    home: "/en",
    required: "This field is required.",
    email: "Enter a valid email address.",
    mobile: "Enter a valid Saudi mobile number",
    unavailable: "Submission is temporarily unavailable. Please try again later.",
    success: "Your request has been sent successfully.",
  },
] as const;

const valid = {
  business: "Durrat Al-Anaqa",
  contact: "Khalid Alotaibi",
  mobile: "055 812 4471",
  email: "khalid@example.com",
  type: "dresses",
  message: "Three branches in Riyadh.",
};

async function openForm(page: Page, home: string) {
  await page.goto(home);
  await page.locator("button[aria-controls='interest-panel']").click();
  const panel = page.locator("#interest-panel");
  await expect(panel.locator("form")).toBeVisible();
  return panel;
}

async function fill(panel: ReturnType<Page["locator"]>, values: Partial<typeof valid>) {
  for (const [name, value] of Object.entries(values)) {
    if (name === "type") await panel.locator("select[name='type']").selectOption(value);
    else await panel.locator(`[name='${name}']`).fill(value);
  }
}

for (const l of locales) {
  test.describe(`${l.code} business interest form`, () => {
    test("required fields are validated before anything is sent", async ({ page }) => {
      let requests = 0;
      await page.route("**/api/leads", (route) => {
        requests += 1;
        return route.continue();
      });
      const panel = await openForm(page, l.home);
      await panel.getByRole("button", { name: /أرسل الطلب|Send request/ }).click();
      await expect(panel.getByText(l.required)).toHaveCount(5);
      await expect(panel.locator("input[name='business']")).toBeFocused();
      await expect(panel.locator("input[name='business']")).toHaveAttribute("aria-invalid", "true");
      expect(requests).toBe(0);
    });

    test("invalid email and mobile are rejected with clear messages", async ({ page }) => {
      const panel = await openForm(page, l.home);
      await fill(panel, { ...valid, email: "not-an-email", mobile: "12345" });
      await panel.getByRole("button", { name: /أرسل الطلب|Send request/ }).click();
      await expect(panel.getByText(l.email)).toBeVisible();
      await expect(panel.getByText(l.mobile)).toBeVisible();
      await expect(panel.locator("input[name='email']")).toHaveValue("not-an-email");
    });

    test("missing email provider shows a controlled error and never fakes success", async ({ page }) => {
      const panel = await openForm(page, l.home);
      await fill(panel, valid);
      const response = page.waitForResponse("**/api/leads");
      await panel.getByRole("button", { name: /أرسل الطلب|Send request/ }).click();
      expect((await response).status()).toBe(503);
      await expect(panel.getByRole("alert")).toContainText(l.unavailable);
      await expect(panel.getByText(l.success)).toHaveCount(0);
      await expect(panel.locator("input[name='business']")).toHaveValue(valid.business);
      await expect(panel.locator("input[name='email']")).toHaveValue(valid.email);
      await expect(panel.getByRole("button", { name: /أرسل الطلب|Send request/ })).toBeEnabled();
    });

    test("successful submission (mocked provider) shows the success state and clears the form", async ({ page }) => {
      let payload: Record<string, unknown> = {};
      await page.route("**/api/leads", async (route) => {
        payload = route.request().postDataJSON() as Record<string, unknown>;
        await route.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify({ ok: true }) });
      });
      const panel = await openForm(page, l.home);
      await fill(panel, valid);
      await panel.getByRole("button", { name: /أرسل الطلب|Send request/ }).click();
      await expect(panel.getByRole("status")).toContainText(l.success);
      expect(payload.locale).toBe(l.code);
      expect(payload.business).toBe(valid.business);
      expect(payload.website).toBe("");
      await panel.getByRole("button", { name: /تم|Done/ }).click();
      await expect(panel).toBeHidden();
      await page.locator("button[aria-controls='interest-panel']").click();
      await expect(panel.locator("input[name='business']")).toHaveValue("");
    });
  });
}

test.describe("POST /api/leads", () => {
  test("rejects invalid payloads with per-field codes", async ({ request }) => {
    const res = await request.post("/api/leads", { data: { email: "nope", mobile: "1", type: "spaceships" } });
    expect(res.status()).toBe(400);
    const body = await res.json();
    expect(body.ok).toBe(false);
    expect(body.fields).toMatchObject({ business: "required", contact: "required", email: "email", mobile: "mobile", type: "type" });
  });

  test("rejects malformed JSON", async ({ request }) => {
    const res = await request.post("/api/leads", { data: "not json", headers: { "Content-Type": "application/json" } });
    expect(res.status()).toBe(400);
  });

  test("returns 503 not_configured when the email provider is missing", async ({ request }) => {
    const res = await request.post("/api/leads", { data: { ...valid, locale: "ar" } });
    expect(res.status()).toBe(503);
    expect(await res.json()).toEqual({ ok: false, error: "not_configured" });
  });

  test("drops honeypot submissions quietly", async ({ request }) => {
    const res = await request.post("/api/leads", { data: { ...valid, website: "http://spam.example" } });
    expect(res.status()).toBe(200);
  });

  test("accepts Saudi mobile formats and normalizes them", async ({ request }) => {
    for (const mobile of ["0558124471", "+966 55 812 4471", "00966558124471", "558124471", "٠٥٥٨١٢٤٤٧١"]) {
      const res = await request.post("/api/leads", { data: { ...valid, mobile } });
      expect(res.status(), `mobile ${mobile} should pass validation`).toBe(503);
    }
    const bad = await request.post("/api/leads", { data: { ...valid, mobile: "0112345678" } });
    expect(bad.status()).toBe(400);
  });
});
