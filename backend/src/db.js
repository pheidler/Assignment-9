const fs = require('fs');
const {Pool} = require('pg');

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

exports.selectMailbox = async (mailbox) => {
  const query = `
    SELECT id, mail->'from' AS from, mail->'to' AS to, mail->'subject' AS subject, mail->'sent' AS sent, mail->'received' AS received, mail->'content' AS content, starred
    FROM mail
    WHERE mailbox='${mailbox}'`;
  const {rows} = await pool.query(query);
  return (rows);
};


exports.updateEmail = async (id, updatedEmail) => {
  updatedEmail.starred = !updatedEmail.starred;
  const query = `
    UPDATE mail
    SET starred = ${updatedEmail.starred}
    WHERE id='${id}'`;

  const result = await pool.query(query);

  return result;
};
