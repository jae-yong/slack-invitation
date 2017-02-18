const logger = require('../lib/get-logger')();

module.exports = (req, res, next) => {
  let ip = null;
  const forwared = req.header('x-forwarded-for');
  ip = forwared || req.ip;
  logger.trace(`[${ip}] ${req.method.toUpperCase()} ${req.originalUrl}`);
  next();
};
