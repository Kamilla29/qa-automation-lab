import AxeBuilder from '@axe-core/playwright';
import { test, expect } from '../../fixtures/test.js';

test.describe('accessibility smoke checks', () => {
  test('home page has no automatically detectable serious or critical violations', async ({ page, home }) => {
    await home.goto();
    const results = await new AxeBuilder({ page }).analyze();
    const blocking = results.violations.filter((violation) => ['serious', 'critical'].includes(violation.impact ?? ''));
    expect(blocking).toEqual([]);
  });

  test('application personal-data step has no automatically detectable serious or critical violations', async ({ page, application }) => {
    await page.goto('/apply');
    await application.continue();
    const results = await new AxeBuilder({ page }).analyze();
    const blocking = results.violations.filter((violation) => ['serious', 'critical'].includes(violation.impact ?? ''));
    expect(blocking).toEqual([]);
  });

  test('component showcase has no automatically detectable serious or critical violations', async ({ page }) => {
    await page.goto('/components');
    await expect(page.getByRole('heading', { name: 'Component showcase' })).toBeVisible();
    const results = await new AxeBuilder({ page }).analyze();
    const blocking = results.violations.filter((violation) => ['serious', 'critical'].includes(violation.impact ?? ''));
    expect(blocking).toEqual([]);
  });
});
