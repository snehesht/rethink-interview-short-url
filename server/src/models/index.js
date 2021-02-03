const db = require('./db');
const logger = require('../lib/logger');
const ShortUrls = require('./short-urls');
const ViewMetrics = require('./views')

const initDatabase = async () => {
  try {
    await db.sync();
  } catch(error) {
    logger.error(`Failed to initialize database, ${error.message}`);
    throw error;
  }
}

module.exports = {
  db,
  initDatabase,
  ShortUrls,
  ViewMetrics,
};