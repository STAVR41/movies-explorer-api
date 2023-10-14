const router = require('express').Router();
const {
  validateCreateUser,
  validateLoginUser,
  validateUpdateProfileUser,
} = require('../middlewares/validations');
const {
  getCurrentUser,
  updateProfile,
  logout,
} = require('../controllers/users');
const { createUser } = require('../controllers/createUser');
const { authentication } = require('../controllers/login');
const auth = require('../middlewares/auth');

router.post('/signup', validateCreateUser, createUser);
router.post('/signin', validateLoginUser, authentication);
router.get('/signout', auth, logout);
router.get('/users/me', auth, getCurrentUser);
router.patch('/users/me', auth, validateUpdateProfileUser, updateProfile);

module.exports = router;
