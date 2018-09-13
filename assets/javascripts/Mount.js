import React from 'react';
import { ThemeProvider } from 'emotion-theming'
import { createElement } from 'react';
import { render } from 'react-dom';

import Theme from './Theme';

let resolver = null;

const assignResolver = () => {
  resolver = require.context('./', true, /^\.\/.*(\/index)?\.jsx?$/);
};

export default class Mount {
  static init() {
    const mounts = document.querySelectorAll('[data-react]');
    for (let mount of mounts) {
      const resolve = './' + mount.getAttribute('data-component');
      const resolution = Mount.resolve(resolve);

      const propChild = document.getElementById('props-' + mount.id);
      const props = propChild ? JSON.parse(propChild.innerHTML) : {};

      const Component = resolution.default;
      const context = (
        <ThemeProvider theme={Theme}>
          <Component {...props} />
        </ThemeProvider>
      );
      
      render(
        context, mount);
    }
  }

  static resolve(request) {
    const keys = resolver.keys();
    const tests = [request + '.jsx', request + '.js', request + '/index.jsx', request + '/index.js'];
    const match = tests.find(test => keys.includes(test)) || request;

    return resolver(match);
  }
}

assignResolver();

if (module.hot) {
  module.hot.accept();
  module.hot.accept(resolver.id, () => {
    assignResolver();
    Mount.init();
  });
}
