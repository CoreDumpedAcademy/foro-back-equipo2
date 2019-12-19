const InstaMessage = require('../Models/instaMessageModel');

function saveInstaMessage(req, res) {
    if (!req.body.receiverUsernameId) return res.status(400).send({ error: 'Recipient needed' });
    if (!req.body.usernameId) return res.status(400).send({ error: 'Title needed' });
    if (!req.body.content) return res.status(400).send({ error: 'Content needed' });
  
    const instaMessage = new InstaMessage(req.body);
  
    instaMessage.save((err, obj) => {
      if (err) return res.status(400).send({ error: err.message });
      return res.status(201).send({ obj });
    });
  }
  
  function getUserInstantMessages(req, res) {
    const currentUser =  req.params.usernameId;
  
    InstaMessage.find({ 'receiverUsernameId': currentUser, logicalDelete: false }, (err, instaMessage) => {
      if (err) {
        console.log(err);
        return res.status(500).send({ error: 'There was an error processing your request' });
      }
      if (!instaMessage) return res.status(404).send({ error: 'This user has no InstaMessages.' });
      return res.status(200).send({ instaMessage });
    });
  }

  function getUserInstaMessagesSent(req, res) {
    // get the username that is logged in
    const currentUser =  req.params.usernameId;
  
    InstaMessage.find({ 'senderUsernameId': currentUser, logicalDelete: false }, (err, instaMessage) => {
      if (err) {
        console.log(err);
        return res.status(500).send({ error: 'There was an error processing your request' });
      }
      if (!instaMessage) return res.status(404).send({ error: 'This user hasn´t sent any insta message.' });
      return res.status(200).send({ instaMessage });
    });
  }

module.exports = {
    saveInstaMessage,
    getUserInstantMessages,
    getUserInstaMessagesSent,
};
