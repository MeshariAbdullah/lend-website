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

    test("no header link opens the 404 page, on the home page or from a legal page", async ({ page }) => {
      const notFoundTitles = ["الصفحة غير موجودة", "Page not found"];
      for (const start of [l.home, l.privacy]) {
        await page.goto(start);
        const hrefs = await page.$$eval("header a[href]", (as) =>
          as.map((a) => a.getAttribute("href") ?? "").filter((h) => h.startsWith("/")),
        );
        expect(hrefs.length).toBeGreaterThanOrEqual(8);
        for (const href of new Set(hrefs)) {
          await page.goto(start);
          await openMobileMenuIfPresent(page);
          const link = page.locator(`header a[href='${href}']:visible`).first();
          await link.click();
          await page.waitForLoadState("load");
          await expect(page.locator("h1").first(), `${href} from ${start}`).not.toHaveText(notFoundTitles);
          const id = href.split("#")[1];
          if (id) await expect.poll(() => isInView(page, id), { timeout: 5000 }).toBe(true);
          else await expect(page).toHaveURL(new RegExp(`${href === "/" ? "^http://[^/]+/$" : `${href}$`}`));
        }
      }
    });

    test("logo and home link go to the locale home page", async ({ page }) => {
      await page.goto(l.privacy);
      await page.locator("header a").first().click();
      await expect(page).toHaveURL(new RegExp(l.home === "/" ? "^http://[^/]+/$" : `${l.home}$`));
      await expect(page.locator("#top")).toBeVisible();
      await page.goto(l.privacy);
      await openMobileMenuIfPresent(page);
      await page.locator(`header nav a[href='${l.home}']:visible`).first().click();
      await expect(page).toHaveURL(new RegExp(l.home === "/" ? "^http://[^/]+/$" : `${l.home}$`));
      await expect(page.locator("#top")).toBeVisible();
    });

    test("merchant login links point at the business portal in the same tab", async ({ page }) => {
      await page.goto(l.home);
      const portal = "https://business.lend.sa";
      const label = l.code === "ar" ? "دخول التجار" : "Merchant Login";
      await openMobileMenuIfPresent(page);
      const header = page.locator(`header a[href='${portal}']:visible`);
      await expect(header.first()).toBeVisible();
      await expect(header.first()).toHaveText(label);
      for (const a of await page.locator(`a[href='${portal}']`).all()) {
        expect(await a.getAttribute("target"), "must open in the same tab").toBeNull();
      }
      await expect(page.locator(`#business a[href='${portal}']`)).toHaveText(label);
      await expect(page.locator(`#contact a[href='${portal}']`)).toHaveText(label);
      // The existing interest CTA is untouched.
      await expect(page.locator(`#business a[href='${l.home}#contact']`)).toHaveCount(1);
    });

    test("hero CTAs scroll to how-it-works and the business section", async ({ page }) => {
      await page.goto(l.home);
      await page.locator(`#top a[href='${l.home}#how']`).click();
      await expect.poll(() => isInView(page, "how")).toBe(true);
      await page.goto(l.home);
      await page.locator(`#top a[href='${l.home}#business']`).click();
      await expect.poll(() => isInView(page, "business")).toBe(true);
    });

    test("business CTA opens the interest form, closes with Escape, and returns focus", async ({ page }) => {
      await page.goto(l.home);
      const trigger = page.locator("button[aria-controls='interest-panel']");
      const panel = page.locator("#interest-panel");
      await expect(panel).toBeHidden();
      await trigger.click();
      await expect(panel).toBeVisible();
      await expect(trigger).toHaveAttribute("aria-expanded", "true");
      await expect(panel.locator("form")).toBeVisible();
      await expect(panel.locator("input[name='business']")).toBeFocused();
      for (const name of ["business", "contact", "mobile", "email", "type", "message"]) {
        const field = panel.locator(`[name='${name}']`);
        await expect(field, `field ${name}`).toBeVisible();
        const id = await field.getAttribute("id");
        await expect(panel.locator(`label[for='${id}']`), `label for ${name}`).toHaveCount(1);
      }
      await page.keyboard.press("Escape");
      await expect(panel).toBeHidden();
      await expect(trigger).toBeFocused();
      await trigger.click();
      await panel.getByRole("button", { name: /close|إغلاق/i }).click();
      await expect(panel).toBeHidden();
      await expect(trigger).toBeFocused();
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

    test("privacy policy is a real, public, complete document", async ({ page }) => {
      const response = await page.goto(l.privacy);
      expect(response?.status()).toBe(200);
      await expect(page).toHaveTitle(/سياسة الخصوصية|Privacy Policy/);
      await expect(page.locator("html")).toHaveAttribute("dir", l.dir);
      await expect(page.locator("h1")).toHaveText(/سياسة الخصوصية|Privacy Policy/);
      expect(await page.locator("article h2").count()).toBeGreaterThanOrEqual(10);
      await expect(page.locator("article time[datetime]")).toHaveCount(1);
      const mail = page.locator("a[href^='mailto:']");
      await expect(mail).toHaveCount(1);
      await expect(mail).toHaveText("support@lend.sa");
      const body = (await page.locator("article").innerText()).toLowerCase();
      for (const forbidden of ["lorem", "placeholder", "todo", "نفاذ", "nafath", "nafith", "هذه الصفحة مؤقتة", "نعمل على إعداد النسخة النهائية", "we are finalizing"]) {
        expect(body, `privacy page must not contain "${forbidden}"`).not.toContain(forbidden);
      }
      const robots = page.locator("meta[name='robots']");
      if (await robots.count()) await expect(robots).not.toHaveAttribute("content", /noindex/);
      await expect(page.locator("link[rel='canonical']")).toHaveAttribute("href", new RegExp(`${l.privacy}$`));
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
      // Table of contents anchors resolve (wide screens only).
      const toc = page.locator("nav[aria-label] a[href^='#']");
      if (await toc.first().isVisible()) {
        const ids = await toc.evaluateAll((as) => as.map((a) => (a.getAttribute("href") ?? "").slice(1)));
        for (const id of ids) await expect(page.locator(`section#${id}`)).toHaveCount(1);
      }
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
