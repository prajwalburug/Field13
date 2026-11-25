-- Request a system: requests + one vote per visitor per request.
-- New requests land as 'pending' and only show publicly once set to 'approved'.

CREATE TABLE IF NOT EXISTS requests (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  title       TEXT    NOT NULL,
  details     TEXT    NOT NULL,
  audience    TEXT,
  company     TEXT,
  email       TEXT    NOT NULL,           -- never returned by the public API
  status      TEXT    NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  stage       TEXT    CHECK (stage IS NULL OR stage IN ('building', 'shipped')),
  votes       INTEGER NOT NULL DEFAULT 0,
  ip_hash     TEXT,                       -- salted hash, used only for rate limiting
  created_at  TEXT    NOT NULL DEFAULT (datetime('now')),
  outcome     TEXT,                       -- one-line result shown on the Shipped strip
  link        TEXT,                       -- optional case study / demo URL
  shipped_at  TEXT                        -- set when stage becomes 'shipped'
);

CREATE INDEX IF NOT EXISTS idx_requests_public ON requests (status, votes DESC, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_requests_ip ON requests (ip_hash, created_at);

CREATE TABLE IF NOT EXISTS votes (
  request_id  INTEGER NOT NULL REFERENCES requests (id) ON DELETE CASCADE,
  voter_hash  TEXT    NOT NULL,
  created_at  TEXT    NOT NULL DEFAULT (datetime('now')),
  intent      TEXT,                       -- 'curious' | 'pilot' | 'pay', set after voting
  PRIMARY KEY (request_id, voter_hash)
);

CREATE INDEX IF NOT EXISTS idx_votes_time ON votes (created_at);

-- "Tell me when it ships": one row per email per request.
CREATE TABLE IF NOT EXISTS watchers (
  request_id     INTEGER NOT NULL REFERENCES requests (id) ON DELETE CASCADE,
  email          TEXT    NOT NULL,          -- never returned by the public API
  ip_hash        TEXT,                      -- rate limiting only
  notified_stage TEXT,                      -- last stage we emailed about
  created_at     TEXT    NOT NULL DEFAULT (datetime('now')),
  PRIMARY KEY (request_id, email)
);
CREATE INDEX IF NOT EXISTS idx_watchers_ip ON watchers (ip_hash, created_at);

-- "Build with us": applications from AI marketers and growth leads.
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
