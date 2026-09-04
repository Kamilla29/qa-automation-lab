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

---

## BUG-LF-003 — Primary hero support text misses WCAG AA contrast

**Status:** Resolved and regression verified  
**Severity:** Major  
**Area:** Accessibility / visual system  
**Detected by:** Playwright + Axe regression against LoanFlow `e91b66e`

### Steps
1. Open the LoanFlow home page.
2. Run the automated Axe accessibility scan.
3. Inspect the support text inside the primary hero card.

### Actual
The muted support text resolved to approximately `#cecbf8` on the `#4f46e5` brand background, producing a 4.04:1 contrast ratio. Axe reported a serious WCAG 2 AA color-contrast violation.

### Expected
Normal-sized text should meet at least 4.5:1 contrast against its background.

### Resolution
The shared brand token was darkened to `#4338ca`, preserving the indigo visual direction while improving the contrast of text composed over the brand surface.

### Verification
The independent QA regression was rerun against the merged LoanFlow release and the home-page Axe scan passed with no serious or critical violations.

---

## BUG-LF-004 — Neutral badge text misses WCAG AA contrast

**Status:** Resolved and regression verified  
**Severity:** Major  
**Area:** Accessibility / shared UI component  
**Detected by:** Playwright + Axe regression against LoanFlow `e91b66e`

### Steps
1. Open `/components`.
2. Run the automated Axe accessibility scan.
3. Inspect the neutral status badge.

### Actual
The neutral badge used `#667085` on `#eef1f7`, producing a 4.39:1 contrast ratio. Axe reported a serious WCAG 2 AA color-contrast violation.

### Expected
Badge text should meet at least 4.5:1 contrast against the badge surface.

### Resolution
The neutral badge foreground was changed to `#475467` while retaining the existing neutral background.

### Verification
The component-showcase Axe scan passed in the independent QA regression against the merged LoanFlow release.

---

## BUG-LF-005 — Application submits automatically when entering the Review step

**Status:** Resolved and regression verified  
**Severity:** Critical  
**Area:** Application workflow / form behavior  
**Detected by:** Cross-browser Playwright happy-path regression

### Steps
1. Start a valid loan application.
2. Complete Loan and Personal details.
3. Enter valid income and expenses on the Finances step.
4. Click `Continue` to open Review.
5. Do not click `Submit application`.

### Actual
The application entered the `Submitting…` state immediately. React reused the same shared Button component instance at the action position, changing the rendered DOM button from `type="button"` to `type="submit"` during the original Continue interaction. The browser could therefore execute the submit default action before explicit review confirmation.

### Expected
The Review screen should remain visible with an enabled `Submit application` button until the user explicitly confirms submission.

### Resolution
The shared Button DOM node is remounted when its form action `type` changes, preventing the Continue button from morphing into a submit control during the same browser interaction. LoanFlow also gained a Cypress regression assertion that Review remains on `/apply` until explicit submission.

### Verification
LoanFlow's own Cypress CI passed, followed by the independent Playwright regression on Chromium, Firefox and mobile Chrome using normal user-style clicks. The final QA baseline is LoanFlow `12c428a`.
