const mongoose = require('mongoose');

const CommentSchema = mongoose.Schema({
  postId: {
    type: String,
    required: true,
  },
  parentId: {
    type: String,
  },
  content: {
    type: String,
    required: true,
  },
  upvoters: {
    type: [String], 
  },
  downvoters: {
    type: [String],
  },
  rating: {
    type: Number,
    default: 0,
  },
  voteType: {
    type: String,
  },
  creationDate: {
    type: Date,
    default: Date.now(),
  },
  editDate: {
    type: Date,
  },
  usernameId: {
    type: String,
    require: true,
  },
  logicalDelete: {
    type: Boolean,
    default: false,
  }
});

module.exports = mongoose.model('Comment', CommentSchema);
