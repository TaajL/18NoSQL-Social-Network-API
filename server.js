const express = require('express');
const db = require('./config/connection');
// const logger = require('morgan'); // add a logging library

const app = express();
const PORT = process.env.PORT || 3001;

//app.use(logger('dev')); // log requests and errors

db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
  });
});

db.on('error', (err) => {
  console.error(`Error connecting to database: ${err}`);
});

app.get("/", async (req, res) => {
  try {
    res.status(200).send("this worked!");
  } catch (err) {
    console.error(`Error handling request: ${err}`);
    res.status(500).send("Something went wrong");
  }
});