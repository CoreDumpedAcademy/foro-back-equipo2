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

function getPMs(req, res) {
  PM.find({}, (err, pms) => {
    if (err) return res.status(500).send({ err });

    return res.status(200).send({ pms });
  });
}

function getPMsFromUser(req, res) {
  const senderUsername = { senderUsername: req.params.senderUsername };

  PM.find(senderUsername, (err, pm) => {
    if (err) {
      console.log(err);
      return res.status(500).send({ error: 'There was an error processing your request' });
    }
    if (!pm) return res.status(404).send({ error: 'No PMs from this user.' });
    return res.status(200).send({ pm });
  });
}


module.exports = {
  sendPM,
  getPMs,
  getPMsFromUser,
};
