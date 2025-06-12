import { test, expect } from '@playwright/test';

test.describe('Authentication', () => {
  test('should navigate to signin page and attempt DSK ID login', async ({ page }) => {
    // Navigate to the sign-in page
    await page.goto('/signin');

    // Check if the main login card title is visible (using a key from i18n, assuming default 'en' locale)
    // The exact text might depend on the default language Playwright's browser picks up
    // or if the baseURL serves a specific language.
    // For robustness, could use a test ID if available, or a regex for partial match.
    // Using the English key's value for now as a baseline.
    await expect(page.getByRole('heading', { name: "Login to access the portal" })).toBeVisible();

    // Check if the main login button is visible
    // Using a partial text match for the button name to be more resilient to exact i18n outputs during test
    // This text comes from $_('login.dskIdButton')
    const loginButton = page.getByRole('button', { name: /Login in with your DSK ID/i });
    await expect(loginButton).toBeVisible();

    // Click the DSK ID login button
    await loginButton.click();

    // Assertion: Check that the URL changes or is about to change,
    // indicating an attempt to navigate to an external provider or a different state.
    // This is a basic check. A more advanced test might mock the redirect or check for specific UI changes.
    // We expect the URL to not be simply '/signin' anymore if the click initiated an action.
    // Waiting for navigation or a timeout can make this more robust.
    // waitForURL might be too strict if the redirect is very fast or to an unknown intermediate.
    // A simple check is that the URL is no longer *exactly* the signin page, or has query params.

    // Option 1: Wait for a specific navigation to occur (e.g., to Microsoft) - might be flaky in CI / without network
    // await expect(page).toHaveURL(/login.microsoftonline.com/, { timeout: 15000 });

    // Option 2: A more resilient check that the URL has changed from the initial '/signin'
    // This indicates that the button click has initiated some form of navigation or action.
    // It's possible the form submission itself changes the URL (e.g. to /auth/signin/microsoft-entra-id before redirecting)
    await page.waitForTimeout(2000); // Give time for client-side redirects or form submission to change URL

    const currentUrl = page.url();
    console.log('Current URL after click:', currentUrl); // For debugging in test runs

    // Check that the URL is no longer pointing to the exact base '/signin' page.
    // It could be '/signin?someparams', '/auth/signin/...', or an external URL.
    expect(currentUrl).not.toBe(new URL('/signin', page.context().browser()?.options?.baseURL || 'http://localhost:5173').toString());
    // A slightly more lenient check could be that it doesn't END with /signin
    // expect(currentUrl).not.toMatch(/\/signin$/);
    // Or check that it includes part of the expected auth path
    expect(currentUrl).toContain('/auth/signin/microsoft-entra-id');
    // This last one is more specific to the form action.
  });
});
