const db = require('./db');


/* Handles GET requests to /v0/mail */
exports.getMailbox = async (req, res) => {
  const mailbox = req.query.mailbox;
  console.log('here1');
  const emails = await db.selectMailbox(mailbox);
  console.log(emails);

};
