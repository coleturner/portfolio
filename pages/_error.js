import React from 'react';
import PropTypes from 'prop-types';

import { globalStyles } from '../styles/global';
import { PillButton } from 'components/button';
import Head from 'next/head';

const styles = {
  errorPortrait: {
    maxWidth: '100%',
    width: 'auto',
    height: '12em',
  },
  error: {
    fontFamily:
      '-apple-system, BlinkMacSystemFont, Roboto, "Segoe UI", "Fira Sans", Avenir, "Helvetica Neue", "Lucida Grande", sans-serif',
    height: '100vh',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },

  desc: {
    display: 'inline-block',
    textAlign: 'left',
    lineHeight: '49px',
    height: '49px',
    verticalAlign: 'middle',
  },

  h1: {
    display: 'inline-block',
    borderRight: '1px solid var(--page-background-color-invert-15)',
    margin: 0,
    marginRight: '20px',
    padding: '10px 23px 10px 0',
    fontSize: '24px',
    fontWeight: 500,
    verticalAlign: 'top',
  },

  h2: {
    fontSize: '14px',
    fontWeight: 'normal',
    lineHeight: 'inherit',
    margin: 0,
    padding: 0,
  },
};

const statusCodes = {
  400: 'Bad Request',
  404: 'This page could not be found',
  405: 'Method Not Allowed',
  500: 'Internal Server Error',
};

function NextErrorComponent({
  statusCode,
  title = statusCodes[statusCode] || 'An unexpected error has occurred',
}) {
  return (
    <div style={styles.error}>
      <Head>
        <title key="title">
          {statusCode}: {title}
        </title>

        {globalStyles}
      </Head>
      <img style={styles.errorPortrait} src="/error-portrait.png" alt="" />
      <div>
        <style dangerouslySetInnerHTML={{ __html: 'body { margin: 0 }' }} />
        {statusCode ? <h1 style={styles.h1}>{statusCode}</h1> : null}
        <div style={styles.desc}>
          <h2 style={styles.h2}>{title}</h2>
        </div>
      </div>
      <div style={{ padding: '3em' }} />
      <PillButton as="a" href="/">
        Go to the homepage
      </PillButton>
    </div>
  );
}

NextErrorComponent.propTypes = {
  statusCode: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  title: PropTypes.string,
};

const ErrorPage = ({ statusCode, title }) => {
  return <NextErrorComponent statusCode={statusCode} title={title} />;
};

ErrorPage.propTypes = {
  statusCode: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  title: PropTypes.string,
  err: PropTypes.object,
};

export default ErrorPage;
