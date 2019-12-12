const Post = require('../Models/postModel');

function createPost(req, res) {
  if (!req.body.content) return res.status(400).send({ error: 'Content needed' });

  const post = new Post(req.body);
  // WIP check if the topicId exists
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
  patch.editDate = Date.now();

  Post.findByIdAndUpdate(postId, patch, (err, post) => {
    if (err) return res.status(500).send({ error: err });
    if (!post) return res.status(404).send({ error: 'Post not found' });

    return res.status(200).send({ message: 'Post Updated', post });
  });
}

function postFinder(req, res) {
  const { data } = req.params;

  Post.find( {
    $or:[
      { 'content': new RegExp('.*' + data, 'i') },
      { 'title': new RegExp('.*' + data, 'i') },
      { 'username': new RegExp('^' + data, 'i') },
    ],
  }, (err , result) => {
    if (result.length == 0) return res.status(404).send({ message: 'Post not found' });

    return res.status(200).send({ result });
  });
}

module.exports = {
  createPost,
  getPost,
  getUserPosts,
  getTopicPosts,
  deletePost,
  patchPost,
  postFinder,
};
