const mongoose = require('mongoose');

const instaMessageModel = mongoose.Schema({
    senderUsernameId: {
        type: String,
        require: true,
    },
    receiverUsernameId: {
        type: String,
        require: true,
    },
    content: {
        type: String,
        require: true,
    },
});

module.exports = mongoose.model('instaMessage', instaMessageModel);
