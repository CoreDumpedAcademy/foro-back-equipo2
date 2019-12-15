const router = require('express').Router();

const postRoutes = require('../Controllers/postController');
const middleware = require('../Middleware/PostMiddleware');

// Create a new post
router.post('/new', middleware.checkTopic, postRoutes.createPost);
// Returns post object
router.get('/id/:postId', postRoutes.getPost);
// Returns user posts
router.get('/user/:usernameId', postRoutes.getUserPosts);
// Returns topic posts
router.get('/topic/:topicId', postRoutes.getTopicPosts);
// Deletes post (usernameId must be sent in body)
router.delete('/delete/:postId', middleware.checkUser, postRoutes.deletePost);
// Returns post object (usernameId must be sent in body)
router.patch('/edit/:postId', middleware.checkUser, postRoutes.patchPost);
// Find any post which have coincidences
router.get('/find/:data', postRoutes.postFinder);

module.exports = router;
