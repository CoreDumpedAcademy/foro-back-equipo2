const Topic = require('../Models/topicModel');

function getTopics(req, res) {
  Topic.find({ }, (err, topics) => {
    if (err) return res.status(500).send({ error: 'There was an error processing your request' });

    return res.status(200).send({ topics });
  });
}

function create(req, res) { // WIP Proteger para admin
  if(req.body['editDate']) return res.status(403).send({ error: 'editDate forbidden' });

  const topic = new Topic(req.body);
  topic.save((err, obj) => {
    if (err) return res.status(400).send({ error: err });

    return res.status(200).send({ message: 'Topic created successfully', obj });
  });
}

function getById(req, res) {
  const { topicId } = req.params['topicId'];
  if (!topicId) return res.status(400).send({ message: 'topicId needed' });

  Topic.findById(topicId, (err, topic) => {
    if (err) return res.status(500).send({ error: 'There was an error processing your request' });
    if (!topic) return res.status(404).send({ error: 'Topic not found' });

    return res.status(200).send({ topic });
  });
}

function deleteById(req, res) { // WIP Proteger para admin
  const { topicId } = req.params['topicId'];
  if (!topicId) return res.status(400).send({ message: 'topicId needed' });

  Topic.deleteById(topicId, (err, topic) => {
    if (err) return res.status(500).send({ error: 'There was an error processing your request' });
    if (!topic) return res.status(404).send({ error: 'Topic not found' });

    return res.status(200).send({ topic });
  });
}

function editById(req, res) {
  const { topicId } = req.params['topicId'];
  if (!topicId) return res.status(400).send({ message: 'topicId needed' });

  Topic.findByIdAndUpdate(topicId, (err, topic) => {
    if (err) return res.status(500).send({ error: 'There was an error processing your request' });
    if (!topic) return res.status(404).send({ error: 'Topic not found' });

    return res.status(200).send({ topic });
  });
}

module.exports = {
  create,
  getById,
  deleteById,
  editById,
  getTopics,
}
