const mongoose = require('mongoose');

const PMSchema = mongoose.Schema({
  receiverUsernameId: {
    type: String,
    required: true,
  },
  senderUsernameId: {
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
});

module.exports = mongoose.model('PM', PMSchema);
