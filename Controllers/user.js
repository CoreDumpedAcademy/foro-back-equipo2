const User = require('../models/user');

function signup(req, res) {
  if (!req.body['password']) return res.status(400).send({ error: 'Password needed' });

  const passwordLength = req.body['password'].length;
  if (passwordLength < 6) {
    return res.status(400).send({ error: 'Password is too short, it must be between 6 and 50 characters' });
  }
  if (passwordLength > 50) {
    return res.status(400).send({ error: 'Password is too long, it must be between 6 and 50 characters' });
  }
  
  // Save User in the database
  const user = new User(req.body);
  user.save((err, obj) => {
    if (err) return res.status(400).send({ error: err.message });
    
    return res.status(201).send({ obj });
  });
}

function login(req, res) {
  const { password } = req.body;
  const { email } = req.body;

  User.findOne({ email }, (err, user) => {
    if (err) {
      console.log(err);
      return res.status(500).send({ error: 'There was an error processing your request' });
    }
    if (!user) return res.status(404).send({ error: 'Email not found' });
    
    // TODO compare using bcrypt
    if (password != user.password) return res.status(404).send({ error: 'Wrong password' });
    
    return res.status(200).send({ user });
  });
}

module.exports = {
  signup,
  login,
}
