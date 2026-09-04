import { test, expect } from '../../fixtures/test.js';

test.describe('validation and recovery', () => {
  test('invalid personal data blocks the next step and exposes accessible errors', async ({ page, application }) => {
    await page.goto('/apply');
    await application.continue();
    await application.expectStep('Your details');

    await page.getByLabel('First name').fill('K');
    await page.getByLabel('Email').fill('not-an-email');
    await application.continue();

    await expect(page.getByLabel('First name')).toHaveAttribute('aria-invalid', 'true');
    await expect(page.getByText('Enter at least 2 characters').first()).toBeVisible();
    await expect(page.getByText('Enter a valid email address')).toBeVisible();
    await application.expectStep('Your details');
  });

  test('expenses equal to income are rejected by the affordability rule', async ({ page, application }) => {
    await page.goto('/apply');
    await application.continue();
    await page.getByLabel('First name').fill('Kamilla');
    await page.getByLabel('Last name').fill('Example');
    await page.getByLabel('Email').fill('kamilla.qa@example.com');
    await page.getByLabel('Phone').fill('+420 777 123 456');
    await application.continue();
    await page.getByLabel('Monthly net income').fill('30000');
    await page.getByLabel('Monthly expenses').fill('30000');
    await application.continue();
    await expect(page.getByText('Expenses should be lower than income')).toBeVisible();
  });
});
