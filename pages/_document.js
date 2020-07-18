import React from 'react';
import Document, { Head, Main, NextScript } from 'next/document';
import { extractCritical } from 'emotion-server';

export default class MyDocument extends Document {
  static getInitialProps(context) {
    const { renderPage } = context;

    const page = renderPage();
    const styles = extractCritical(page.html);

    return { ...page, ...styles };
  }

  render() {
    return (
      <html lang="en">
        <Head>
          <style
            data-emotion-css={this.props.ids.join(' ')}
            dangerouslySetInnerHTML={{ __html: this.props.css }}
          />
          <link rel="icon" href="/favicon.ico" />
          <meta name="theme-color" content="#000000" />
        </Head>
        <body>
          <Main />
          <NextScript />
          <div id="page-loading-indicator">
            <div></div>
          </div>
        </body>
      </html>
    );
  }
}
