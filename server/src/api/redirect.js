const { Router } = require('express');
const logger = require('../lib/logger');

const redirectRouter = Router();

redirectRouter.get('/:id', async (req, res) => {
  try {
    return res.status('NOT IMPLEMENTED')
  } catch (error) {
    logger.error(`Failed to redirect user, ${error.message}`);
    return res.status(400).send({ error: 'Failed to redirect user' })
  }
})

module.exports = redirectRouter;