import { test, expect } from '../../fixtures/test.js';

test('application draft survives a reload', async ({ page, application }) => {
  await page.goto('/apply');
  await application.continue();
  await page.getByLabel('First name').fill('Kamilla');
  await page.getByLabel('Last name').fill('Persistent');

  await page.reload();
  await application.continue();

  await expect(page.getByLabel('First name')).toHaveValue('Kamilla');
  await expect(page.getByLabel('Last name')).toHaveValue('Persistent');
});
