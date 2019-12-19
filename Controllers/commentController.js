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

  Comment.findById(commentId, {logicalDelete: false}, (err, comment) => {
    if (err) {
      console.log(err);
      return res.status(500).send({ error: 'There was an error processing your request' });
    }
    if (!comment) return res.status(404).send({ error: 'Comment not found' });
    return res.status(200).send({ comment });
  });
}

function getUserComments(req, res) {
  const { usernameId } = req.params;
  var pageNo = parseInt(req.query.pageNo);
  var size = parseInt(req.query.size);
  var query = {};

  if (pageNo < 0 || pageNo === 0) return res.send({ err: "Invalid page number" }); 

  query.skip = size * (pageNo - 1);
  query.limit = size;

  Comment.find({ 'usernameId':usernameId }, {}, query, (err, comments) => {
    if (err) {
      console.log(err);
      return res.status(500).send({ error: 'There was an error processing your request' });
    }
    if (!comments) return res.status(404).send({ error: 'No Comments found in user' });
    return res.status(200).send({ comments });
  });
}

function getPostComments(req, res) {
  const  { postId } = req.params;
  var pageNo = parseInt(req.query.pageNo);
  var size = parseInt(req.query.size);
  var query = {};

  if (pageNo < 0 || pageNo === 0) return res.send({ err: "Invalid page number" }); 

  query.skip = size * (pageNo - 1);
  query.limit = size;

  Comment.find({ 'postId':postId }, {}, query, (err, comments) => {
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

  Comment.findByIdAndUpdate(commentId, {logicalDelete: true}, (err, comment) => {
    if (err) return res.status(500).send({ error: err });
    if (!comment) return res.status(404).send({ error: 'Comment not found' });

    return res.status(200).send({ message: 'Comment Deleted', comment });
  });
}

function rateComment(req, res) {
  const commentId = req.params.commentId;
  const request = req.body;
  var rating = 0;
  var totalUpvoters;
  var totalDownvoters;
  var voterType = null;

  if (request["voteType"]  == "") {
    Comment.findByIdAndUpdate(commentId, {
      $pull: {
        "upvoters": request["usernameId"],
        "downvoters": request["usernameId"],
      }
    }, {new: true}, (err, response) => {
      if (err) return res.status(500).send({ error: err });
      totalUpvoters = response.upvoters.length;
      totalDownvoters = response.downvoters.length;
      rating = totalUpvoters - totalDownvoters;
      Comment.findByIdAndUpdate(commentId, {
        $set: {
          "rating": rating,
        },
       }, {new: true}, (err, response) => {
        if (err) return res.status(500).send({ error: err });
        return res.status(200).send({ response });
    });
    });
  }
  // If user is in downvoters list, remove and add to the upvoters
  if (request["voteType"] == "up") {
    voterType = "upvoters";
    Comment.findByIdAndUpdate(commentId, {
      $pull: {
        "downvoters": request["usernameId"],
      }, 
    }, {new: true}, (err, response) => {
      if (err) return res.status(500).send({ error: err });
    });
  }
  // If user is in upvoters list, remove and add to the downvoters
  else if (request.voteType == "down") {
    voterType = "downvoters";
    Comment.findByIdAndUpdate(commentId, {
      $pull: {
        "upvoters": request["usernameId"],
      },
    }, {new: true}, (err, response) => {
      if (err) return res.status(500).send({ error: err });
    });
  }
  // At the end, we use the counterInc and the voterType to make the changes
  if (request.voteType !== "") {
    Comment.findByIdAndUpdate(commentId, {
      $addToSet: {
        [voterType]: request["usernameId"],
      },
    }, {new: true}, (err, response) => {
      if (err) return res.status(500).send({ error: err });
      totalUpvoters = response.upvoters.length;
      totalDownvoters = response.downvoters.length;
      rating = totalUpvoters - totalDownvoters;
      Comment.findByIdAndUpdate(commentId, {
        $set: {
          "rating": rating,
        },
       }, {new: true}, (err, response) => {
        if (err) return res.status(500).send({ error: err });
        return res.status(200).send({ response });
    });
  });
}
    
}

function patchComment(req, res) {
  const { commentId } = req.params;
  const patch = req.body;
  patch.editDate = Date.now();

  Comment.findByIdAndUpdate(commentId, patch, (err, comment) => {
    if (err) return res.status(500).send({ error: err });
    if (!comment) return res.status(404).send({ error: 'Comment not found' });

    return res.status(200).send({ message: 'Comment Updated', comment });
  });
}

module.exports = {
  rateComment,
  createComment,
  getComment,
  getUserComments,
  getPostComments,
  deleteComment,
  patchComment,
};
