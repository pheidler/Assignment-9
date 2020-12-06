-- Your database schema goes here --
DROP TABLE IF EXISTS mail;
DROP TABLE IF EXISTS users CASCADE;

CREATE TABLE users(email text UNIQUE PRIMARY KEY, passwordHash text, mailboxes text[], profilePicture text, name text, showAvatar boolean);



CREATE TABLE mail(id UUID UNIQUE PRIMARY KEY DEFAULT gen_random_uuid(), mailbox VARCHAR(32), email text REFERENCES users(email), mail jsonb, starred boolean DEFAULT false, unread boolean DEFAULT true);
