# Manual and automated test cases

| ID | Priority | Scenario | Expected result | Automation |
| --- | --- | --- | --- | --- |
| LF-E2E-001 | P0 | Configure 300,000 Kč / 60 months and complete valid application | Status page shows generated `LF-` reference | `happy-path.spec.ts` |
| LF-E2E-002 | P0 | Personal step contains invalid name and email | Continue is blocked; accessible error messages are shown | `validation.spec.ts` |
| LF-E2E-003 | P1 | Expenses equal income | Finance step is blocked by affordability rule | `validation.spec.ts` |
| LF-E2E-004 | P1 | Enter personal data and reload | Draft values remain available | `persistence.spec.ts` |
| LF-E2E-005 | P0 | Submission service fails | Error is visible; draft remains recoverable | `error-state.spec.ts` |
| LF-E2E-006 | P2 | Navigate to unknown route | SPA returns user to home | `navigation.spec.ts` |
| LF-E2E-007 | P1 | Open application status route directly without router state | Query-backed recovery shows the requested reference as reviewing | `navigation.spec.ts` |
| LF-API-001 | P0 | Submit valid application contract | HTTP 201 with received reference | `applications.spec.ts` |
| LF-API-002 | P1 | Submit invalid affordability data | HTTP 400 `VALIDATION_ERROR` | `applications.spec.ts` |
| LF-API-003 | P1 | Simulate service outage | HTTP 503 stable error code | `applications.spec.ts` |
| LF-API-004 | P2 | Read unknown reference | HTTP 404 `NOT_FOUND` | `applications.spec.ts` |
| LF-A11Y-001 | P1 | Scan home page | No serious/critical Axe violations | `core-pages.spec.ts` |
| LF-A11Y-002 | P1 | Scan personal-data step | No serious/critical Axe violations | `core-pages.spec.ts` |
| LF-A11Y-003 | P2 | Scan reusable component showcase | No serious/critical Axe violations | `core-pages.spec.ts` |

## Manual exploratory checklist

- Keyboard-only completion of the complete flow.
- Visible focus state on navigation, form controls and buttons.
- Zoom at 200% without loss of core actions.
- Mobile viewport around 320 px width.
- Browser back/forward behavior between application and status routes.
- Slow network simulation during submission.
- Long names, plus-addressed email, and international phone formatting.
