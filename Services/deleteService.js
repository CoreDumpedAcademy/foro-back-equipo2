const Post = require('../Models/postModel');
const Comment = require('../Models/commentModel');

function deleteAllPosts(topicId){
  Post.find({ 'topicId': topicId}, (err, data) => {
    if (err) return false;
    if (!data) return false;

    for(var i=0; i<data.length; i++){
      Post.findByIdAndUpdate(data[i]._id, { logicalDelete: true }, (err, data) => {
        if (err) return false;
        if (!data) return false;

        deleteAllComments(data[i]._id);
      });
    }
    return true;
  });
}

function deleteAllComments(postId){
  Comment.find({ 'postId': postId, logicalDelete: false }, (err, data) => {
    if (err) return false;
    if (!data) return false;

    for(var i; i<data.length; i++){
      Comment.findByIdAndUpdate(data[i]._id, { logicalDelete: true }, (err, data) => {
        if (err) return false;
        if (!data) return false;
      });
    }
    return true;
  });
}

module.exports = {
  deleteAllPosts,
  deleteAllComments,
}