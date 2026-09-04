import { expect, type Locator, type Page } from '@playwright/test';

export class HomePage {
  readonly heading: Locator;
  readonly amount: Locator;
  readonly term: Locator;
  readonly monthlyPayment: Locator;
  readonly startApplication: Locator;

  constructor(private readonly page: Page) {
    this.heading = page.getByRole('heading', { name: /Borrowing,/i });
    this.amount = page.locator('[data-cy="loan-amount"]');
    this.term = page.locator('[data-cy="loan-term"]');
    this.monthlyPayment = page.locator('[data-cy="monthly-payment"]');
    this.startApplication = page.getByRole('link', { name: 'Start application' });
  }

  async goto() {
    await this.page.goto('/');
    await expect(this.heading).toBeVisible();
  }

  async configureLoan(amount: number, months: number) {
    await this.amount.fill(String(amount));
    await this.amount.blur();
    await this.term.selectOption(String(months));
    await expect(this.monthlyPayment).toContainText('Kč');
  }

  async openApplication() {
    await this.startApplication.click();
    await expect(this.page).toHaveURL(/\/apply/);
  }
}
