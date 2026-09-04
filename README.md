# QA Automation Lab

**Playwright + TypeScript quality engineering project for LoanFlow.**

This repository is designed as an independent QA portfolio project rather than tests hidden inside the application repository. It demonstrates test architecture, risk-based coverage, UI automation, API contract testing, accessibility checks, diagnostic artifacts and CI design around a real companion project.

> Target product: [`Kamilla29/loanflow-web`](https://github.com/Kamilla29/loanflow-web). The tested baseline is pinned in `target-revision.json`, so every regression run maps to the exact final LoanFlow revision under test.

## What this project demonstrates

- Playwright + TypeScript test architecture;
- Page Object pattern for stable product interactions;
- reusable fixtures and deterministic test data;
- critical-path E2E coverage;
- negative validation and recovery scenarios;
- persisted-state regression coverage;
- API contract testing with a deterministic local test double;
- Axe accessibility smoke checks plus a manual checklist;
- cross-browser/mobile configuration;
- trace, screenshot and video diagnostics on failure;
- documented test strategy, test cases, risk priorities and bug reports;
- CI workflow that checks out a pinned LoanFlow revision before running tests.

## Structure

```text
pages/                 Page Objects
fixtures/              custom Playwright fixtures
test-data/             deterministic builders and fixtures
tests/ui/              browser E2E/regression tests
tests/api/             HTTP contract tests
tests/accessibility/   automated accessibility smoke tests
test-support/          deterministic mock application API
docs/                  strategy, cases, traceability, bugs, a11y checklist
.github/workflows/     CI regression pipeline
target-revision.json   exact LoanFlow revision under test
```

## Current automated scenarios

### Browser
1. Calculator → complete application → received reference.
2. Invalid personal data blocks progression with accessible errors.
3. Expenses >= income fail the finance rule.
4. Draft values survive page reload.
5. Simulated submission outage is recoverable without losing data.
6. Unknown SPA routes recover to the home page.
7. Direct status navigation recovers without router state.

### API contract
1. Health check.
2. Valid submission returns HTTP 201 and a stable reference shape.
3. Created reference can be read back as reviewing.
4. Invalid affordability data returns HTTP 400.
5. Simulated outage returns HTTP 503 with stable error code.
6. Unknown reference returns HTTP 404.

### Accessibility
Representative home, form and component-showcase pages are scanned for serious/critical Axe violations. Manual checks remain documented because automated accessibility testing cannot prove WCAG conformance by itself.

## Run against LoanFlow

Install dependencies and Playwright browsers:

```bash
npm install
npx playwright install
```

Start LoanFlow separately at `http://127.0.0.1:4300`, then start the contract server:

```bash
node test-support/mock-api-server.mjs
```

Run suites:

```bash
npm run test:ui
npm run test:api
npm run test:a11y
npm test
```

Override target addresses with `BASE_URL` and `API_BASE_URL`.

## QA documentation

- [`docs/test-strategy.md`](docs/test-strategy.md)
- [`docs/test-cases.md`](docs/test-cases.md)
- [`docs/traceability.md`](docs/traceability.md)
- [`docs/bug-reports.md`](docs/bug-reports.md)
- [`docs/accessibility-checklist.md`](docs/accessibility-checklist.md)
- [`docs/exploratory-charters.md`](docs/exploratory-charters.md)

## Authenticity note

The bug reports document defects actually encountered while hardening LoanFlow. The API server is intentionally identified as a test double; this repository does not claim that the current public LoanFlow version has a deployed backend.

---

**Kamilla Kuanysheva**  
React Developer · TypeScript · QA Automation
