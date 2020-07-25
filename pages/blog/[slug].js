import React from 'react';
import PropTypes from 'prop-types';
import postPropType from '../../components/propTypes/postPropType';
import { useRouter } from 'next/router';
import Head from 'next/head';
import ErrorPage from '../../pages/_error';
import Container from '../../components/container';
import StoriesList from '../../components/stories-list';
import Header from '../../components/header';
import Layout from '../../components/layout';
import {
  getAllPostWithTagId,
  getAllPostTags,
  getTagBySlug,
} from '../../lib/api';
import AppFooter from '../../components/footer';
import LoadingSpinner from '../../components/loadingSpinner';
import styled from '@emotion/styled';
import { css } from 'emotion';
import { getColorContrast, changeColorBrightness } from '../../styles/colors';

const Hero = styled.div(
  ({ color = '#111' }) => css`
    border-radius: 0.3em;
    padding: 1em 2em;
    background: ${color};
    border-bottom: 6px solid ${changeColorBrightness(color, -15)};
    color: ${getColorContrast(color)};
    margin: 2em 0 3em 0;
    font-size: 1.5em;
    position: relative;
    text-shadow: 0 1px 0px rgba(255, 255, 255, 0.2);

    &::after {
      content: ' ';
      border: 20px solid ${changeColorBrightness(color, 15)};
      border-top-color: var(--page-background-color);
      border-left-color: var(--page-background-color);
      border-bottom-right-radius: 0.35em;
      width: 0;
      height: 0;
      position: absolute;
      top: 0;
      left: 0;
    }
  `
);

const Heading = styled.h1`
  font-size: 1.25em;
`;

const Description = styled.p`
  opacity: 0.85;
  margin: 0;
`;

export default function BlogTag({ tag, posts, preview }) {
  const router = useRouter();

  if (router.isFallback) {
    return <LoadingSpinner />;
  }

  if (!tag || !posts || !posts.length) {
    return (
      <ErrorPage statusCode={404} title="There are no posts with that tag." />
    );
  }
  return (
    <Layout preview={preview}>
      <Head>
        <title key="title">{tag.name} | Cole Turner</title>
      </Head>

      <Header />
      <Container>
        <Hero color={tag.color}>
          <Heading>{tag.name}</Heading>
          {tag.description && <Description>{tag.description}</Description>}
        </Hero>
        <StoriesList posts={posts} />
      </Container>
      <AppFooter />
    </Layout>
  );
}

BlogTag.propTypes = {
  tag: PropTypes.shape({
    name: PropTypes.string,
    slug: PropTypes.string,
    description: PropTypes.string,
    color: PropTypes.string,
  }),
  posts: PropTypes.arrayOf(postPropType),
  preview: PropTypes.bool,
};

export async function getStaticProps({ params, preview = false }) {
  const tag = await getTagBySlug(params.slug);
  if (!tag) {
    return {
      props: {},
    };
  }

  const posts = await getAllPostWithTagId(tag.id, preview);

  return {
    props: {
      preview,
      posts,
      tag,
    },
  };
}

export async function getStaticPaths() {
  const tags = await getAllPostTags();
  return {
    paths: tags?.map(({ slug }) => `/blog/${slug}`) ?? [],
    fallback: true,
  };
}
