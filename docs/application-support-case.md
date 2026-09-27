# Application Support Case — stale application status

This is a **portfolio diagnostic exercise**, not a claim about a production incident. It demonstrates how I would approach an application-support ticket using SQL, API/data-flow reasoning, evidence gathering and root-cause analysis.

## Ticket

A support user reports that application **LF-2026-1002** still appears as `submitted` even though the workflow service has already moved it to `reviewing`.

The fictional API used by the UI reads the current state from `applications.status`. A separate `status_events` table records the state-transition history.

## Investigation path

1. Reproduce the reported state and identify the affected application.
2. Inspect the persisted aggregate row in `applications`.
3. Reconstruct the status history from `status_events`.
4. Compare the aggregate status with the latest event.
5. Check whether the mismatch affects only one record or a wider set.
6. Form a root-cause hypothesis only after the data is consistent with it.
7. Define the safe remediation and regression checks.

The SQL used for those steps is in [support-case/investigation.sql](../support-case/investigation.sql).

## Finding

For `LF-2026-1002`:

- `applications.status` = `submitted`;
- latest `status_events.status` = `reviewing`;
- the latest event comes from the fictional `workflow-service`;
- the aggregate row was not updated after the new event was written.

The dataset therefore contains a deliberate **state-consistency defect**: event history advanced, but the denormalized current-state field stayed stale.

## Root-cause hypothesis

The most likely failure point in this exercise is a non-atomic update path:

1. the workflow transition is recorded successfully;
2. updating `applications.status` fails or is skipped;
3. the read API trusts the stale aggregate column;
4. the UI therefore shows an older state.

This is a hypothesis supported by the deterministic dataset, not a statement about LoanFlow production code.

## Remediation options

- update the event and aggregate status in one database transaction;
- make the state transition idempotent and retryable;
- derive the current state from the latest valid event when appropriate;
- add a reconciliation job that detects aggregate/event mismatches.

Any immediate data repair in a real environment should be controlled, logged and reviewed rather than performed ad hoc.

## Verification

After the fix I would verify:

- the API returns `reviewing` for the affected reference;
- the UI renders the same state;
- repeated transition requests do not corrupt the status;
- no additional mismatches exist in the scoped dataset;
- regression tests cover the failure path;
- logs/metrics make future partial updates visible.

## Reproduce locally

```bash
sqlite3 support.db < support-case/schema.sql
sqlite3 support.db < support-case/seed.sql
sqlite3 support.db < support-case/investigation.sql
```

## Skills demonstrated

- SQL querying and joins;
- window functions for latest-state analysis;
- incident scoping;
- API/data-flow reasoning;
- root-cause analysis;
- safe remediation thinking;
- regression and verification planning;
- technical documentation.

The scenario intentionally stays small and deterministic so the investigation can be reviewed quickly during recruitment.
