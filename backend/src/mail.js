const db = require('./db');


/* Handles GET requests to /v0/mail */
exports.getMailbox = async (req, res) => {
  console.log('this is happening');

  //await db.reset();
  const mailbox = req.query.mailbox;
  const emails = await db.selectMailbox(mailbox);
  res.status(200).json(emails);
};

/* Handles GET requests to /v0/mailboxes */
exports.getMailboxes = async (req, res) => {
  const mailboxes = await db.selectMailboxes();
  res.status(200).json(mailboxes);
};

/* Handles POST requests to /v0/mail/:id */
exports.postMail = async (req, res) => {
  const id = req.params['id'];
  const email = req.body;
  const result = await db.updateEmail(id, email);
  res.status(200).json({'code': 200, 'message': 'Success: Email has been updated.'});
};
