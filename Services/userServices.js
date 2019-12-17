const jwt = require('jsonwebtoken');

// Generate a token with the username which expires in 14 days (seconds*minutes*hours*days)
function createToken(user) {
  const payload = {
    Username: user.username,
    id: user._id,
  };

  return jwt.sign(payload, 'contraseña', { expiresIn: 60 * 60 * 24 * 14 });
}

module.exports = {
  createToken,
};
