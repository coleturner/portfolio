import ReactGA from 'react-ga';
export const initGA = () => {
  if (typeof window === 'undefined' || window.GA_INITIALIZED) {
    return;
  }

  ReactGA.initialize('UA-92867-7');
  window.GA_INITIALIZED = true;
};

const queueable = (callback) => {
  if (typeof window === 'undefined') {
    return;
  }

  window.GA_QUEUE = window.GA_QUEUE || [];

  if (window.GA_INITIALIZED) {
    callback();
  } else {
    window.GA_QUEUE.push(callback);
  }
};

export const logPageView = () => {
  queueable(() => {
    ReactGA.set({ page: window.location.pathname });
    ReactGA.pageview(window.location.pathname);
  });
};

export const logEvent = (event) => {
  queueable(() => {
    ReactGA.event(event);
  });
};

export const logException = (description = '', fatal = false) => {
  queueable(() => {
    ReactGA.exception({ description, fatal });
  });
};

export const flushGAQueue = () => {
  if (typeof window === 'undefined') {
    return;
  }

  window.GA_QUEUE = window.GA_QUEUE || [];
  window.GA_QUEUE.forEach((callback) => callback());
};
