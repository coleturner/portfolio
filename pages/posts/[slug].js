import { useRouter } from 'next/router';
import Head from 'next/head';
import ErrorPage from 'next/error';
import Container from '../../components/container';
import PostBody from '../../components/post-body';
import MoreStories from '../../components/stories-list';
import Header from '../../components/header';
import PostHeader from '../../components/post-header';
import SectionSeparator from '../../components/section-separator';
import Layout from '../../components/layout';
import { getAllPostsWithSlug, getPostAndMorePosts } from '../../lib/api';
import PostTitle from '../../components/post-title';
import AppFooter from '../../components/footer';
import { useMemo, useState, useEffect } from 'react';
import { changeColorBrightness } from '../../styles/colors';
import styled from '@emotion/styled';
import { css } from 'emotion';
import { useReducedMotion } from 'framer-motion';

const ScrollUpContainer = styled.div(
  ({ color }) => css`
    position: fixed;
    bottom: 1em;
    right: 1em;
    font-size: 2em;
    cursor: pointer;
    z-index: 100;

    svg {
      fill: ${color};
    }

    &:hover svg {
      transform: scale(1.25);
    }
  `
);

function ScrollUp({ color, ...props }) {
  const shouldReduceMotion = useReducedMotion();
  const [shouldAppear, setShouldAppear] = useState(false);

  const scrollListener = (e) => {
    if (window.scrollY > window.innerHeight / 2) {
      setShouldAppear(true);
    } else {
      setShouldAppear(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', scrollListener);

    return () => {
      window.removeEventListener('scroll', scrollListener);
    };
  }, []);

  const scroll = () => {
    window.scroll({
      top: 0,
      left: 0,
      behavior: shouldReduceMotion ? 'auto' : 'smooth',
    });
  };

  if (!shouldAppear) {
    return null;
  }

  return (
    <ScrollUpContainer color={color} onClick={scroll}>
      <svg viewBox="0 0 512 512" {...props}>
        <path d="M256 0C114.833 0 0 114.833 0 256s114.833 256 256 256 256-114.853 256-256S397.167 0 256 0zm0 472.341c-119.275 0-216.341-97.046-216.341-216.341S136.725 39.659 256 39.659c119.295 0 216.341 97.046 216.341 216.341S375.275 472.341 256 472.341z" />
        <path d="M369.227 283.365l-99.148-99.148c-7.734-7.694-20.226-7.694-27.96 0l-99.148 99.148c-6.365 7.416-6.365 18.382 0 25.798 7.119 8.309 19.651 9.28 27.96 2.161L256 226.256l85.267 85.069c7.734 7.694 20.226 7.694 27.96 0 7.694-7.734 7.694-20.227 0-27.96z" />
      </svg>
    </ScrollUpContainer>
  );
}

export default function Post({ post, morePosts, preview }) {
  const router = useRouter();

  if (!router.isFallback && !post) {
    return <ErrorPage statusCode={404} />;
  }

  return (
    <Layout preview={preview}>
      <Header />
      {router.isFallback ? (
        <PostTitle>Loading…</PostTitle>
      ) : (
        <>
          <article>
            <Head>
              <title>{post.title} | Cole Turner</title>
              <meta property="og:image" content={post.coverImage.url} />
            </Head>
            <PostHeader
              title={post.title}
              coverImage={post.coverImage}
              date={post.date}
              author={post.author}
              color={post.color}
            />
            <Container>
              <PostBody content={post.content} color={post.color} />
            </Container>
          </article>
          {morePosts && morePosts.length > 0 && (
            <>
              <SectionSeparator />

              <Container>
                <MoreStories title="More Stories" posts={morePosts} />
              </Container>
            </>
          )}
        </>
      )}
      <ScrollUp color={post.color} />
      <AppFooter />
    </Layout>
  );
}

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
