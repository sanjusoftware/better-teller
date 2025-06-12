// playwright.config.ts
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests/e2e', // Directory for E2E test files
  fullyParallel: true,    // Run tests in parallel
  forbidOnly: !!process.env.CI, // Fail the build on CI if you accidentally left test.only in the source code
  retries: process.env.CI ? 2 : 0, // Retry on CI only
  workers: process.env.CI ? 1 : undefined, // Opt out of parallel tests on CI.
  reporter: 'html',       // Reporter to use. See https://playwright.dev/docs/test-reporters
  use: {
    baseURL: 'http://localhost:5173', // Base URL for the SvelteKit dev server
    trace: 'on-first-retry', // Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },
    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },
  ],
  // Optionally, configure the web server if you want Playwright to start it automatically
  // webServer: {
  //   command: 'npm run dev', // Make sure this command starts your SvelteKit dev server
  //   url: 'http://localhost:5173',
  //   reuseExistingServer: !process.env.CI,
  //   timeout: 120 * 1000, // 2 minutes to start
  //   stdout: 'pipe', // Or 'ignore'
  //   stderr: 'pipe', // Or 'ignore'
  // },
});
