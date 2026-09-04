import { test, expect } from '../../fixtures/test.js';

test.describe('routing resilience', () => {
  test('unknown routes recover to the product home page', async ({ page }) => {
    await page.goto('/this-route-does-not-exist');
    await expect(page).toHaveURL(/\/$/);
    await expect(page.getByRole('heading', { name: /Borrowing,/i })).toBeVisible();
  });

  test('status route recovers without router state on direct navigation', async ({ page, status }) => {
    const reference = 'LF-DIRECT-123';
    await page.goto(`/status/${reference}`);
    await status.expectRecovered(reference);
  });
});
