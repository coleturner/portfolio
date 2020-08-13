import React from 'react';
import PropTypes from 'prop-types';
import postPropType from 'components/propTypes/postPropType';
import { useRouter } from 'next/router';
import Head from 'next/head';
import ErrorPage from '../../pages/_error';
import Container from 'components/container';
import PostBody from 'components/post-body';
import StoriesList from 'components/stories-list';
import Header from 'components/header';
import PostHeader from 'components/post-header';
import Layout from 'components/layout';
import {
  getAllPostsWithSlug,
  getPostAndMorePosts,
  getPortraitURL,
} from '../../lib/api';
import AppFooter from 'components/footer';
import { ScrollUp } from 'components/scrollUp';
import { PillButton } from 'components/button';
import Link from 'next/link';
import LoadingSpinner from 'components/loadingSpinner';
import { BASE_URL } from '../../lib/constants';
import styled from '@emotion/styled';
import { css } from 'emotion';
import PostTheme from 'components/post-theme';
import usePostTheme from '../../hooks/usePostTheme';
import Reactions from '../../components/reactions';
import Notifications, {
  NotificationProvider,
} from '../../components/notifications';

function metaImageURL(url) {
  if (url && url.startsWith('//')) {
    return 'https:' + url;
  }

  return url;
}

const Tags = styled.div(
  () => css`
    position: relative;
    z-index: 0;

    a {
      display: inline-block;
      background: rgba(255, 255, 255, 0.35);
      background: var(--post-color);
      border-radius: 0.2em;
      padding: 0.5em 1em;
      margin: 0.5em 0;
      margin-right: 0.5em;
      text-decoration: none;
      opacity: 0.85;
      position: relative;
      z-index: 1;

      &,
      &:hover {
        color: var(--post-color-contrast);
      }

      &:hover,
      &:focus {
        opacity: 1;
        transform: scale(1.1);
        z-index: 2;
      }
    }
  `
);

const Spacer = styled.div`
  padding: 3em 0;
`;

const Article = styled.article``;

function PostView({ post, morePosts, preview }) {
  const { color } = post;
  const { complementaryColorDark, complementaryColorLight } = usePostTheme(
    color
  );

  const generateOGImage = preview
    ? () => {
        const { hash } = window.location;
        const title =
          document.querySelector(`.anchor + a[href="${hash}"]`)?.innerText ||
          post.title;

        import('../../lib/generateOGImage').then((mod) =>
          mod.default(title, post.coverImage.url, post.color)
        );
      }
    : () => {};

  return (
    <NotificationProvider>
      <PostTheme
        color={color}
        complementaryColorLight={complementaryColorLight}
        complementaryColorDark={complementaryColorDark}
      >
        <Article>
          <PostHeader
            title={post.title}
            coverImage={post.coverImage}
            date={post.date}
            readingTime={post.readingTime}
            author={post.author}
          />
          <Container>
            {preview && (
              <div style={{ padding: '1em 0' }}>
                <PillButton onClick={generateOGImage}>
                  Generate OG Image
                </PillButton>
              </div>
            )}

            <Reactions sticky={true} postId={post.id} />

            <PostBody content={post.content} attributes={post.attributes} />

            <Reactions postId={post.id} />

            {post.tags && post.tags.length ? (
              <Tags>
                <h3>Related Tags</h3>
                {post.tags.map((tag) => (
                  <Link
                    key={tag.slug}
                    as={`/blog/${tag.slug}`}
                    href="/blog/[slug]"
                  >
                    <a>{tag.name}</a>
                  </Link>
                ))}
              </Tags>
            ) : null}
          </Container>
        </Article>
        <Spacer />
        {morePosts && morePosts.length > 0 && (
          <>
            <Container>
              <StoriesList title="More Stories" posts={morePosts} />

              <div style={{ textAlign: 'center' }}>
                <Link href="/blog" passHref>
                  <PillButton as="a">See more posts</PillButton>
                </Link>
              </div>
            </Container>
          </>
        )}
        <ScrollUp />

        <Notifications />
      </PostTheme>
    </NotificationProvider>
  );
}

PostView.propTypes = {
  post: postPropType,
  morePosts: PropTypes.arrayOf(postPropType),
  preview: PropTypes.bool,
};

export default function Post({ post, morePosts, portraitURL, preview }) {
  const router = useRouter();

  if (!router.isFallback && !post) {
    return <ErrorPage statusCode={404} />;
  }

  if (router.isFallback) {
    return <LoadingSpinner />;
  }

  const publishedTime = new Date(post.date).toISOString();

  return (
    <Layout preview={preview}>
      <Head>
        <title key="title">{post.title} | Cole Turner</title>
        <meta key="description" name="description" content={post.excerpt} />
        <link rel="canonical" href={BASE_URL + 'posts/' + post.slug} />
        <meta
          key="og:image"
          property="og:image"
          content={metaImageURL(post.ogImage?.url || post.coverImage?.url)}
        />
        <meta
          key="og:description"
          property="og:description"
          content={post.excerpt}
        />
        <meta key="og:title" property="og:title" content={post.title} />
        <meta key="og:type" property="og:type" content="article" />
        <meta
          key="og:article:published_time"
          property="og:article:published_time"
          content={publishedTime}
        />
        <meta
          key="og:article:author"
          property="og:article:author"
          content="Cole Turner"
        />
        <meta
          key="twitter:card"
          name="twitter:card"
          content="summary_large_image"
        />
        <meta
          key="twitter:title"
          property="twitter:title"
          content={post.title}
        />
        <meta
          key="twitter:image"
          name="twitter:image"
          content={metaImageURL(post.ogImage?.url || post.coverImage?.url)}
        />
        <meta key="twitter:site" name="twitter:site" content="@coleturner" />
        <meta
          key="twitter:creator"
          name="twitter:creator"
          content="@coleturner"
        />

        <script
          key="structured-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'BlogPosting',
              mainEntityOfPage: {
                '@type': 'WebPage',
                '@id': BASE_URL + 'posts/' + post.slug,
              },
              headline: 'abcad',
              description: 'Excerpt',
              image: metaImageURL(post.coverImage?.url || post.postImage?.url),
              author: {
                '@type': 'Person',
                name: 'Cole Turner',
              },
              publisher: {
                '@type': 'Organization',
                name: 'Cole Turner',
                logo: {
                  '@type': 'ImageObject',
                  url: BASE_URL + 'portrait.jpg',
                },
              },
              datePublished: post.date,
              dateModified: post.updatedAt,
            }),
          }}
        />
      </Head>
      <Header portraitURL={portraitURL} />
      <PostView post={post} morePosts={morePosts} preview={preview} />
      <AppFooter portraitURL={portraitURL} />
    </Layout>
  );
}

Post.propTypes = {
  post: postPropType,
  morePosts: PropTypes.arrayOf(postPropType),
  preview: PropTypes.bool,
};

export async function getStaticProps({ params, preview = false }) {
  const data = await getPostAndMorePosts(params.slug, preview);
  const portraitURL = await getPortraitURL();

  const post = data?.post ?? null;
  return {
    props: {
      preview,
      post,
      portraitURL,
      morePosts: data?.morePosts ?? null,
    },
    revalidate: 60,
  };
}

export async function getStaticPaths() {
  const allPosts = await getAllPostsWithSlug();
  return {
    paths: allPosts?.map(({ slug }) => `/posts/${slug}`) ?? [],
    fallback: true,
  };
}
