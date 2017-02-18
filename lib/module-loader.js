const path = require('path');
const fs = require('fs');
const callsites = require('callsites');

const PROJECT_HOME = path.dirname(require.main.filename);

module.exports = () => {
  const stack = callsites();
  let callerDir = path.dirname(stack[1].getFileName()).split(path.sep);
  callerDir = callerDir[callerDir.length - 1];

  const MODULE_DIR = path.join(PROJECT_HOME, callerDir);
  const moduleFileNames = fs.readdirSync(MODULE_DIR);

  return moduleFileNames
    .filter(name => name !== 'index.js')
    .map((moduleFileName) => {
      const moduleFilePath = path.join(MODULE_DIR, moduleFileName);
      const stats = fs.statSync(moduleFilePath);

      if (stats.isFile()) {
        return moduleFilePath;
      }
      return null;
    })
    .filter(moduleFilePath => moduleFilePath)
    .map(moduleFilePath => ({
      name: path.basename(moduleFilePath),
      module: require(moduleFilePath),  // eslint-disable-line global-require, import/no-dynamic-require, max-len
    }))
    ;
};
