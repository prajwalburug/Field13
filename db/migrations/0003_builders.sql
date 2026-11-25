-- Board v3: "Build with us". Experienced AI marketers and growth leads apply to co-build systems.
-- Run once:  npm run cf:migrate:builders:local   /   npm run cf:migrate:builders:remote
-- Fresh databases created from the current schema.sql already have this table.

CREATE TABLE IF NOT EXISTS builders (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  name        TEXT    NOT NULL,
  email       TEXT    NOT NULL,             -- never returned by any public API
  linkedin    TEXT    NOT NULL,
  role        TEXT    NOT NULL,             -- current role and company
  experience  TEXT,                         -- '2-4' | '5-8' | '9+'
  system      TEXT,                         -- what they want to build
  pitch       TEXT    NOT NULL,             -- what they bring
  status      TEXT    NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'call', 'in', 'pass')),
  ip_hash     TEXT,                         -- salted hash, rate limiting only
  created_at  TEXT    NOT NULL DEFAULT (datetime('now'))
);
CREATE INDEX IF NOT EXISTS idx_builders_ip ON builders (ip_hash, created_at);
