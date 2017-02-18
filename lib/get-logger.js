const path = require('path');
const callsites = require('callsites');
const log4js = require('log4js');

module.exports = (category) => {
  if (category === undefined) {
    const stack = callsites();
    const callerPath = stack[1].getFileName();
    const caller = path.basename(callerPath, path.extname(callerPath));
    return log4js.getLogger(caller);
  }

  return log4js.getLogger(category);
};
