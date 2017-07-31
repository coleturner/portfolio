const pug = require('pug');
const path = require('path');

const renderReact = (component, props = {}) => {
  const id = Math.random().toString(36).substr(2, 10);
  return pug.renderFile(path.join(__dirname, '../views/react.pug'), {
    component,
    id,
    props
  });
}

module.exports = renderReact;
