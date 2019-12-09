const mongoose = require('mongoose');

const CommentSchema = mongoose.Schema({
  postId: {
    type: Number,
    required: true,
    unique: true,
  },
  parentId: {
    type: Number,
  },
  userEmail: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Comment', CommentSchema);
