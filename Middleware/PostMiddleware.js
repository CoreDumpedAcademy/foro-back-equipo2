const Topic = require('../Models/topicModel');
const Post = require('../Models/postModel');

function checkTopic(req, res, next){
    Topic.findById(req.body.topicId, (err) => {
        if (err) return res.status(404).send({ message: 'Topic id not found, couldnt save the post' });

        next();
    });
}

function checkUser(req, res, next){
    Post.findById(req.params.postId, (err, post) => {
        if (err) return res.status(404).send({ message: 'Post Id not found' });
        if (post.username != req.body.username) return res.status(401).send({ message: 'User not allowed to delete the post' });

        next();
    });
}

module.exports = {
    checkTopic,
    checkUser,
}
