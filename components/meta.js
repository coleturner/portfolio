import React from 'react';
import Head from 'next/head';

export default function Meta() {
  const title = 'Cole Turner &middot; Software Engineer';

  const description =
    'Senior Software Engineer focused on UI/UX and communications. My mission is to build seamless applications that power businesses worldwide.';

  return (
    <Head>
      <title key="title">Cole Turner &middot; Software Engineer</title>
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, shrink-to-fit=no"
      />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/favicon/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon/favicon-16x16.png"
      />
      <link rel="manifest" href="/favicon/site.webmanifest" />
      <link
        rel="mask-icon"
        href="/favicon/safari-pinned-tab.svg"
        color="#000000"
      />
      <link rel="shortcut icon" href="/favicon/favicon.ico" />
      <meta name="msapplication-TileColor" content="#000000" />
      <meta name="msapplication-config" content="/favicon/browserconfig.xml" />
      <meta name="theme-color" content="#000" />
      <link rel="alternate" type="application/rss+xml" href="/feed.xml" />
      <meta key="description" name="description" content={description} />

      <meta key="og:image" property="og:image" content="/og-image.jpg" />
      <meta
        key="og:description"
        property="og:description"
        content={description}
      />
      <meta key="og:title" property="og:title" content={title} />
      <meta
        key="twitter:card"
        name="twitter:card"
        content="summary_large_image"
      />
      <meta key="twitter:title" property="twitter:title" content={title} />
      <meta key="twitter:image" name="twitter:image" content="/og-image.jpg" />
      <meta key="twitter:site" name="twitter:site" content="@coleturner" />
      <meta
        key="twitter:creator"
        name="twitter:creator"
        content="@coleturner"
      />
    </Head>
  );
}
