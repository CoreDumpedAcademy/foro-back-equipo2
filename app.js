const express = require('express');
const bodyParser = require('body-parser');

// Import routes
const userRoutes = require('./Routes/userRoutes');
const postRoutes = require('./Routes/postRoutes');
const topicRoutes = require('./Routes/topicRoutes');

// Initialize the app
const app = express();

// Parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// Parse requests of content-type - application/json
app.use(bodyParser.json());

//allow access to the API
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Headers', '*');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Alow-Methods', 'PUT,GET,POST,OPTIONS');
  next();
});

//Base urls
app.use('/user', userRoutes);
app.use('/topic', topicRoutes);
app.use('/post', postRoutes);

module.exports = app;
