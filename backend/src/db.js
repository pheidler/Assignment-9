const fs = require('fs');
const {Pool} = require('pg');
var bcrypt = require('bcrypt');


require('dotenv').config();
process.env.POSTGRES_DB='dev';

const pool = new Pool({
  host: 'localhost',
  port: 5432,
  database: process.env.POSTGRES_DB,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
});

exports.reset = async () => {
  await run('sql/schema.sql');
  await run('sql/data.sql');
  await run('sql/indexes.sql');
};

const run = async (file) => {
  const content = fs.readFileSync(file, 'utf8');
  const statements = content.split(/\r?\n/);
  for (statement of statements) {
    await pool.query(statement);
  }
};
exports.checkHash = async (email, password) => {
  const query = `
    SELECT *
    FROM users
    WHERE email='${email}'
  `;
  const {rows} = await pool.query(query);
  hashedPassword = rows[0].passwordhash;
  if (bcrypt.compareSync(password, hashedPassword)) {
    return rows[0];
  } else {
    return undefined;
  }
}
exports.selectMailbox = async (mailbox, user) => {
  const query = `
    SELECT id, mail->'from' AS from, mail->'to' AS to, mail->'subject' AS subject, mail->'sent' AS sent, mail->'received' AS received, mail->'content' AS content, starred
    FROM mail
    WHERE mailbox='${mailbox}' AND email='${user}'`;
  const {rows} = await pool.query(query);
  return (rows);
};

exports.selectMailboxes = async (user) => {
  const query = `
    SELECT mailbox, COUNT (id)::INTEGER as emails
    FROM mail
    WHERE email='${user}' AND unread=true
    GROUP BY mailbox
  `;
  const {rows} = await pool.query(query);
  return rows;
}

exports.selectUserMailboxes = async (user) => {
  const query = `
    SELECT mailboxes
    FROM users
    WHERE email='${user}'
  `;
  const {rows} = await pool.query(query);
  return rows[0].mailboxes;
}

exports.updateStarred = async (id, updatedEmail) => {
  updatedEmail.starred = !updatedEmail.starred;
  const query = `
    UPDATE mail
    SET starred = ${updatedEmail.starred}
    WHERE id='${id}'`;

  const result = await pool.query(query);

  return result;
};
