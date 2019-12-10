const router = require('express').Router();

const topic = require('../Controllers/topic');

// Returns all topics
router.get('/t/all', topic.getTopics);

module.exports = router;
