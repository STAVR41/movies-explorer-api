const User = require('../models/user');
const NotFoundError = require('../utils/errors/notFoundError');
const ValidationError = require('../utils/errors/validationError');

function getCurrentUser(req, res, next) {
  const { _id } = req.user;
  User.findOne({ _id })
    .orFail(new NotFoundError('Пользователь с указанным id не найден'))
    .then((user) => res.send(user))
    .catch(next);
}
function updateProfile(req, res, next) {
  const { name, email } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, email }, { new: true, runValidators: true })
    .orFail(() => new NotFoundError('Пользователь с указанным id не существует'))
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') return next(new ValidationError('Некорректные данные'));
      return next(err);
    });
}
function logout(req, res) {
  res.clearCookie('jwt', {
    sameSite: 'none',
    secure: true,
  });
  res.send({ message: 'Cookie delete' });
}
module.exports = {
  getCurrentUser,
  updateProfile,
  logout,
};
