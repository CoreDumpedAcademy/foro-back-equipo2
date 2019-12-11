const mongoose = require('mongoose');
const app = require('./app');

const mongoURL = 'mongodb+srv://admin:123@cluster0-zbxps.mongodb.net/test?retryWrites=true&w=majority';
const mongoPort = 3000;

// Connecting to the database
mongoose.connect(mongoURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  // Listen for requests
  app.listen(mongoPort, () => {
    console.log(`Server listening on port: ${mongoPort}`);
  });
}).catch((err) => {
  console.log('Could not connect to the database', err);
});