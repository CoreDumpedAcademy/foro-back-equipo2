const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: String,
  surname: String,
  registerDate: {
    type: Date,
    default: Date.now(),
  },
  admin: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model('User', UserSchema);
