-- D1 DESIGN ONLY / D1 结构草案。Not connected to a research deployment / 尚未连接正式服务
PRAGMA foreign_keys=ON;
CREATE TABLE IF NOT EXISTS enrolments (
  participant_id TEXT PRIMARY KEY,
  access_code_hmac TEXT NOT NULL UNIQUE,
  status TEXT NOT NULL DEFAULT 'issued' CHECK(status IN ('issued','active','completed','revoked','withdrawn')),
  issued_at TEXT NOT NULL,
  expires_at TEXT NOT NULL,
  activated_at TEXT,
  max_ai_calls INTEGER NOT NULL DEFAULT 15 CHECK(max_ai_calls BETWEEN 0 AND 500),
  used_ai_calls INTEGER NOT NULL DEFAULT 0 CHECK(used_ai_calls >= 0)
);
CREATE TABLE IF NOT EXISTS participant_sessions (
  session_hash TEXT PRIMARY KEY,
  participant_id TEXT NOT NULL REFERENCES enrolments(participant_id),
  created_at TEXT NOT NULL,
  expires_at TEXT NOT NULL,
  revoked_at TEXT
);
CREATE INDEX IF NOT EXISTS idx_sessions_pid ON participant_sessions(participant_id);
CREATE TABLE IF NOT EXISTS runs (
  participant_id TEXT PRIMARY KEY REFERENCES enrolments(participant_id),
  consent_version TEXT,
  consented_at TEXT,
  current_stage TEXT NOT NULL DEFAULT 'A' CHECK(current_stage IN ('A','B','C','D','E','F','done')),
  status TEXT NOT NULL DEFAULT 'pending' CHECK(status IN ('pending','in_progress','completed','withdrawn')),
  started_at TEXT,
  ended_at TEXT
);
CREATE TABLE IF NOT EXISTS stage_submissions (
  participant_id TEXT NOT NULL REFERENCES runs(participant_id),
  stage TEXT NOT NULL CHECK(stage IN ('A','B','C','D','E','F')),
  version INTEGER NOT NULL DEFAULT 1 CHECK(version >= 1),
  submitted_at TEXT NOT NULL,
  payload_json TEXT NOT NULL,
  PRIMARY KEY(participant_id,stage,version)
);
CREATE TABLE IF NOT EXISTS ai_turns (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  participant_id TEXT NOT NULL REFERENCES runs(participant_id),
  stage TEXT NOT NULL CHECK(stage IN ('B','D')),
  request_id TEXT NOT NULL,
  user_text TEXT NOT NULL,
  assistant_text TEXT,
  requested_at TEXT NOT NULL,
  completed_at TEXT,
  model_id TEXT,
  prompt_tokens INTEGER,
  completion_tokens INTEGER,
  outcome TEXT NOT NULL DEFAULT 'reserved' CHECK(outcome IN ('reserved','success','failed')),
  UNIQUE(participant_id,request_id)
);
CREATE INDEX IF NOT EXISTS idx_ai_turns_pid ON ai_turns(participant_id,id);
CREATE TABLE IF NOT EXISTS audit_events (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  participant_id TEXT,
  event_name TEXT NOT NULL,
  occurred_at TEXT NOT NULL,
  metadata_json TEXT NOT NULL DEFAULT '{}'
);
-- Must implement authorisation, quotas, pseudonymisation, retention and encryption policy in application code.
-- 表结构不能替代身份验证、权限控制或伦理要求。
