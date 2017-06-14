const deepmerge = require('deep-assign');
const webpack = require('webpack');
const path = require('path');

const defaultConfig = require('./default.js');


const config = deepmerge(
  defaultConfig,
  {
    devtool: 'eval-source-map',
    devServer: {
      hot: true,
      disableHostCheck: true,
      contentBase: './public',
      port: process.env.SERVER_PORT,
      headers: { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Credentials': 'true' }
    },
    output: {
      publicPath: process.env.ASSET_PATH
    },
    watch: true
  }
);

config.plugins.push.apply(config.plugins, [
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NoEmitOnErrorsPlugin(),
]);

for (let key in config.entry) {
  if (config.entry.hasOwnProperty(key)) {
    config.entry[key] =
      [
        'webpack-hot-middleware/client'
      ].concat(config.entry[key]);
  }
}

console.log('[WEBPACK] Using development config.');

module.exports = config;
