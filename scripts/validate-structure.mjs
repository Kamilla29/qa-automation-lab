import { access, readFile } from 'node:fs/promises';

const required = [
  'playwright.config.ts',
  'target-revision.json',
  'pages/HomePage.ts',
  'pages/ApplicationPage.ts',
  'fixtures/test.ts',
  'tests/ui/happy-path.spec.ts',
  'tests/api/applications.spec.ts',
  'tests/accessibility/core-pages.spec.ts',
  'docs/test-strategy.md',
  'docs/test-cases.md',
  'docs/bug-reports.md'
];

for (const path of required) await access(path);
const target = JSON.parse(await readFile('target-revision.json', 'utf8'));
if (!target.repository || !/^[a-f0-9]{40}$/.test(target.ref)) throw new Error('target-revision.json must pin a full commit SHA');
console.log(`Structure OK. Target: ${target.repository}@${target.ref.slice(0, 7)}`);
