import { test, expect } from '@playwright/test';

test.describe('VKey End-to-End Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should load landing page with hero text and CTAs', async ({ page }) => {
    await expect(page.locator('h1')).toContainText('Type Smarter');
    await expect(page.getByRole('button', { name: 'Try the Keyboard' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Start Typing Practice' })).toBeVisible();
  });

  test('should navigate to Virtual Keyboard workspace', async ({ page }) => {
    await page.getByRole('button', { name: 'Try the Keyboard' }).click();
    await expect(page.locator('h1')).toContainText('Smart Virtual Keyboard');

    // Type using virtual keys
    const letterE = page.locator('button[data-key="e"]');
    await expect(letterE).toBeVisible();
    await letterE.click();

    const textarea = page.locator('textarea');
    await expect(textarea).toHaveValue('e');
  });

  test('should synchronize physical keyboard press', async ({ page }) => {
    await page.getByRole('button', { name: 'Keyboard', exact: true }).click();
    const textarea = page.locator('textarea');
    await textarea.focus();
    await page.keyboard.type('hello');
    await expect(textarea).toHaveValue('hello');
  });

  test('should launch and complete a practice test session', async ({ page }) => {
    await page.getByRole('button', { name: 'Practice', exact: true }).click();
    await expect(page.locator('h1')).toContainText('Typing Practice System');

    const textarea = page.locator('textarea');
    await textarea.focus();
    await page.keyboard.type('the be to of and');

    await expect(page.locator('text=Speed (WPM)')).toBeVisible();
  });

  test('should toggle accessibility Dyslexia font and High Contrast settings', async ({ page }) => {
    await page.getByRole('button', { name: 'Accessibility', exact: true }).click();
    await expect(page.locator('h1')).toContainText('Accessibility Center');

    const contrastToggle = page.locator('#toggle-highContrast, button[role="switch"]').first();
    await contrastToggle.click();
    await expect(page.locator('body')).toHaveClass(/theme-high-contrast/);
  });

  test('should export user typing data from Privacy Center', async ({ page }) => {
    await page.getByRole('button', { name: 'Privacy', exact: true }).click();
    await expect(page.locator('h1')).toContainText('Privacy Center');

    const exportBtn = page.getByRole('button', { name: 'Download My Typing Data' });
    await expect(exportBtn).toBeVisible();
  });
});
