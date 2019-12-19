const mongoose = require('mongoose');

const PostSchema = mongoose.Schema({
  topicId: {
    type: String,
    required: true,
  },
  usernameId: {
    type: String,
    required: true,
  },
  title: {
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
  logicalDelete: {
    type: Boolean,
    default: false,
  }
});

module.exports = mongoose.model('Post', PostSchema);
