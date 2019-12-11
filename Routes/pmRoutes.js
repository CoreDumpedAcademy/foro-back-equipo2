const router = require('express').Router();

const pmController = require('../Controllers/pmController');

// Send PM
router.post('/pm/send', pmController.sendPM);
// Get all PMs
router.get('/pm', pmController.getPMs);
// Returns PMs from certain user
router.get('/pm/:senderUsername', pmController.getPMsFromUser);

module.exports = router;
