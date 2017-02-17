const logger = require('../lib/get-logger')();

module.exports = (req, res, next) => {
  logger.trace(`${req.method.toUpperCase()} ${req.originalUrl}`);
  next();
};
