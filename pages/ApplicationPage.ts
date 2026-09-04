import { expect, type Locator, type Page } from '@playwright/test';
import type { Applicant } from '../test-data/applicant.js';

export class ApplicationPage {
  readonly continueButton: Locator;
  readonly submitButton: Locator;
  readonly stepHeading: Locator;

  constructor(private readonly page: Page) {
    this.continueButton = page.locator('[data-cy="continue"]');
    this.submitButton = page.locator('[data-cy="submit"]');
    this.stepHeading = page.locator('.step-intro h2');
  }

  async expectStep(title: string) {
    await expect(this.stepHeading).toHaveText(title);
  }

  async continue() {
    await this.continueButton.click();
  }

  async fillPersonal(data: Applicant) {
    await this.page.getByLabel('First name').fill(data.firstName);
    await this.page.getByLabel('Last name').fill(data.lastName);
    await this.page.getByLabel('Email').fill(data.email);
    await this.page.getByLabel('Phone').fill(data.phone);
  }

  async fillFinances(data: Applicant) {
    await this.page.getByLabel('Employment').selectOption(data.employmentType);
    await this.page.getByLabel('Monthly net income').fill(String(data.monthlyIncome));
    await this.page.getByLabel('Monthly expenses').fill(String(data.monthlyExpenses));
  }

  async completeValidApplication(data: Applicant) {
    await this.expectStep('Loan details');
    await this.continue();
    await this.expectStep('Your details');
    await this.fillPersonal(data);
    await this.continue();
    await this.expectStep('Income and expenses');
    await this.fillFinances(data);
    await this.continue();
    await this.expectStep('Review and submit');
  }

  async submit() {
    await expect(this.submitButton).toBeEnabled();
    await this.submitButton.click({ force: true });
  }
}
