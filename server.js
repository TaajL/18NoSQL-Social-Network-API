const express = require('express');
const { connect } = require('./config/connection');
const routes = require('./controllers/index');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(routes);

(async () => {
  try {
    //await connect();
    app.listen(PORT, () => {
      console.log(`API server up and running on ${PORT}!`);
    });
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();