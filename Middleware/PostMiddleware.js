const Topic = require('../Models/topicModel');
const Post = require('../Models/postModel');
const Auth = require('../Middleware/auth');

function checkTopic(req, res, next){
    Topic.findById(req.body.topicId, (err) => {
        if (err) return res.status(404).send({ message: 'Topic id not found, couldnt save the post' });

        next();
    });
}

function checkUser(req, res, next){
    Post.findById(req.params.postId, (err, post) => {
        if (err) return res.status(404).send({ message: 'Post not found' });
        if (post.usernameId != req.body.usernameId) return Auth.checkAdmin(req, res, next);

        next();
    });
}

module.exports = {
    checkTopic,
    checkUser,
}
