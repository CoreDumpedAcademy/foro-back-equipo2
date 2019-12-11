const router = require('express').Router();

const postRoutes = require('../Controllers/postController');

// Create a new post
router.post('/new', postRoutes.createPost);
// Returns post object
router.get('/:postId', postRoutes.getPost);
// Returns user posts
router.get('/user/:username', postRoutes.getUserPosts);
// Returns topic posts
router.get('/topic/:topicId', postRoutes.getTopicPosts);
// Deletes post
router.delete('/delete/:postId', postRoutes.deletePost);
// Returns post object
router.patch('/edit/:postId', postRoutes.patchPost);
// Find any post which have coincidences
router.get('/find/:data', postRoutes.postFinder);

module.exports = router;
