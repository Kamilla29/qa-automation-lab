import { defineConfig, devices } from '@playwright/test';

const baseURL = process.env.BASE_URL ?? 'http://127.0.0.1:4300';
const apiBaseURL = process.env.API_BASE_URL ?? 'http://127.0.0.1:4400';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 2 : undefined,
  timeout: 30_000,
  expect: { timeout: 6_000 },
  reporter: [
    ['list'],
    ['html', { outputFolder: 'playwright-report', open: 'never' }],
    ['junit', { outputFile: 'test-results/junit.xml' }]
  ],
  use: {
    baseURL,
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    actionTimeout: 8_000,
    navigationTimeout: 15_000
  },
  metadata: {
    target: 'Kamilla29/loanflow-web',
    targetRef: process.env.LOANFLOW_REF ?? 'e91b66e5667aa87e9e3600492c44dafa0075c5b9',
    apiBaseURL
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] }, testIgnore: /api\// },
    { name: 'firefox', use: { ...devices['Desktop Firefox'] }, testMatch: /ui\/.*\.spec\.ts/ },
    { name: 'mobile-chrome', use: { ...devices['Pixel 7'] }, testMatch: /ui\/.*\.spec\.ts/ },
    { name: 'api', use: { baseURL: apiBaseURL }, testMatch: /api\/.*\.spec\.ts/ }
  ]
});
