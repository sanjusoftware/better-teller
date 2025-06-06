import { test, expect } from '@playwright/test';

test.describe('Application Navigation', () => {
  test('should redirect to signin page when accessing protected routes without authentication', async ({ page }) => {
    const protectedRoutes = ['/dashboard', '/clients/corporate', '/transactions', '/products', '/settings'];

    for (const route of protectedRoutes) {
      await page.goto(route);
      // Expect redirection to the signin page
      await expect(page).toHaveURL(/.*signin/);
      // Verify a key element on the signin page
      await expect(page.getByRole('heading', { name: "Login to access the portal" })).toBeVisible();
    }
  });

  test('should navigate to the home page (signin if not authenticated)', async ({ page }) => {
    await page.goto('/');
    // If '/' redirects to '/dashboard' which then redirects to '/signin'
    await expect(page).toHaveURL(/.*signin/);
    await expect(page.getByRole('heading', { name: "Login to access the portal" })).toBeVisible();
  });
});

test.describe('Language Switcher Functionality', () => {
  test('should change language using the language switcher on the signin page', async ({ page }) => {
    await page.goto('/signin');

    // Check initial language (English) for "Login to access the portal"
    // This key is "login.cardTitle" in en.json
    const initialTitleLocator = page.getByRole('heading', { name: "Login to access the portal" });
    await expect(initialTitleLocator).toBeVisible();

    // Locate and click Bulgarian language switcher button
    // The button text comes from "languages.bg" in the respective locale file
    // Assuming the default language of the test environment (or the app) is English,
    // the button for Bulgarian will display the English word "Bulgarian" initially if the switcher itself is not translated yet based on its own content.
    // However, the LanguageSwitcher was built to display $_('languages.langCode').
    // So, if the initial page language is English, the button for Bulgarian should be "Bulgarian".
    const bulgarianButton = page.getByRole('button', { name: "Bulgarian" }); // en.json: languages.bg
    await expect(bulgarianButton).toBeVisible({ timeout: 10000 }); // Increased timeout for visibility
    await bulgarianButton.click();

    // Check if title changed to Bulgarian "Влезте за достъп до портала"
    // This key is "login.cardTitle" in bg.json
    const bulgarianTitleLocator = page.getByRole('heading', { name: "Влезте за достъп до портала" });
    await expect(bulgarianTitleLocator).toBeVisible({ timeout: 10000 });

    // Switch to Hungarian
    // The button for Hungarian should now display "Унгарски" (from bg.json: languages.hu)
    const hungarianButton = page.getByRole('button', { name: "Унгарски" });
    await expect(hungarianButton).toBeVisible({ timeout: 10000 });
    await hungarianButton.click();

    // Check if title changed to Hungarian "Jelentkezzen be a portál eléréséhez"
    // This key is "login.cardTitle" in hu.json
    const hungarianTitleLocator = page.getByRole('heading', { name: "Jelentkezzen be a portál eléréséhez" });
    await expect(hungarianTitleLocator).toBeVisible({ timeout: 10000 });

    // Optionally, switch back to English and verify
    // The button for English should now display "Angol" (from hu.json: languages.en)
    const englishButton = page.getByRole('button', { name: "Angol" });
    await expect(englishButton).toBeVisible({ timeout: 10000 });
    await englishButton.click();
    await expect(initialTitleLocator).toBeVisible({ timeout: 10000 }); // Check for the original English title
  });
});
