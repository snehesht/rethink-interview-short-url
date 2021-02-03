const { Router } = require('express');
const { isURL } = require('validator');
const { nanoid } = require('nanoid');
const logger = require('../lib/logger');
const { ShortUrls } = require('../models');
const { getShortURL } = require('../lib/shortlink')

const linksRouter = Router();

const createShortUrl = async (link, size = 4, retryCount = 0) => {
  try {
    const linkInstance = await ShortUrls.create({
      id: nanoid(size),
      link: link,
    })
    return { linkInstance, retryCount }
  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      return createShortUrl(link, size + 1, retryCount + 1)
    }
    logger.error(`Error creating short url, ${error.message}`);
    throw error
  }
}

linksRouter.post('/', async (req, res) => {
  try {
    const { link } = req.body;
    if (!link) {
      return res.status(400).send({ message: 'Missing link parameter.' })
    }

    // Link validation
    if (!isURL(link)) {
      return res.status(400).send({ message: 'Invalid Link' })
    }

    const { linkInstance, retryCount } = await createShortUrl(link); // eslint-disable-line no-unused-vars
    return res.send({
      shortUrl: getShortURL(linkInstance.id),
      id: linkInstance.id,
      link: linkInstance.link
    });
  
  } catch (error) {
    logger.error(`Failed to create short url, ${error.message}`);
    return res.status(400).send({ error: 'Failed to create short url' })
  }
})

module.exports = linksRouter;
module.exports.createShortUrl = createShortUrl;