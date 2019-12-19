const router = require('express').Router();

const instaMessageController = require('../Controllers/instaMessageControler');

// Send instaMessage
router.post('/send', instaMessageController.saveInstaMessage);
// Get all InstaMessages for a user
router.get('/:usernameId', instaMessageController.getUserInstantMessages);
// Get all Instamessages sent of a user
router.get('/sent/:usernameId', instaMessageController.getUserInstaMessagesSent);

module.exports = router;
