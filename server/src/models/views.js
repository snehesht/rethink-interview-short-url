const { Sequelize } = require('sequelize');
const db = require('./db');

const ViewMetrics = db.define('url_views', {
  id: {
    type: Sequelize.STRING(32),
    primaryKey: true,
  },
  client_ip: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  views: {
    type: Sequelize.BIGINT,
    allowNull: false,
    defaultValue: 0,
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

module.exports = ViewMetrics;