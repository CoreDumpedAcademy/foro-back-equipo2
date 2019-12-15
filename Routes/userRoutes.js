const router = require('express').Router();

const userController = require('../Controllers/userController');
const middleware = require('../Middleware/auth');

// Create a new user
router.post('/signup', userController.signup);
// Returns user object (until tokens are implemented)
router.post('/login', userController.login);

// Return user object if token verification (middleware.isAuth) is correct
router.route('/loginToken')
  .get(middleware.isAuth, userController.loginToken);
// Return all the users from the database
router.route('/users')
  .get(userController.getUsers);
//Return one user by username or email
router.route('/user/:data')
  .get(userController.getUser);
//Edit any username field by username as params
router.patch('/editUser/:username', userController.editUser);

module.exports = router;
