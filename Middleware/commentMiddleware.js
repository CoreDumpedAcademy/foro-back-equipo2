const Comment = require('../Models/commentModel');
const Auth = require('../Middleware/auth');

function checkUser(req, res, next){
    Comment.findById(req.params.commentId, (err, comment) => {
        if (err) return res.status(404).send({ message: 'Comment not found' });
        if (req.body.usernameId != comment.usernameId) return Auth.checkAdmin(req, res, next);

        next();
    });
}

module.exports = {
    checkUser,
}
