const router = require('express').Router();

const user = require('../controllers/user');
const middleware = require('../Middleware/auth');

// Create a new user
router.post('/signup', user.signup);
// Returns user object (until tokens are implemented)
router.post('/login', user.login);

// Return user object if token verification (middleware.isAuth) is correct
router.route('/loginToken')
  .get(middleware.isAuth, user.getUser);

router.route('/users')
  .get(user.getUsers);

router.route('/user/:data')
  .get(user.getUser);

module.exports = router;
