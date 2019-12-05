const mongoose = require('mongoose');
const app = require('./app');

const mongoURL = 'mongodb://localhost:27017/foro-back-equipo2';
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
  console.log('Could not connect to the database. Exiting now...', err);
  process.exit();
});
