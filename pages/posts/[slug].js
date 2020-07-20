import React from 'react';
import PropTypes from 'prop-types';
import postPropType from '../../components/propTypes/postPropType';
import { useRouter } from 'next/router';
import Head from 'next/head';
import ErrorPage from '../../pages/_error';
import Container from '../../components/container';
import PostBody from '../../components/post-body';
import MoreStories from '../../components/stories-list';
import Header from '../../components/header';
import PostHeader from '../../components/post-header';
import Layout from '../../components/layout';
import { getAllPostsWithSlug, getPostAndMorePosts } from '../../lib/api';
import AppFooter from '../../components/footer';
import { ScrollUp } from '../../components/scrollUp';
import { PillButton } from '../../components/button';
import Link from 'next/link';
import LoadingSpinner from '../../components/loadingSpinner';

function metaImageURL(url) {
  if (url && url.startsWith('//')) {
    return 'https:' + url;
  }

  return url;
}

export default function Post({ post, morePosts, preview }) {
  const router = useRouter();

  if (!router.isFallback && !post) {
    return <ErrorPage statusCode={404} />;
  }

  const generateOGImage = preview
    ? () => {
        import('../../lib/generateOGImage').then((mod) =>
          mod.default(post.title, post.coverImage.url, post.color)
        );
      }
    : () => {};

  if (router.isFallback) {
    return <LoadingSpinner />;
  }

  const publishedTime = new Date(post.date).toISOString();

  return (
    <Layout preview={preview}>
      <Header />
      <article>
        <Head>
          <title key="title">{post.title} | Cole Turner</title>
          <meta key="description" name="description" content={post.excerpt} />
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
        </Head>
        <PostHeader
          title={post.title}
          coverImage={post.coverImage}
          date={post.date}
          author={post.author}
          color={post.color}
        />
        <Container>
          {preview && (
            <div style={{ padding: '1em 0' }}>
              <PillButton onClick={generateOGImage}>
                Generate OG Image
              </PillButton>
            </div>
          )}
          <PostBody
            content={post.content}
            color={post.color}
            complimentaryColor={post.complimentaryColor}
          />
        </Container>
      </article>
      {morePosts && morePosts.length > 0 && (
        <>
          <Container>
            <MoreStories title="More Stories" posts={morePosts} />

            <div style={{ textAlign: 'center' }}>
              <Link href="/blog" passHref>
                <PillButton as="a">See more posts</PillButton>
              </Link>
            </div>
          </Container>
        </>
      )}
      <ScrollUp color={post.color} />
      <AppFooter />
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

  const post = data?.post ?? null;
  return {
    props: {
      preview,
      post,
      morePosts: data?.morePosts ?? null,
    },
  };
}

export async function getStaticPaths() {
  const allPosts = await getAllPostsWithSlug();
  return {
    paths: allPosts?.map(({ slug }) => `/posts/${slug}`) ?? [],
    fallback: true,
  };
}
