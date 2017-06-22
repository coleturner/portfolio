const fs = require('fs');
const path = require('path');

const manifestPath = path.join(__dirname, '../public/manifest.json');
const manifestData = process.env.NODE_ENV === 'production' ? require(manifestPath) : {};

const manifestAsset = (name) => {
  const resolved = manifestData[name] || name;
  return `/public/${resolved}`;
};

module.exports = manifestAsset;
