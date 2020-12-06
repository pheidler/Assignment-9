const jwt = require('jsonwebtoken');
const secrets = require('../sql/secrets');
const db = require('./db');


exports.authenticate = async (req, res) => {
  console.log('authenticating');
  const { email, password } = req.body;
  const user = await db.checkHash(email, password);

  if (user) {
    const accessToken = jwt.sign(
      {email: user.email, role: user.role},
      secrets.accessToken, {
        expiresIn: '10m',
        algorithm: 'HS256'
      });
    res.json({email: user.email, accessToken: accessToken});
  } else {
    res.status(401).send('Username or password incorrect');
  }
};

exports.check = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(' ')[1];

    jwt.verify(token, secrets.accessToken, (err, user) => {
      if (err) {
        console.log(err);
        return res.sendStatus(403);
      }
      req.user = user;
      next();
    });
  } else {
    res.sendStatus(401);
  }
};
