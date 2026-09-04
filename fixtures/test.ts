import { test as base } from '@playwright/test';
import { ApplicationPage } from '../pages/ApplicationPage.js';
import { HomePage } from '../pages/HomePage.js';
import { StatusPage } from '../pages/StatusPage.js';

type LoanFlowFixtures = {
  home: HomePage;
  application: ApplicationPage;
  status: StatusPage;
};

export const test = base.extend<LoanFlowFixtures>({
  home: async ({ page }, use) => use(new HomePage(page)),
  application: async ({ page }, use) => use(new ApplicationPage(page)),
  status: async ({ page }, use) => use(new StatusPage(page))
});

export { expect } from '@playwright/test';
