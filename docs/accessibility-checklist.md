# Accessibility checklist

Automation is only one layer. Before calling a release accessible enough for portfolio review, manually verify:

- Skip link becomes visible on keyboard focus and reaches main content.
- Every input has a programmatic label.
- Validation messages are associated through `aria-describedby`.
- Invalid controls expose `aria-invalid=true`.
- Step changes move focus to the new step heading without trapping focus.
- Loading state prevents duplicate submission and remains understandable to screen-reader users.
- Error summary/message is announced and does not erase entered values.
- Color is not the only indicator for validation or step state.
- 200% zoom and narrow mobile viewport preserve all critical actions.
- Reduced-motion preference removes non-essential motion.
