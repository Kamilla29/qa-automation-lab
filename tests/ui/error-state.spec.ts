import { test, expect } from '../../fixtures/test.js';
import { validApplicant } from '../../test-data/applicant.js';

test('failed submission is recoverable without losing the draft', async ({ page, application }) => {
  await page.goto('/apply?simulate=error');
  await application.completeValidApplication(validApplicant);
  await application.submit();

  await expect(page.locator('[data-cy="submission-error"]')).toBeVisible();
  await expect(application.submitButton).toHaveText('Try again');

  await page.getByRole('button', { name: 'Back' }).click();
  await expect(page.getByLabel('Monthly net income')).toHaveValue(String(validApplicant.monthlyIncome));
});
