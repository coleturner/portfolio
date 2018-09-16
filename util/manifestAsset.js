const path = require('path');

const manifestPath = path.join(__dirname, '../public/manifest.json');
const manifestData =
  process.env.NODE_ENV === 'production' ? require(manifestPath) : {};

const manifestAsset = name => {
  const resolved = manifestData[name] || name;
  return resolved;
};

module.exports = manifestAsset;
