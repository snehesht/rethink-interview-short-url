const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const cors = require('cors');
const logger = require('./lib/logger');
const { initDatabase } = require('./models');
const apiRouter = require('./api');
const redirectRouter = require('./api/redirect')

const app = express();

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
app.use(helmet());
app.use(cors());

app.use('/health', (req, res) => res.send('OK')); // Health check
app.use('/api/v1', apiRouter);

app.use('/', redirectRouter); // Redirect user based on short link

let server;
const startServer = async (port = 8000) => {
  try {
    await initDatabase();
    server = app.listen(port, () => logger.info(`Starting Shortify api-server on port ${port}`));
  } catch (error) {
    logger.error(`Error starting express server, ${error.message}`);
    throw error;
  }
}

const stopServer = async () => {
  if (server) {
    await server.close();
  }
}

module.exports = {
  startServer,
  stopServer,
};