CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(120),
  email VARCHAR(150) UNIQUE NOT NULL,
  password_hash TEXT,
  role VARCHAR(20) DEFAULT 'user',
  avatar_url TEXT,
  phone VARCHAR(20),
  is_verified BOOLEAN DEFAULT false,
  last_login_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);