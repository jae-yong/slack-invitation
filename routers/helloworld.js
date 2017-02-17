const express = require('express');

const router = express.Router();

const logger = require('../lib/get-logger')();

router.get('/helloworld', (req, res) => {
  logger.debug('helloworld');
  res.sendStatus(200);
});

module.exports = router;
