import { expect, test, type Page } from "@playwright/test";

/**
 * Functional smoke tests: every primary link and button on the site must lead
 * somewhere real. Runs against Arabic (/) and English (/en).
 */
const locales = [
  { code: "ar", home: "/", dir: "rtl", switchTo: "/en", privacy: "/privacy", terms: "/terms" },
  { code: "en", home: "/en", dir: "ltr", switchTo: "/", privacy: "/en/privacy", terms: "/en/terms" },
] as const;

const sections = ["top", "how", "customers", "business", "faq", "contact"] as const;

async function isInView(page: Page, id: string) {
  return page.evaluate((id) => {
    const el = document.getElementById(id);
    if (!el) return false;
    const r = el.getBoundingClientRect();
    return r.top >= -1 && r.top < window.innerHeight * 0.5;
  }, id);
}

async function openMobileMenuIfPresent(page: Page) {
  const toggle = page.getByRole("button", { name: /menu|القائمة/ });
  if (await toggle.isVisible()) {
    await toggle.click();
    await expect(page.locator("#mobile-nav")).toBeVisible();
    return true;
  }
  return false;
}

for (const l of locales) {
  test.describe(`${l.code} homepage`, () => {
    test("renders with the right language, direction and heading", async ({ page }) => {
      const response = await page.goto(l.home);
      expect(response?.status()).toBe(200);
      await expect(page.locator("html")).toHaveAttribute("lang", l.code);
      await expect(page.locator("html")).toHaveAttribute("dir", l.dir);
      await expect(page.locator("h1")).toHaveCount(1);
      for (const id of sections) await expect(page.locator(`#${id}`)).toHaveCount(1);
    });

    test("every in-page anchor points at an existing section", async ({ page }) => {
      await page.goto(l.home);
      const hashes = await page.$$eval("a[href*='#']", (as) =>
        as.map((a) => (a.getAttribute("href") ?? "").split("#")[1]).filter(Boolean),
      );
      expect(hashes.length).toBeGreaterThan(5);
      for (const id of new Set(hashes)) {
        await expect(page.locator(`#${id}`), `missing anchor target #${id}`).toHaveCount(1);
      }
    });

    test("every internal link resolves (no dead ends)", async ({ page, request }) => {
      await page.goto(l.home);
      const hrefs = await page.$$eval("a[href^='/']", (as) => as.map((a) => (a.getAttribute("href") ?? "").split("#")[0]));
      for (const href of new Set(hrefs.filter(Boolean))) {
        const res = await request.get(href);
        expect(res.status(), `dead link ${href}`).toBe(200);
      }
    });

    test("header navigation scrolls to each section and closes the mobile menu", async ({ page }) => {
      for (const id of ["how", "customers", "business", "faq"]) {
        await page.goto(l.home);
        const mobile = await openMobileMenuIfPresent(page);
        await page.locator(`header a[href='${l.home}#${id}']:visible`).first().click();
        await expect.poll(() => isInView(page, id), { timeout: 5000 }).toBe(true);
        await expect(page).toHaveURL(new RegExp(`#${id}$`));
        if (mobile) await expect(page.locator("#mobile-nav")).toBeHidden();
      }
    });

    test("hero CTAs scroll to how-it-works and the business section", async ({ page }) => {
      await page.goto(l.home);
      await page.locator(`#top a[href='${l.home}#how']`).click();
      await expect.poll(() => isInView(page, "how")).toBe(true);
      await page.goto(l.home);
      await page.locator(`#top a[href='${l.home}#business']`).click();
      await expect.poll(() => isInView(page, "business")).toBe(true);
    });

    test("business CTA opens the honest placeholder panel, closes with Escape, and submits nothing", async ({ page }) => {
      await page.goto(l.home);
      const trigger = page.locator("button[aria-controls='interest-panel']");
      const panel = page.locator("#interest-panel");
      await expect(panel).toBeHidden();
      await trigger.click();
      await expect(panel).toBeVisible();
      await expect(trigger).toHaveAttribute("aria-expanded", "true");
      await expect(panel).toBeFocused();
      expect(await panel.locator("form, input").count()).toBe(0);
      await page.keyboard.press("Escape");
      await expect(panel).toBeHidden();
      await expect(trigger).toBeFocused();
      await trigger.click();
      await panel.getByRole("button").last().click();
      await expect(panel).toBeHidden();
    });

    test("FAQ accordions toggle with mouse and keyboard", async ({ page }) => {
      await page.goto(l.home);
      const items = page.locator("details.faq");
      await expect(items).toHaveCount(8);
      const second = items.nth(1);
      await expect(second).not.toHaveAttribute("open", "");
      await second.locator("summary").click();
      await expect(second).toHaveAttribute("open", "");
      await second.locator("summary").focus();
      await page.keyboard.press("Enter");
      await expect(second).not.toHaveAttribute("open", "");
    });

    test("language switch keeps the current section", async ({ page }) => {
      await page.goto(`${l.home}#faq`);
      await page.locator("header a[hreflang]:visible").first().click();
      await page.waitForURL(new RegExp(`${l.switchTo === "/" ? "^http://[^/]+/" : l.switchTo}#faq$`));
      await expect(page.locator("html")).toHaveAttribute("lang", l.code === "ar" ? "en" : "ar");
      await expect(page.locator("html")).toHaveAttribute("dir", l.dir === "rtl" ? "ltr" : "rtl");
      await expect.poll(() => isInView(page, "faq")).toBe(true);
    });

    test("footer links reach the privacy, terms, and contact destinations", async ({ page }) => {
      await page.goto(l.home);
      await page.locator(`footer a[href='${l.privacy}']`).click();
      await expect(page).toHaveURL(new RegExp(`${l.privacy}$`));
      await expect(page.locator("h1")).toBeVisible();
      await page.goto(l.home);
      await page.locator(`footer a[href='${l.terms}']`).click();
      await expect(page).toHaveURL(new RegExp(`${l.terms}$`));
      await expect(page.locator("h1")).toBeVisible();
      await page.goto(l.home);
      await page.locator(`footer a[href='${l.home}#contact']`).click();
      await expect.poll(() => isInView(page, "contact")).toBe(true);
    });

    test("product mockups are illustrations, not controls", async ({ page }) => {
      await page.goto(l.home);
      expect(await page.locator("#product a, #product button, #product input").count()).toBe(0);
      expect(await page.locator("#product .phone[aria-hidden='true']").count()).toBe(5);
    });
  });

  test.describe(`${l.code} secondary pages`, () => {
    test("legal pages link back home and header links reach the homepage sections", async ({ page }) => {
      await page.goto(l.privacy);
      await expect(page.locator("h1")).toBeVisible();
      await openMobileMenuIfPresent(page);
      await page.locator(`header a[href='${l.home}#how']:visible`).first().click();
      await expect(page).toHaveURL(new RegExp(`${l.home === "/" ? "/" : l.home}#how$`));
      await expect.poll(() => isInView(page, "how")).toBe(true);
      await page.goto(l.terms);
      await page.locator(`main a[href='${l.home}']`).click();
      await expect(page).toHaveURL(new RegExp(`${l.home === "/" ? "^http://[^/]+/$" : `${l.home}$`}`));
    });

    test("unknown routes show the localized 404 with a working way back", async ({ page }) => {
      const response = await page.goto(`${l.home === "/" ? "" : l.home}/does-not-exist`);
      expect(response?.status()).toBe(404);
      await expect(page.locator("h1")).toBeVisible();
      await page.locator("main a").first().click();
      await expect(page.locator("#top")).toBeVisible();
    });
  });
}

test("Arabic is the root and /ar redirects to it", async ({ request }) => {
  const res = await request.get("/ar", { maxRedirects: 0 });
  expect(res.status()).toBe(308);
  expect(res.headers().location).toMatch(/\/$/);
});
