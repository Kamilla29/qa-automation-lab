import { test, expect } from '@playwright/test';
import { validApplicant } from '../../test-data/applicant.js';

const validApplication = {
  amount: 300_000,
  months: 60,
  ...validApplicant
};

test.describe('application API contract', () => {
  test('health endpoint is available', async ({ request }) => {
    const response = await request.get('/health');
    expect(response.status()).toBe(200);
    await expect(response.json()).resolves.toEqual({ status: 'ok' });
  });

  test('valid application is accepted and status can be retrieved', async ({ request }) => {
    const create = await request.post('/api/applications', { data: validApplication });
    expect(create.status()).toBe(201);
    const created = await create.json();
    expect(created.id).toMatch(/^LF-API-/);
    expect(created.status).toBe('received');

    const status = await request.get(`/api/applications/${created.id}`);
    expect(status.status()).toBe(200);
    const body = await status.json();
    expect(body.id).toBe(created.id);
    expect(body.status).toBe('reviewing');
  });

  test('invalid affordability data is rejected', async ({ request }) => {
    const response = await request.post('/api/applications', {
      data: { ...validApplication, monthlyIncome: 20_000, monthlyExpenses: 25_000 }
    });
    expect(response.status()).toBe(400);
    expect(await response.json()).toEqual({ code: 'VALIDATION_ERROR' });
  });

  test('service failure exposes a stable error contract', async ({ request }) => {
    const response = await request.post('/api/applications', {
      headers: { 'x-simulate-error': 'true' },
      data: validApplication
    });
    expect(response.status()).toBe(503);
    expect(await response.json()).toMatchObject({ code: 'SERVICE_UNAVAILABLE' });
  });

  test('unknown reference returns 404', async ({ request }) => {
    const response = await request.get('/api/applications/LF-DOES-NOT-EXIST');
    expect(response.status()).toBe(404);
    expect(await response.json()).toEqual({ code: 'NOT_FOUND' });
  });
});
