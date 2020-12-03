const jwt = require('jsonwebtoken');
const secrets = require('../sql/secrets');
var users = require('../sql/users.json');
const db = require('./db');


exports.authenticate = async (req, res) => {
  console.log('authenticating');
  const { email, password } = req.body;
  const user = await db.checkHash(email, password);

  if (user) {
    const accessToken = jwt.sign(
      {email: user.email, role: user.role},
      secrets.accessToken, {
        expiresIn: '10s',
        algorithm: 'HS256'
      });
    res.json({email: user.email, accessToken: accessToken});
  } else {
    res.status(401).send('Username or password incorrect');
  }
};

exports.check = (req, res, next) => {
  console.log('authenticating');
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(' ')[1];
    jwt.verify(token, secrets.accessToken, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }
      req.user = user;
      next();
    });
  } else {
    res.sendStatus(401);
  }
};
