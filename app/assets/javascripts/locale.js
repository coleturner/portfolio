import I18n from 'i18n';

export const t = (...args) => {
  if (typeof I18n.t === 'function') {
    return I18n.t.apply(I18n, args);
  }

  return args[0];
};

export const isSet = (key, options = {}) => {
  return key ? I18n.isSet(I18n.lookup(key, options)) : null;
};

console.log("I18n", I18n);

export default t;
