const express = require('express');
const router = express.Router();
const { db } = require('./config/connection');
const routes = require('./controllers/index');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(routes);

db.once('open', () => {
  console.log('Database connection established!');
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
  });
}).catch((err) => {
  console.error('Error connecting to database:', err);
});

module.exports = router;
