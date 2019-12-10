const mongoose = require('mongoose');

const CommentSchema = mongoose.Schema({
  postId: {
    type: String,
    required: true,
  },
  parentId: {
    type: String,
  },
  userEmail: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  creationDate: {
    type: Date,
    default: Date.now(),
  },
  editDate: {
    type: Date,
  },
});

module.exports = mongoose.model('Comment', CommentSchema);
