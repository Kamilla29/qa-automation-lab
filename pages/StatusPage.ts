import { expect, type Locator, type Page } from '@playwright/test';

export class StatusPage {
  readonly heading: Locator;
  readonly reference: Locator;

  constructor(private readonly page: Page) {
    this.heading = page.getByRole('heading', { name: 'Application received' });
    this.reference = page.locator('[data-cy="application-reference"]');
  }

  async expectReceived() {
    await expect(this.heading).toBeVisible();
    await expect(this.reference).toHaveText(/^LF-/);
    await expect(this.page.getByText(/^received$/i)).toBeVisible();
  }

  async expectRecovered(reference: string) {
    await expect(this.heading).toBeVisible();
    await expect(this.reference).toHaveText(reference);
    await expect(this.page.getByText(/^reviewing$/i)).toBeVisible();
  }
}
