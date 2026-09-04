import { AxeBuilder } from '@axe-core/playwright';
import { test, expect } from '../../fixtures/test.js';

const blockingViolations = (violations: Awaited<ReturnType<AxeBuilder['analyze']>>['violations']) =>
  violations.filter((violation) => ['serious', 'critical'].includes(violation.impact ?? ''));

test.describe('accessibility smoke checks', () => {
  test('home page has no automatically detectable serious or critical violations', async ({ page, home }) => {
    await home.goto();
    const results = await new AxeBuilder({ page }).analyze();
    expect(blockingViolations(results.violations)).toEqual([]);
  });

  test('application personal-data step has no automatically detectable serious or critical violations', async ({ page, application }) => {
    await page.goto('/apply');
    await application.continue();
    const results = await new AxeBuilder({ page }).analyze();
    expect(blockingViolations(results.violations)).toEqual([]);
  });

  test('component showcase has no automatically detectable serious or critical violations', async ({ page }) => {
    await page.goto('/components');
    await expect(page.getByRole('heading', { name: 'Component showcase' })).toBeVisible();
    const results = await new AxeBuilder({ page }).analyze();
    expect(blockingViolations(results.violations)).toEqual([]);
  });
});
