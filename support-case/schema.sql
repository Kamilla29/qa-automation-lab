-- Application Support / SQL diagnostic case
-- SQLite-compatible schema for a fictional LoanFlow incident.

DROP TABLE IF EXISTS status_events;
DROP TABLE IF EXISTS applications;

CREATE TABLE applications (
  id INTEGER PRIMARY KEY,
  reference TEXT NOT NULL UNIQUE,
  customer_name TEXT NOT NULL,
  requested_amount INTEGER NOT NULL,
  status TEXT NOT NULL,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);

CREATE TABLE status_events (
  id INTEGER PRIMARY KEY,
  application_id INTEGER NOT NULL,
  status TEXT NOT NULL,
  event_time TEXT NOT NULL,
  source TEXT NOT NULL,
  FOREIGN KEY (application_id) REFERENCES applications(id)
);

CREATE INDEX idx_status_events_application_time
  ON status_events(application_id, event_time);
