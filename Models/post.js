const mongoose = require('mongoose');

const PostSchema = mongoose.Schema({
  topicId: {
    type: Number,
    required: true,
  },
  userEmail: {
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
});

module.exports = mongoose.model('Post', PostSchema);
