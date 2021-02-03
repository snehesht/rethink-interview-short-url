const { Sequelize } = require('sequelize');
const db = require('./db');

const ShortUrls = db.define('short_urls', {
  id: {
    type: Sequelize.STRING(32),
    primaryKey: true,
  },
  link: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  meta: {
    type: Sequelize.JSONB,
    allowNull: false,
    defaultValue: {},
  },
}, {
  timestamps: true,
  createdAt: 'created',
  updatedAt: 'updated',
});

module.exports = ShortUrls;