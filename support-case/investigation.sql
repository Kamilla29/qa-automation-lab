-- Investigation queries for the application-status mismatch incident.

-- 1) Inspect the application reported by support.
SELECT reference, status, created_at, updated_at
FROM applications
WHERE reference = 'LF-2026-1002';

-- 2) Reconstruct the status timeline.
SELECT a.reference, e.status, e.event_time, e.source
FROM applications a
JOIN status_events e ON e.application_id = a.id
WHERE a.reference = 'LF-2026-1002'
ORDER BY e.event_time;

-- 3) Compare the aggregate status with the latest recorded event.
WITH latest_event AS (
  SELECT e.application_id, e.status AS latest_event_status, e.event_time,
         ROW_NUMBER() OVER (
           PARTITION BY e.application_id
           ORDER BY e.event_time DESC, e.id DESC
         ) AS rn
  FROM status_events e
)
SELECT a.reference,
       a.status AS application_status,
       le.latest_event_status,
       le.event_time AS latest_event_time
FROM applications a
JOIN latest_event le ON le.application_id = a.id AND le.rn = 1
WHERE a.status <> le.latest_event_status;

-- 4) Scope the issue across all records.
WITH latest_event AS (
  SELECT e.application_id, e.status AS latest_event_status,
         ROW_NUMBER() OVER (
           PARTITION BY e.application_id
           ORDER BY e.event_time DESC, e.id DESC
         ) AS rn
  FROM status_events e
)
SELECT COUNT(*) AS inconsistent_applications
FROM applications a
JOIN latest_event le ON le.application_id = a.id AND le.rn = 1
WHERE a.status <> le.latest_event_status;

-- Expected finding:
-- LF-2026-1002 is stored as 'submitted' in applications,
-- while the latest workflow event is 'reviewing'.
