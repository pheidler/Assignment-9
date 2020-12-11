const db = require('./db');


/* Handles GET requests to /v0/mail */
exports.getMailbox = async (req, res) => {
  //await db.reset();
  const mailbox = req.query.mailbox;
  const emails = await db.selectMailbox(mailbox, req.user.email);
  res.status(200).json(emails);
};

/* Handles GET requests to /v0/mailboxes */
exports.getMailboxes = async (req, res) => {
  const mailboxesCount = await db.selectMailboxes(req.user.email);
  const mailboxes = await db.selectUserMailboxes(req.user.email);

  const returnMailboxes = mergeMailboxes(mailboxesCount, mailboxes);
  res.status(200).json(returnMailboxes);
};

/* Handles POST requests to /v0/mail/:id */
exports.postMail = async (req, res) => {
  const id = req.params['id'];
  const email = req.body;

  const result = await db.updateEmail(id, email);
  res.status(200).json({'code': 200, 'message': 'Success: Email has been updated.'});
};

exports.postNewMail = async (req, res) => {
  const from = req.params['email'];
  const email = req.body;

  const result = await db.insertEmail(email);
  console.log('result');
  res.status(200).json({'code': 200, 'message': 'Success: Email has been sent.'});
}

exports.getUser = async (req, res) => {
  const email = req.query.email;
  const result = await db.selectUser(email);
  res.status(200).json(result);
}

exports.postUser = async (req, res) => {
  const user = req.body;
  const result = await db.updateUser(user);
  res.status(200).json({'code': 200, 'message': 'Success: User has been updated.'});
}
/* Helper functions */

function mergeMailboxes(mailboxesCount, mailboxes) {
  let mailboxObj = [];
  for(let i = 0; i < mailboxes.length; i++) {
    mailboxObj.push({
      mailbox: mailboxes[i],
      emails: 0,
    });
    for(let j = 0; j < mailboxesCount.length; j++) {
      if(mailboxes[i] === mailboxesCount[j]['mailbox']) {
        mailboxObj[i]['emails'] = mailboxesCount[j]['emails'];
      }
    }
  }
  return mailboxObj;
}
