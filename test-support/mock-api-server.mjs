import http from 'node:http';

const port = Number(process.env.LOANFLOW_MOCK_API_PORT ?? 4400);
const applications = new Map();

function json(response, status, body) {
  response.writeHead(status, {
    'content-type': 'application/json; charset=utf-8',
    'access-control-allow-origin': '*'
  });
  response.end(JSON.stringify(body));
}

function validApplication(body) {
  return body && typeof body.amount === 'number' && body.amount >= 50_000 &&
    typeof body.months === 'number' && body.months >= 12 &&
    typeof body.firstName === 'string' && body.firstName.trim().length >= 2 &&
    typeof body.lastName === 'string' && body.lastName.trim().length >= 2 &&
    typeof body.email === 'string' && body.email.includes('@') &&
    typeof body.monthlyIncome === 'number' && body.monthlyIncome > 0 &&
    typeof body.monthlyExpenses === 'number' && body.monthlyExpenses >= 0 &&
    body.monthlyExpenses < body.monthlyIncome;
}

const server = http.createServer(async (request, response) => {
  if (request.method === 'GET' && request.url === '/health') {
    return json(response, 200, { status: 'ok' });
  }

  if (request.method === 'POST' && request.url === '/api/applications') {
    if (request.headers['x-simulate-error'] === 'true') {
      return json(response, 503, { code: 'SERVICE_UNAVAILABLE', message: 'Application service unavailable' });
    }

    let raw = '';
    for await (const chunk of request) raw += chunk;
    let body;
    try { body = JSON.parse(raw || '{}'); } catch { return json(response, 400, { code: 'INVALID_JSON' }); }
    if (!validApplication(body)) return json(response, 400, { code: 'VALIDATION_ERROR' });

    const id = `LF-API-${Date.now().toString(36).toUpperCase()}`;
    const application = { id, status: 'received', submittedAt: new Date().toISOString() };
    applications.set(id, application);
    return json(response, 201, application);
  }

  if (request.method === 'GET' && request.url?.startsWith('/api/applications/')) {
    const id = decodeURIComponent(request.url.split('/').pop() ?? '');
    const application = applications.get(id);
    if (!application) return json(response, 404, { code: 'NOT_FOUND' });
    return json(response, 200, { ...application, status: 'reviewing' });
  }

  return json(response, 404, { code: 'NOT_FOUND' });
});

server.listen(port, '127.0.0.1', () => console.log(`Mock LoanFlow API listening on http://127.0.0.1:${port}`));

for (const signal of ['SIGTERM', 'SIGINT']) {
  process.on(signal, () => server.close(() => process.exit(0)));
}
