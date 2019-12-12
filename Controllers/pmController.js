const PM = require('../Models/pmModel');

function sendPM(req, res) {
  // senderUsername must be taken from token
  // still needs to check if receiverUsername exists
  if (!req.body.receiverUsername) return res.status(400).send({ error: 'Recipient needed' });
  if (!req.body.title) return res.status(400).send({ error: 'Title needed' });
  if (!req.body.content) return res.status(400).send({ error: 'Content needed' });

  const pm = new PM(req.body);

  pm.save((err, obj) => {
    if (err) return res.status(400).send({ error: err.message });
    return res.status(201).send({ obj });
  });
}

function getUserPMs(req, res) {
  // get the username that is logged in
  const currentUser = { receiverUsername: req.params.receiverUsername };

  PM.find(currentUser, (err, pm) => {
    if (err) {
      console.log(err);
      return res.status(500).send({ error: 'There was an error processing your request' });
    }
    if (!pm) return res.status(404).send({ error: 'This user has no PMs.' });
    return res.status(200).send({ pm });
  });
}

module.exports = {
  sendPM,
  getUserPMs,
};
