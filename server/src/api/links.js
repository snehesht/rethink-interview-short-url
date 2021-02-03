const { Router } = require('express');
const logger = require('../lib/logger');

const linksRouter = Router();

linksRouter.post('/', async (req, res) => {
  try {
    return res.status('NOT IMPLEMENTED')
  } catch (error) {
    logger.error(`Failed to create short url, ${error.message}`);
    return res.status(400).send({ error: 'Failed to create short url' })
  }
})

module.exports = linksRouter;