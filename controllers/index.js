const express = require('express');
const apiRoutes = require('./api');

const app = express();

app.use('/api', apiRoutes);

app.get('/', (req, res) => {
  res.status(200).send('its working!');
});

module.exports = app;