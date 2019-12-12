const router = require('express').Router();

const commentController = require('../Controllers/commentController');

// Create a new comment
router.post('/new', commentController.createComment);
// Returns comment object
router.get('/id/:commentId', commentController.getComment);
// Returns user comments
router.get('/user/:username', commentController.getUserComments);
// Returns post comments
router.get('/post/:postId', commentController.getPostComments);
// Deletes comment
router.delete('/delete/:commentId', commentController.deleteComment);
// Returns comment object
router.patch('/edit/:commentId', commentController.patchComment);

module.exports = router;
