import { test, expect } from '../../fixtures/test.js';
import { validApplicant } from '../../test-data/applicant.js';

test.describe('loan application happy path', () => {
  test('calculator values flow through to a successful application', async ({ page, home, application, status }) => {
    await home.goto();
    await home.configureLoan(300_000, 60);
    await home.openApplication();

    await expect(page).toHaveURL(/amount=300000.*months=60/);
    await application.completeValidApplication(validApplicant);
    await application.submit();
    await status.expectReceived();
  });
});
