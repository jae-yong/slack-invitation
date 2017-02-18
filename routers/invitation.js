const config = require('config');
const request = require('request-promise');
const qs = require('qs');

const express = require('express');

const router = express.Router();

const logger = require('../lib/get-logger')();

const slackConfig = config.get('slack');

router.post('/api/v1/invitation', (req, res) => {
  const email = req.body.email;
  request({
    method: 'GET',
    url: `https://${slackConfig.group_domain}.slack.com/api/users.admin.invite?${qs.stringify({
      email,
      token: slackConfig.access_token,
    })}`,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
  }).then((body) => {
    let result = null;
    if (typeof body === 'string') {
      try {
        result = JSON.parse(body);
      } catch (e) {
        return res.sendStatus(400);
      }
    } else {
      result = body;
    }

    logger.debug(result);
    if (body.ok) {
      return res.sendStatus(200);
    }

    return res.sendStatus(400);
  }).catch((err) => {
    logger.error(err);
    res.sendStatus(400);
  });
});

module.exports = router;
