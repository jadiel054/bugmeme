-- BugMeme initial schema (run once on Neon SQL Editor if preferred)

CREATE TABLE IF NOT EXISTS phrases (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  universe_id varchar(32) NOT NULL,
  type varchar(32) NOT NULL,
  text text NOT NULL,
  source varchar(32) NOT NULL DEFAULT 'seed',
  approved boolean NOT NULL DEFAULT true,
  votes integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS phrases_universe_type_idx ON phrases (universe_id, type);

CREATE TABLE IF NOT EXISTS generated_memes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  public_code varchar(16) NOT NULL,
  universe_id varchar(32) NOT NULL,
  situacao text NOT NULL,
  desculpa text NOT NULL,
  resposta_ia text NOT NULL,
  status_label varchar(64) NOT NULL,
  status_emoji varchar(16),
  emotion varchar(32),
  device_id varchar(64),
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS generated_memes_universe_idx ON generated_memes (universe_id);
CREATE INDEX IF NOT EXISTS generated_memes_created_idx ON generated_memes (created_at);

CREATE TABLE IF NOT EXISTS device_favorites (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  device_id varchar(64) NOT NULL,
  meme_public_code varchar(16) NOT NULL,
  universe_id varchar(32) NOT NULL,
  situacao text NOT NULL,
  desculpa text NOT NULL,
  resposta_ia text NOT NULL,
  status_label varchar(64) NOT NULL,
  status_emoji varchar(16),
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS device_favorites_device_idx ON device_favorites (device_id);
