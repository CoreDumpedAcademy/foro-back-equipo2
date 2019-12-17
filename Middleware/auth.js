const jwt = require('jsonwebtoken');
const User = require('../Models/userModel');

//Take token from headers and check if it is correct
function isAuth(req, res, next){
  const { token } = req.headers;

  if(!token) return res.status(404).send({ message: 'token is missing' });
  
  jwt.verify(token, "contraseña",  { complete: true }, (err, decodedToken) => {
    if(err) return res.status(403).send({ message: 'access forbiden, invalid token'});
    
    res.locals.username = decodedToken.payload.Username;
  });

  next();
}

function checkAdmin(req, res, next){
  User.findById(req.body.usernameId, (err, user) => {
      if (err) return res.status(404).send({ message: 'User not found' });
      if (user.admin == undefined || user.admin == 0) return res.status(403).send({ message: 'Access forbiden' });
     
      next();
  });
}

module.exports = {
  isAuth,
  checkAdmin,
}