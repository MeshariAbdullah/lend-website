import { defineConfig, devices } from "@playwright/test";

/**
 * Smoke tests for the marketing site. They build and start the production
 * server, then exercise every primary link and button in both languages.
 * Run with `npm run test:e2e` (browsers: `npx playwright install chromium`).
 */
const port = 3100;

export default defineConfig({
  testDir: "./tests",
  timeout: 30_000,
  fullyParallel: true,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? "github" : "list",
  use: {
    baseURL: `http://localhost:${port}`,
    trace: "retain-on-failure",
  },
  projects: [
    { name: "desktop", use: { ...devices["Desktop Chrome"], viewport: { width: 1280, height: 900 } } },
    { name: "tablet", use: { ...devices["Desktop Chrome"], viewport: { width: 820, height: 1100 } } },
    { name: "mobile", use: { ...devices["Pixel 7"] } },
  ],
  webServer: {
    command: `npm run build && npm run start -- -p ${port}`,
    url: `http://localhost:${port}/`,
    reuseExistingServer: !process.env.CI,
    timeout: 240_000,
    // Tests hit /api/leads from one IP across three projects; the limiter would trip.
    env: { LEADS_RATE_LIMIT: "off" },
  },
});
