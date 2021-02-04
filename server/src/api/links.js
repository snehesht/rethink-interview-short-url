const { Router } = require('express');
const { isURL } = require('validator');
const { nanoid } = require('nanoid');
const logger = require('../lib/logger');
const { ShortUrls } = require('../models');
const { getShortURL } = require('../lib/shortlink')

const DEFAULT_CHECK_TIME_IN_MS = 10000; // 10 secs
const linksRouter = Router();
let urlSlugSize = 2;
let retryCountMap = [];
let lastCheck = Date.now();

const createShortUrl = async (link, size = urlSlugSize, retryCount = 0) => {
  try {
    // Increment SlugSize if (retryCount / totalCount) * 100 > 10 // 10% of requests are done twice
    if (retryCountMap.length > 1 && Date.now() > lastCheck + DEFAULT_CHECK_TIME_IN_MS) { 
      lastCheck = Date.now();
      const retryRatio = Math.floor((retryCountMap.reduce((total, num) => total + num, 0) / retryCountMap.length) * 100)
      if (retryRatio > 10) {
        urlSlugSize += 1;
        logger.warn(`Retry ratio in past 10 sec is ${retryRatio}%, incrementing Slug size to ${urlSlugSize}`)
      }

      // Reset retryCountMap
      retryCountMap = [];
    }
    const linkInstance = await ShortUrls.create({
      id: nanoid(size),
      link: link,
    })
    retryCountMap.push(retryCount)
    return linkInstance
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

    const linkInstance = await createShortUrl(link, urlSlugSize); // eslint-disable-line no-unused-vars
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