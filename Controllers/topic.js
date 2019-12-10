const Topic = require('../Models/topic');

function getTopics(req, res) {
  Topic.find({ }, (err, topics) => {
    if (err) return res.status(500).send({ err });

    return res.status(200).send({ topics });
  });
}

module.exports = {
  getTopics,
};
