export default callback => {
  if (typeof document !== 'undefined') {
    callback();
  }
};
