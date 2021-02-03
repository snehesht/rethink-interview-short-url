const { Router } = require('express');
const linksRouter = require('./links');

const apiRouter = Router();

apiRouter.use('/link', linksRouter);

module.exports = apiRouter;