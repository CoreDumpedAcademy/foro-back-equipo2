const router = require('express').Router();

const user = require('../controllers/user');

// Create a new user
router.post('/signup', user.signup);
// Returns user object (until tokens are implemented)
router.post('/login', user.login);

module.exports = router;
