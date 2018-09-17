import 'ress/dist/ress.min.css';
import Mount from './Mount';

if (process.env.NODE_ENV === 'production') {
  Mount.init();
} else {
  (() => {
    if (typeof document !== 'undefined') {
      if (process.env.NODE_ENV === 'production') {
        document.addEventListener('DOMContentLoaded', Mount.init);
      } else {
        setTimeout(Mount.init, 0);
      }
    }
  })();

  if (module.hot) {
    module.hot.accept();
  }
}
