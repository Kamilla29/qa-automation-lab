import { spawn } from 'node:child_process';

const server = spawn(process.execPath, ['test-support/mock-api-server.mjs'], { env: { ...process.env, LOANFLOW_MOCK_API_PORT: '4400' }, stdio: ['ignore', 'pipe', 'inherit'] });
let ready = false;
server.stdout.on('data', (chunk) => { if (String(chunk).includes('Mock LoanFlow API')) ready = true; });

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
try {
  for (let i = 0; i < 30 && !ready; i += 1) await wait(50);
  const health = await fetch('http://127.0.0.1:4400/health');
  if (health.status !== 200) throw new Error(`Health status ${health.status}`);

  const invalid = await fetch('http://127.0.0.1:4400/api/applications', {
    method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ amount: 1 })
  });
  if (invalid.status !== 400) throw new Error(`Expected 400, got ${invalid.status}`);

  const valid = await fetch('http://127.0.0.1:4400/api/applications', {
    method: 'POST', headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ amount: 300000, months: 60, firstName: 'Kamilla', lastName: 'Example', email: 'qa@example.com', monthlyIncome: 55000, monthlyExpenses: 24000 })
  });
  if (valid.status !== 201) throw new Error(`Expected 201, got ${valid.status}`);
  const created = await valid.json();
  const status = await fetch(`http://127.0.0.1:4400/api/applications/${created.id}`);
  if (status.status !== 200) throw new Error(`Expected 200 status lookup, got ${status.status}`);
  console.log('Mock API smoke: PASS');
} finally {
  server.kill('SIGTERM');
}
