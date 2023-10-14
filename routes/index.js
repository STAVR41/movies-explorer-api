const rateLimit = require('express-rate-limit');
const router = require('express').Router();
const usersRouter = require('./users');
const moviesRouter = require('./movies');
const NotFoundError = require('../utils/errors/notFoundError');

const limiter = rateLimit({ windowMs: 10 * 60 * 1000, max: 100 });
router.use(limiter);

router.use(usersRouter);
router.use(moviesRouter);
router.use((req, res, next) => {
  next(new NotFoundError('Маршрут не найден'));
});

module.exports = router;
