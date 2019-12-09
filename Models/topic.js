const mongoose = require('mongoose');

const TopicSchema = mongoose.Schema({
  topicId: {
    type: Number,
    unique: true,
    required: true,
  },
  adminEmail: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Topic', TopicSchema);
