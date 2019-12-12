const Comment = require('../Models/commentModel');

function checkUser(req, res, next){
    Comment.findById(req.params.commentId, (err, comment) => {
        if (err) return res.status(404).send({ message: 'Comment not found' });
        if (req.body.username != comment.username) return res.status(401).send({ message: 'User not allowed to delete the post' });

        next();
    });
}

module.exports = {
    checkUser,
}
