-- Deterministic dataset for the diagnostic case.

INSERT INTO applications
  (id, reference, customer_name, requested_amount, status, created_at, updated_at)
VALUES
  (1, 'LF-2026-1001', 'Demo Customer A', 180000, 'reviewing', '2026-09-21T08:15:00Z', '2026-09-21T08:20:00Z'),
  (2, 'LF-2026-1002', 'Demo Customer B', 240000, 'submitted', '2026-09-21T09:05:00Z', '2026-09-21T09:05:00Z'),
  (3, 'LF-2026-1003', 'Demo Customer C', 150000, 'approved', '2026-09-21T10:40:00Z', '2026-09-21T11:10:00Z');

INSERT INTO status_events
  (id, application_id, status, event_time, source)
VALUES
  (1, 1, 'submitted', '2026-09-21T08:15:00Z', 'application-api'),
  (2, 1, 'reviewing', '2026-09-21T08:20:00Z', 'workflow-service'),
  (3, 2, 'submitted', '2026-09-21T09:05:00Z', 'application-api'),
  (4, 2, 'reviewing', '2026-09-21T09:12:00Z', 'workflow-service'),
  (5, 3, 'submitted', '2026-09-21T10:40:00Z', 'application-api'),
  (6, 3, 'reviewing', '2026-09-21T10:47:00Z', 'workflow-service'),
  (7, 3, 'approved', '2026-09-21T11:10:00Z', 'decision-service');
