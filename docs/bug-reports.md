# Bug reports from LoanFlow development

These are real defects found while hardening the portfolio target, documented in QA format rather than invented defects added for presentation.

## BUG-LF-001 — Loan amount field cannot be cleared before entering a replacement value

**Status:** Resolved  
**Severity:** Major  
**Area:** Loan calculator  
**Environment:** React 18 browser UI

### Steps
1. Open the loan calculator.
2. Focus the loan amount field containing the default amount.
3. Select all text and delete it.
4. Attempt to type a new amount.

### Actual
The controlled field immediately normalizes the empty value back to the minimum loan amount, interfering with normal editing and Cypress `.clear().type(...)` behavior.

### Expected
The field should allow a temporary empty editing state and normalize/clamp only after a valid value or blur.

### Resolution
Store the editable input as a string and derive the clamped numeric amount separately. Normalize on blur. Regression coverage belongs in the calculator journey.

---

## BUG-LF-002 — Cypress configuration fails to load in ESM package

**Status:** Resolved  
**Severity:** Major (CI blocker)  
**Area:** Test infrastructure

### Steps
1. Configure the repository as `type: module`.
2. Run Cypress with the original TypeScript configuration loader.
3. Observe startup before any E2E test executes.

### Actual
Cypress fails while loading its configuration because of the ESM/TypeScript config boundary.

### Expected
Cypress should start consistently in CI and locally.

### Resolution
Use a stable CommonJS `cypress.config.cjs` configuration for the current toolchain. The fix is infrastructure-specific and does not change application behavior.
