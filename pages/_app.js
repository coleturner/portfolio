import * as React from 'react';
import ReactGA from 'react-ga';
import PropTypes from 'prop-types';
import { CacheProvider, Global } from '@emotion/core';
import { cache } from 'emotion';
import NormalizeCSSString from 'normalize.css/normalize.css';
import TypistCSS from 'react-typist/dist/Typist.css';

import { css } from '@emotion/react';
import { globalStyles } from '../styles/global';
import { useRouter } from 'next/router';

function onLoading() {
  const elm = document.getElementById('page-loading-indicator');
  if (elm) {
    elm.style.display = 'block';
  }
}

function onLoadingDone() {
  setTimeout(() => {
    const elm = document.getElementById('page-loading-indicator');
    if (elm) {
      elm.style.display = 'none';
    }
  }, 150);
}

export function reportWebVitals({ id, name, label, value }) {
  ReactGA.event({
    category: label === 'web-vital' ? 'Web Vitals' : 'Next.js custom metric',
    action: name,
    value: Math.round(name === 'CLS' ? value * 1000 : value), // values must be integers
    label: id, // id unique to current page load
    nonInteraction: true, // avoids affecting bounce rate.
  });
}

export default function App({ Component, pageProps }) {
  const router = useRouter();

  React.useEffect(() => {
    router.events.on('routeChangeStart', onLoading);
    router.events.on('routeChangeComplete', onLoadingDone);
    router.events.on('routeChangeError', onLoadingDone);

    return () => {
      router.events.off('routeChangeStart', onLoading);
      router.events.off('routeChangeComplete', onLoadingDone);
      router.events.off('routeChangeError', onLoadingDone);
    };
  }, []);

  return (
    <CacheProvider value={cache}>
      <Global
        styles={css`
          ${NormalizeCSSString}

          ${TypistCSS}
        `}
      />
      {globalStyles}
      <Component {...pageProps} />
    </CacheProvider>
  );
}

App.propTypes = {
  Component: PropTypes.any,
  pageProps: PropTypes.object,
};
