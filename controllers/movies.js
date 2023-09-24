const Movies = require('../models/movie');
const ValidationError = require('../utils/errors/validationError');
const NotFoundError = require('../utils/errors/notFoundError');
const ForbiddenError = require('../utils/errors/forbiddenError');

function getMovies(req, res, next) {
  Movies.find({ owner: req.user._id })
    .then((movies) => res.send(movies))
    .catch(next);
}
function createMovies(req, res, next) {
  const movie = req.body;
  Movies.create({ ...movie, owner: req.user._id })
    .then((film) => res.status(201).send(film))
    .catch((err) => {
      if (err.name === 'ValidationError') return next(new ValidationError('Некорректные данные при создании карточки'));
      return next(err);
    });
}
function deleteMoviesById(req, res, next) {
  Movies.findById(req.params.id)
    .orFail(() => new NotFoundError('Карточки с указанным id не существует'))
    .then((film) => {
      if (!film.owner.equals(req.user._id)) return next(new ForbiddenError('Вы можете удалять только свои карточки'));
      return Movies.findByIdAndRemove(req.params.id)
        .then(() => res.send({ data: film }))
        .catch(next);
    })
    .catch(next);
}

module.exports = {
  getMovies,
  createMovies,
  deleteMoviesById,
};
