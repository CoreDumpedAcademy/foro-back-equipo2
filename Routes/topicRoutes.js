const router = require('express').Router();

const topicController = require('../controllers/topicController');

// Create a new topic
router.post('/create', topicController.create);
// Returns topic object
router.get('/:topicId', topicController.getById);
// Deletes the topic by Id (WIP check for admin rights)
router.delete('/delete/:topicId', topicController.delete);
// Update topic
router.patch('/edit/:topicId', topicController.edit);

module.exports = router;