const mongoose = require('mongoose');

const TopicSchema = mongoose.Schema({
  usernameId: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    require: true,
  },
  title: {
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

module.exports = mongoose.model('Topic', TopicSchema);
