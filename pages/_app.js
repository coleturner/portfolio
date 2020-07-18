import * as React from 'react';
import NextApp from 'next/app';
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
