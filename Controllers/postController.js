const Post = require('../Models/postModel');
const User = require('../Models/userModel');

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
  const { usernameId } = req.params;
  var pageNo = parseInt(req.query.pageNo);
  var size = parseInt(req.query.size);
  var query = {};

  if (pageNo < 0 || pageNo === 0) return res.send({ err: "Invalid page number" }); 

  query.skip = size * (pageNo - 1);
  query.limit = size;

  Post.find( { 'usernameId':usernameId, logicalDelete: { $ne: true } }, {}, query, (err, posts) => {
    if (err) {
      console.log(err);
      return res.status(500).send({ error: 'There was an error processing your request' });
    }
    if (!posts) return res.status(404).send({ error: 'No Posts found in user' });
    return res.status(200).send({ posts });
  });
}

function getTopicPosts(req, res) {
  const { topicId } = req.params;
  var pageNo = parseInt(req.query.pageNo);
  var size = parseInt(req.query.size);
  var query = {};

  if (pageNo < 0 || pageNo === 0) return res.send({ err: "Invalid page number" }); 

  query.skip = size * (pageNo - 1);
  query.limit = size;

  Post.find({ 'topicId':topicId, logicalDelete: { $ne: true } }, {}, query, (err, posts) => {
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

  Post.findByIdAndUpdate(postId, { logicalDelete: true }, (err, post) => {
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

  User.find({ 'username': data }, (err, user) => {
    
    var usernameId = null;
    if ( user.length != 0) usernameId = user[0]._id;

    Post.find( {
      $or:[
        { 'content': new RegExp('.*' + data, 'i'), logicalDelete: { $ne: true } },
        { 'title': new RegExp('.*' + data, 'i'), logicalDelete: { $ne: true } },
        { 'usernameId': usernameId },
      ],
    }, (err , result) => {
      if (result.length == 0) return res.status(404).send({ message: 'Post not found' });
  
      return res.status(200).send({ result });
    });
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
