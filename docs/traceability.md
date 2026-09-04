# Requirement-to-test traceability

| Product behavior | Risk | Automated evidence |
| --- | --- | --- |
| Calculator passes chosen terms into application | High | LF-E2E-001 |
| Required personal fields reject invalid input | High | LF-E2E-002 |
| Expenses must remain below income | High | LF-E2E-003, LF-API-002 |
| Draft is resumable after reload | High | LF-E2E-004 |
| Submission failure is recoverable | Critical | LF-E2E-005, LF-API-003 |
| Unknown route is recoverable | Medium | LF-E2E-006 |
| Direct status navigation recovers without router state | High | LF-E2E-007 |
| Application service returns a stable reference contract | Critical | LF-API-001 |
| Missing API reference returns not-found contract | Medium | LF-API-004 |
| Core pages avoid serious automatic accessibility violations | High | LF-A11Y-001/002/003 |
