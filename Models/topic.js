const mongoose = require('mongoose');

const TopicSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
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
