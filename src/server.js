require('dotenv').config()
require('module-alias/register');
require('./database');
const app = require('@app');

async function startServer() {
  app.listen(process.env.PORT, (err) => {
    if (err) {
      return console.log(err);
    }
    console.log(`Server Up: port ${process.env.PORT}`);
  });
}

startServer();

module.exports = app;