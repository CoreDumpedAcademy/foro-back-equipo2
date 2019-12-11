const Post = require('../Models/post');

function createPost(req, res) {
  if (!req.body.content) return res.status(400).send({ error: 'Content needed' });

  const post = new Post(req.body);

  post.save((err, obj) => {
    if (err) return res.status(400).send({ error: err.message });
    return res.status(201).send({ obj });
  });
}

function getPost(req, res) {
  const { postId } = req.params;

  Post.findById(postId, (err, post) => {
    if (err) {
      console.log(err);
      return res.status(500).send({ error: 'There was an error processing your request' });
    }
    if (!post) return res.status(404).send({ error: 'Post not found' });
    return res.status(200).send({ post });
  });
}

function getUserPosts(req, res) {
  const username = { username: req.params.username };

  Post.find(username, (err, posts) => {
    if (err) {
      console.log(err);
      return res.status(500).send({ error: 'There was an error processing your request' });
    }
    if (!posts) return res.status(404).send({ error: 'No Posts found in user' });
    return res.status(200).send({ posts });
  });
}

function getTopicPosts(req, res) {
  const topicId = { topicId: req.params.topicId };

  Post.find(topicId, (err, posts) => {
    if (err) {
      console.log(err);
      return res.status(500).send({ error: 'There was an error processing your request' });
    }
    if (!posts) return res.status(404).send({ error: 'No Posts found in topic' });
    return res.status(200).send({ posts });
  });
}

function deletePost(req, res) {
  const { postId } = req.params;

  Post.findByIdAndDelete(postId, (err, post) => {
    if (err) return res.status(500).send({ error: err });
    if (!post) return res.status(404).send({ error: 'Post not found' });

    return res.status(200).send({ message: 'Post Deleted', post });
  });
}

function patchPost(req, res) {
  const { postId } = req.params;
  const patch = req.body;

  Post.findByIdAndUpdate(postId, patch, (err, post) => {
    if (err) return res.status(500).send({ error: err });
    if (!post) return res.status(404).send({ error: 'Post not found' });

    return res.status(200).send({ message: 'Post Updated', post });
  });
}

module.exports = {
  createPost,
  getPost,
  getUserPosts,
  getTopicPosts,
  deletePost,
  patchPost,
};