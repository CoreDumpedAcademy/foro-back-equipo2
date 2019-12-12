const router = require('express').Router();

const topicController = require('../Controllers/topicController');
const middleware = require('../Middleware/topicMiddleware');

// Create a new topic
router.post('/create', middleware.checkAdmin, topicController.create);
// Returns topic object
router.get('/id/:topicId', topicController.getById);
// Returns all topics
router.get('/all', topicController.getTopics);
// Update topic (username must be given by body)
router.patch('/edit/:topicId', middleware.checkAdmin, topicController.editById);
// Deletes the topic by Id (username must be given by body)
router.delete('/delete/:topicId', middleware.checkAdmin, topicController.deleteById);

module.exports = router;
