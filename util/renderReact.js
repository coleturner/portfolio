const pug = require('pug');

const renderReact = (component, props = {}) => {
  const id = Math.random().toString(36).substr(2, 10);
  return pug.render('div(class="react-component" id=id data-props=props data-react=true data-component=component)', {
    component,
    id,
    props
  });
}

module.exports = renderReact;
