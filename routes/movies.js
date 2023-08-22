const router = require('express').Router();
const {
  validateCreateMovie,
  validateId,
} = require('../middlewares/validations');
const {
  getMovies,
  createMovies,
  deleteMoviesById,
} = require('../controllers/movies');
const auth = require('../middlewares/auth');

router.get('/movies', auth, getMovies);
router.post('/movies', auth, validateCreateMovie, createMovies);
router.delete('/movies/:id', auth, validateId, deleteMoviesById);

module.exports = router;
