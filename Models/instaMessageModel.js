mongoose = require('mongoose');

const instaMessageModel = mongoose.Schema({
    sendeusernameId: {
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