const bcrypt = require('bcrypt');

const User = require('../models/user');
const UserServices = require('../Services/userServices');

// Password hashing
const saltRounds = 10;

function signup(req, res) {

  if (!req.body.password) return res.status(400).send({ error: 'Password needed' });

  const passwordLength = req.body.password.length;
  if (passwordLength < 6) {
    return res.status(400).send({ error: 'Password is too short, it must be between 6 and 50 characters' });
  }
  if (passwordLength > 50) {
    return res.status(400).send({ error: 'Password is too long, it must be between 6 and 50 characters' });
  }

  if (!req.body.username) return res.status(400).send({ error: 'Username needed' });

  if (req.body.username.includes('@')) return res.status(400).send({ error: "Username cannot contain '@" });
  const user = new User(req.body);
  // Hash the password
  bcrypt.hash(req.body.password, saltRounds, (err, hashed) => {
    if (err) {
      console.log(err);
      return res.status(500).send({ error: 'There was an error processing your request' });
    }

    user.password = hashed;

    // Save User
    user.save((err, obj) => {
      if (err) return res.status(400).send({ error: err.message });
      return res.status(201).send({ obj });
    });
  });
}

function login(req, res) {
  const { password } = req.body;
  const { email } = req.body;
  const { username } = req.body;

  let field;
  // If username exists then field = { "username":username } else field = { "email":email }
  username ? field = { "username":username } : field = { "email":email };

  User.findOne(field, (err, user) => {
    if (err) {
      console.log(err);
      return res.status(500).send({ error: 'There was an error processing your request' });
    }
    if (!user) return res.status(404).send({ error: 'User not found' });

    // Compare using bcrypt
    bcrypt.compare(password, user.password, (err, same) => {
      if (err) {
        console.log(err);
        return res.status(500).send({ error: 'There was an error processing your request' });
      }
      if (!same) return res.status(404).send({ error: 'Wrong password' });
     
      return res.status(200).send({ userData: user, token: UserServices.createToken(user) });
    })
  });
}

//find the username by username or email.
function getUser(req, res){
  
  const { data } = req.params;

  User.findOne({ 
    $or:[
      {'username': data},
      {'email': data},
    ],
  }, (err, user) => {
    
    if (user) return res.status(200).send({ user });

  });
  return res.status(404).send({ message: 'User not found' });
}

//get all the users from the database
function getUsers(req, res){

  User.find( {}, (err, users) => {
    if (err) return res.status(500).send({err});

    return res.status(200).send({ users });

  });
}

module.exports = {
  signup,
  login,
  getUser,
  getUsers,
};

