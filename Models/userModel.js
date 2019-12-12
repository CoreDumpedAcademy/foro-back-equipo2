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
    // 0 if regular user or 1 for admin access
  },
});

module.exports = mongoose.model('User', UserSchema);
