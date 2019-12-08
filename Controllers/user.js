const User = require('../models/user');

function signup(req, res) {
  if (!req.body['password']) return res.status(400).send({ error: 'Password needed' });

  const passwordLength = req.body['password'].length;
  if (passwordLength < 6) {
    return res.status(400).send({ error: 'Password is too short, it must be between 6 and 128 characters' });
  } else if (passwordLength > 128) {
    return res.status(400).send({ error: 'Password is too long, it must be between 6 and 128 characters' });
  }
  
  // Save User in the database
  const user = new User(req.body);
  user.save((err, obj) => {
    if (err) return res.status(400).send({ error: err.message });
    else return res.status(201).send({ obj });
  });
}

function login(req, res) { // ToDo
  return res.status(200).send(req.body);
}

module.exports = {
  signup,
  login,
}
