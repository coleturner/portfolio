import { createElement } from 'react';
import { render } from 'react-dom';

const resolver = require.context('./', true, /^\.\/.*(\/index)?\.jsx?$/);

export default class Mount {
  static init() {
    const mounts = document.querySelectorAll('[data-react]');
    for (let mount of mounts) {
      const resolve = './' + mount.getAttribute('data-component');
      const component = Mount.resolve(resolve).default;
      const props = JSON.parse(mount.getAttribute('data-props')) || {};

      render(createElement(component, props), mount);

      if (module.hot) {
        module.hot.accept(resolve, () => {
          const hotComponent = Mount.resolve(resolve).default;
          render(createElement(hotComponent, props), mount);
        });
      }
    }
  }

  static resolve(request) {
    const keys = resolver.keys();
    const tests = [request + '.jsx', request + '.js', request + '/index.jsx', request + '/index.js'];
    const match = tests.find(test => keys.includes(test)) || request;

    return resolver(match);
  }
}
