const { Router } = require('express');
const { isURL } = require('validator');
const logger = require('../lib/logger');
const { ShortUrls } = require('../models');

const redirectRouter = Router();

redirectRouter.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const linkInstance = await ShortUrls.findByPk(id);
    if (!linkInstance) {
      return res.status(404).send({ message: 'Short URL not found', code: 404 })
    }
    const link = linkInstance.link;
    if (link && isURL(link)) {
      return res.redirect(link);
    }
    return res.status(404).send({ message: 'Found invalid redirect link' });
  } catch (error) {
    logger.error(`Failed to create short url, ${error.message}`);
    logger.errorStack(error);
    return res.status(400).send({ error: 'Failed to create short url' })
  }
})

module.exports = redirectRouter;