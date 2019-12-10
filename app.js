const express = require('express');
const bodyParser = require('body-parser');

// Import routes
const user = require('./routes/user');

// Initialize the app
const app = express();

// Parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// Parse requests of content-type - application/json
app.use(bodyParser.json());

// Set /user as base url for user
app.use('/user', user);

module.exports = app;
