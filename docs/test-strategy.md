# Test strategy

## Objective

Provide risk-based automated coverage for the public LoanFlow portfolio application while keeping the test project independent from the product repository.

## Target baseline

The suite is pinned in `target-revision.json`. The current baseline is LoanFlow commit `e91b66e`, the final portfolio release with the complete application journey, affordability logic, persistent draft state, recoverable submission errors, query-backed status recovery, reusable UI showcase and accessibility improvements.

## Test layers

### UI E2E
Critical customer behavior is tested through the browser: loan configuration, multi-step application, validation, state persistence, error recovery, routing and successful submission.

### API contract
`tests/api` exercises a deterministic contract server representing the intended application-service boundary. This layer validates HTTP status codes, response shapes and negative conditions independently from browser behavior. It is explicitly a test double, not a claim that the current public LoanFlow release has a deployed backend.

### Accessibility
Axe automation blocks serious/critical automatically detectable violations on representative pages. Manual keyboard, focus-order and content checks remain part of the checklist because automated scanners do not cover all WCAG requirements.

## Risk priorities

| Risk | Impact | Coverage |
| --- | --- | --- |
| Applicant cannot complete the journey | Critical | Happy-path E2E |
| Invalid data reaches later steps | High | Validation E2E + API negative tests |
| Draft disappears after reload | High | Persistence E2E |
| Service error loses customer input | High | Error-recovery E2E |
| Responsive flow breaks on mobile | Medium | Mobile Chrome project |
| Browser-specific behavior | Medium | Chromium + Firefox |
| Accessibility regression | Medium/High | Axe + manual checklist |

## CI policy

Pull requests and `main` run the pinned target through static checks, Chromium and Firefox browser regression, mobile Chrome emulation, API contract tests and accessibility smoke checks. Traces, screenshots and videos are retained only on failure to keep diagnostics useful without creating unnecessary artifacts.
