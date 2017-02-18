const program = require('commander');
const packageInfo = require('./package.json');

const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');

const logger = require('./lib/get-logger')();

const app = express();

program
  .version(packageInfo.version)
  .option('-p, --port <n>', 'listen port number', parseInt)
  .parse(process.argv)
  ;

const PORT = program.port || 3000;
const ADDRESS = '0.0.0.0';   // ipv4

app.use(helmet());

// static files
app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// middlewares except access-log
require('./middlewares')
  .forEach(m => app.use(m.module));

// routers
require('./routers')
  .map(router => router.module)
  .forEach((router) => {
    app.use('/', router);
  });

app.listen(PORT, ADDRESS, () => {
  logger.info(`start server ${ADDRESS}:${PORT}`);
});
