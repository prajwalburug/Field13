-- Board v2: how much each voter wants a system, "tell me when it ships", and a shipped record.
-- Run once on a database created from the original schema.sql:
--   npm run cf:migrate:local   /   npm run cf:migrate:remote
-- Fresh databases created from the current schema.sql already have all of this.

ALTER TABLE votes ADD COLUMN intent TEXT;        -- 'curious' | 'pilot' | 'pay' (validated in the API)

ALTER TABLE requests ADD COLUMN outcome TEXT;    -- one-line result shown on the Shipped strip
ALTER TABLE requests ADD COLUMN link TEXT;       -- optional case study / demo URL
ALTER TABLE requests ADD COLUMN shipped_at TEXT; -- set when stage becomes 'shipped'

CREATE TABLE IF NOT EXISTS watchers (
  request_id     INTEGER NOT NULL REFERENCES requests (id) ON DELETE CASCADE,
  email          TEXT    NOT NULL,                -- never returned by the public API
  ip_hash        TEXT,                            -- rate limiting only
  notified_stage TEXT,                            -- last stage we emailed about
  created_at     TEXT    NOT NULL DEFAULT (datetime('now')),
  PRIMARY KEY (request_id, email)
);
CREATE INDEX IF NOT EXISTS idx_watchers_ip ON watchers (ip_hash, created_at);
