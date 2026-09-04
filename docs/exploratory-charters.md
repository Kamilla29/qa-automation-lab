# Exploratory testing charters

## Charter 1 — Calculator boundary behavior

**Mission:** Explore whether the calculator remains usable around numeric boundaries and normal editing behavior.

Focus on minimum/maximum amount, empty temporary input, pasted values, decimal/negative values, very fast edits, keyboard increment controls and the hand-off from calculator to application URL parameters.

**Evidence to capture:** exact value entered, normalized value, monthly estimate, generated application URL and any console errors.

## Charter 2 — Resume and navigation resilience

**Mission:** Explore whether an in-progress applicant can safely navigate, reload and return without losing or corrupting entered data.

Focus on refresh at every step, browser back/forward, opening a second tab, revisiting `/apply`, changing calculator terms after a draft exists and status-page direct navigation.

**Evidence to capture:** active route, stored draft data, visible step, focus location and whether stale data overrides explicit URL values.

## Charter 3 — Failure and latency resilience

**Mission:** Explore application behavior when submission is slow or unavailable.

Focus on duplicate-submit prevention, loading copy, navigating while pending, retry behavior, preserved values after failure and screen-reader announcement of the error.

**Evidence to capture:** request count, button state, error announcement, form values after failure and successful retry behavior.
