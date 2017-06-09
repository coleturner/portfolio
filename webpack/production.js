const deepAssign = require('deep-assign');

const defaultConfig = require('./default.js');
const assetURL = '//' + process.env.ASSET_HOST + '/';

const config = deepAssign({}, defaultConfig,
  {
    devtool: 'source-map',
    output: {
      publicPath: defaultConfig.assetURL + '/assets/'
    }
  }
);

console.log('[WEBPACK] Using production config.');

module.exports = config;
