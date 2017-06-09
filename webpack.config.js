var autoprefixer = require('autoprefixer');

var environmentConfig = {};

if (process.env.RAILS_ENV === 'production' || process.env.NODE_ENV === 'production') {
  environmentConfig = require('./webpack/production.js');
} else {
  environmentConfig = require('./webpack/dev.js');
}

module.exports = environmentConfig;
