const router = require('express').Router();

const postRoutes = require('../Controllers/postController');

// Create a new post
router.post('/p/new', postRoutes.createPost);
// Returns post object
router.get('/p/:postId', postRoutes.getPost);
// Returns user posts
router.get('/user/:username', postRoutes.getUserPosts);
// Returns topic posts
router.get('/topic/:topicId', postRoutes.getTopicPosts);
// Deletes post
router.delete('/p/:postId/delete', postRoutes.deletePost);
// Returns post object
router.patch('/p/:postId/edit', postRoutes.patchPost);

module.exports = router;
