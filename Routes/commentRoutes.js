const router = require('express').Router();

const commentController = require('../Controllers/commentController');
const middleware = require('../Middleware/commentMiddleware');

// Create a new comment
router.post('/new', commentController.createComment);
// Rates a comment
router.post('/vote/:commentId', commentController.rateComment);
// Returns comment object
router.get('/id/:commentId', commentController.getComment);
// Returns user comments
router.get('/user/:usernameId', commentController.getUserComments);
// Returns post comments
router.get('/post/:postId', commentController.getPostComments);
// Deletes comment (usernameId must be given by body)
router.delete('/delete/:commentId', middleware.checkUser, commentController.deleteComment);
// Returns comment object (usernameId must be given by body)
router.patch('/edit/:commentId', middleware.checkUser, commentController.patchComment);

module.exports = router;
