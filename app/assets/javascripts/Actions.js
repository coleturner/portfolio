export default class Actions {

  static bindings = {};

  static init() {
    document.addEventListener('click', this.clickEvent);
  }

  static bind(action, handler) {
    if (!(action in this.bindings)) {
      this.bindings[action] = [];
    }

    if (this.bindings[action].indexOf(handler) === -1) {
      this.bindings[action].push(handler);
    }

    return this.trigger('bind');
  }

  static unbind(action, handler) {
    if (!(action in this.bindings)) {
      this.bindings[action] = [];
    }

    if (this.bindings[action].indexOf(handler) !== -1) {
      this.bindings[action].splice(handler, 1);
    }

    return this.trigger('unbind');
  }

  static getBindings(action) {
    return this.bindings[action];
  }

  static trigger(action, data = {}) {
    let propagate = true;

    if ('event' in data) {
      const oldPropagation = data.event.stopPropagation;
      data.event.stopPropagation = () => {
        propagate = false;
        oldPropagation();
      };
    }

    if (action in this.bindings) {
      this.getBindings(action).forEach(handler => {
        if (propagate) {
          handler(Object.assign({}, data, { name: action }));
        }
      });

      return true;
    }

    return null;
  }

  static clickEvent(e) {
    const path = e.path;
    const element = path.find(step => {
      if ('dataset' in step && 'action' in step.dataset) {
        return true;
      }

      return false;
    });

    if (!element) {
      return false;
    }

    return this.trigger(element.dataset.action, { event: e, element: element });
  }

}
