import React from 'react';
import PropTypes from 'prop-types';
import postPropType from '../components/propTypes/postPropType';
import Container from '../components/container';
import StoriesList from '../components/stories-list';
import Header from '../components/header';
import Layout from '../components/layout';
import { getAllPostsForHome, getAllPostTags } from '../lib/api';
import Head from 'next/head';
import AppFooter from '../components/footer';
import styled from '@emotion/styled';
import { SHADE, getColorContrast } from '../styles/colors';
import { css } from 'emotion';
import Link from 'next/link';

const Content = styled.div`
  --post-preview-shadow-color: ${SHADE[0.15]};
  margin-top: 3em;
`;

const Divider = styled.div`
  padding: 1em;
`;

const TagList = styled.div`
  background: var(--page-background-color);
  box-shadow: inset 0 100px 100px 100px rgba(0, 0, 0, 0.3);
  border-bottom: 3px solid rgba(0, 0, 0, 0.3);
  padding: 0.5em 0;
  text-align: center;
  position: sticky;
  top: 0;
  left: 0;
  right: 0;
  z-index: 2;
`;

const Tag = styled.span(
  ({ color }) => css`
    display: inline-block;
    background: rgba(255, 255, 255, 0.15);
    border-bottom: 3px solid ${color};
    border-radius: 0.2em;
    padding: 0.5em 1em;
    margin-right: 0.5em;
    opacity: 0.85;
    position: relative;
    z-index: 1;

    a,
    a:hover {
      text-decoration: none;
      color: inherit;
    }

    &,
    &:hover {
      color: var(--page-text-color);
    }

    &:hover,
    &:focus {
      opacity: 1;
      transform: scale(1.1);
      z-index: 2;
    }

    &:last-child {
      margin: 0;
    }
  `
);

export default function BlogIndex({ preview, allPosts, allTags }) {
  const heroPost = allPosts[0];
  const morePosts = allPosts.slice(1);

  return (
    <Layout preview={preview}>
      <Head>
        <title key="title">Blog | Cole Turner</title>
      </Head>

      <Header />
      {allTags.length ? (
        <TagList>
          {allTags.map((tag) => (
            <Tag key={tag.slug} color={tag.color}>
              <Link as={`/blog/${tag.slug}`} href="/blog/[slug]">
                <a>{tag.name}</a>
              </Link>
            </Tag>
          ))}
        </TagList>
      ) : null}
      <Content>
        {heroPost && (
          <Container>
            <StoriesList title="Featured" posts={[heroPost]} />
          </Container>
        )}
        <Divider />
        <Container>
          {morePosts.length > 0 && (
            <StoriesList title="All Stories" posts={morePosts} />
          )}
        </Container>
      </Content>
      <AppFooter />
    </Layout>
  );
}

BlogIndex.propTypes = {
  preview: PropTypes.bool,
  allPosts: PropTypes.arrayOf(postPropType),
  allTags: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      slug: PropTypes.string,
    })
  ),
};

export async function getStaticProps({ preview = false }) {
  const allPosts = await getAllPostsForHome(preview);
  const allTags = await getAllPostTags();

  return {
    props: { preview, allPosts, allTags },
  };
}
