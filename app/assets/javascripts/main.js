import Mount from './Mount';

(() => {
  if (typeof document !== 'undefined') {
    document.addEventListener('DOMContentLoaded', Mount.init);
  }
})();
