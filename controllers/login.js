const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { JWT_SECRET_KEY } = require('../utils/constants');

const { NODE_ENV, JWT_SECRET } = process.env;

function authentication(req, res, next) {
  const { password, email } = req.body;
  return User.findUserByEmail(email, password)
    .then((login) => {
      const token = jwt.sign({ _id: login._id }, NODE_ENV === 'production' ? JWT_SECRET : JWT_SECRET_KEY, { expiresIn: '7d' });
      res.cookie('jwt', token, {
        maxAge: 3600000 * 24 * 7,
        httpOnly: true,
        sameSite: 'none',
        secure: true,
      });
      return res.send({ id: login._id, email: login.email, name: login.name });
    })
    .catch(next);
}

module.exports = {
  authentication,
};
