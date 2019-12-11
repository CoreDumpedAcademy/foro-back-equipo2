const express = require('express');
const bodyParser = require('body-parser');

// Import routes
const user = require('./Routes/user');
const postRoutes = require('./Routes/postRoutes');

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

// Set /user as base url for user
app.use('/user', user);
app.use('/post', postRoutes);

module.exports = app;
