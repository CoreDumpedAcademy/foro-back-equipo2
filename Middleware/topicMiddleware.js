const User = require('../Models/userModel');

function checkAdmin(req, res, next){
    User.find({ 'username': req.body.username }, (err, user) => {
        if (err) return res.status(404).send({ message: 'User not found' });
        if (user.admin == 0 || user.admin === null) return res.status(403).send({ message: 'Access forbiden' });

        next();
    });
}

module.exports = {
    checkAdmin,
}
