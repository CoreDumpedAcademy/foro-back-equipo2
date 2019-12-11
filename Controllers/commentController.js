const Comment = require('../Models/commentModel');

function createComment(req, res) {
  if (!req.body.content) return res.status(400).send({ error: 'Content needed' });

  const comment = new Comment(req.body);

  comment.save((err, obj) => {
    if (err) return res.status(400).send({ error: err.message });
    return res.status(201).send({ obj });
  });
}

function getComment(req, res) {
  const { commentId } = req.params;

  Comment.findById(commentId, (err, comment) => {
    if (err) {
      console.log(err);
      return res.status(500).send({ error: 'There was an error processing your request' });
    }
    if (!comment) return res.status(404).send({ error: 'Comment not found' });
    return res.status(200).send({ comment });
  });
}

// TO BE TESTED AFTER commentModel fix (username instead of userEmail)
function getUserComments(req, res) {
  const username = { username: req.params.username };

  Comment.find(username, (err, comments) => {
    if (err) {
      console.log(err);
      return res.status(500).send({ error: 'There was an error processing your request' });
    }
    if (!comments) return res.status(404).send({ error: 'No Comments found in user' });
    return res.status(200).send({ comments });
  });
}

function getPostComments(req, res) {
  const postId = { postId: req.params.postId };

  Comment.find(postId, (err, comments) => {
    if (err) {
      console.log(err);
      return res.status(500).send({ error: 'There was an error processing your request' });
    }
    if (!comments) return res.status(404).send({ error: 'No Comments found in post' });
    return res.status(200).send({ comments });
  });
}

function deleteComment(req, res) {
  const { commentId } = req.params;

  Comment.findByIdAndDelete(commentId, (err, comment) => {
    if (err) return res.status(500).send({ error: err });
    if (!comment) return res.status(404).send({ error: 'Comment not found' });

    return res.status(200).send({ message: 'Comment Deleted', comment });
  });
}

function patchComment(req, res) {
  const { commentId } = req.params;
  const patch = req.body;

  Comment.findByIdAndUpdate(commentId, patch, (err, comment) => {
    if (err) return res.status(500).send({ error: err });
    if (!comment) return res.status(404).send({ error: 'Comment not found' });

    return res.status(200).send({ message: 'Comment Updated', comment });
  });
}

module.exports = {
  createComment,
  getComment,
  getUserComments,
  getPostComments,
  deleteComment,
  patchComment,
};
