const deepmerge = require('deep-assign');
const webpack = require('webpack');
const RelayCompilerWebpackPlugin = require('relay-compiler-webpack-plugin');
const path = require('path');

const defaultConfig = require('./default.js');

if (!('ASSET_HOST' in process.env)) {
  console.log('ASSET_HOST is not defined in environment.');
  process.exit(1);
}

if (!('WEBPACK_PORT' in process.env)) {
  console.log('WEBPACK_PORT is not defined in environment.');
  process.exit(1);
}

const config = deepmerge(
  defaultConfig,
  {
    devtool: 'eval-source-map',
    devServer: {
      contentBase: './public',
      //outputPath: path.resolve(__dirname, '../', 'public/assets/'),
      port: process.env.WEBPACK_PORT,
      headers: { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Credentials': 'true' }
    },
    output: {
      publicPath: 'http://' + process.env.ASSET_HOST + '/assets/'
    },
    watch: true
  }
);

config.plugins.push.apply(config.plugins, [
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NoEmitOnErrorsPlugin(),
  new RelayCompilerWebpackPlugin({
    schema: path.resolve(__dirname, '../build/schema.json'), // or schema.json
    src: path.resolve(__dirname, '../app/assets/javascripts'),
  })
]);

for (let key in config.entry) {
  if (config.entry.hasOwnProperty(key)) {
    config.entry[key] =
      ['webpack-dev-server/client?http://0.0.0.0:' + process.env.WEBPACK_PORT + '/', 'webpack/hot/only-dev-server']
      .concat(config.entry[key]);
  }
}

console.log('[WEBPACK] Using development config.');

module.exports = config;
