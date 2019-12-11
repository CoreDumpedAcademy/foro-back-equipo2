const jwt = require('jsonwebtoken');


//Take token from headers and check if it is correct
function isAuth(req, res, next){
  const { token } = req.headers;

  if(!token) return res.status(404).send({ message: 'token is missing' });
  
  jwt.verify(token, "contraseña", (err, decodedToken) => {
    if(err) return res.status(403).send({ message: 'access forbiden, invalid token'});

    res.username = decodedToken.Username;
  });

  next();
}

module.exports = {
  isAuth,
}