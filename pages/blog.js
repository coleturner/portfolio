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
import { SHADE } from '../styles/colors';
import TagList from '../components/taglist';

const Content = styled.div`
  --post-preview-shadow-color: ${SHADE[0.15]};
  margin-top: 3em;
`;

const Divider = styled.div`
  padding: 1em;
`;

export default function BlogIndex({ preview, allPosts, allTags }) {
  const heroPost = allPosts[0];
  const morePosts = allPosts.slice(1);

  return (
    <Layout preview={preview}>
      <Head>
        <title key="title">Blog | Cole Turner</title>
      </Head>

      <Header />
      <TagList tags={allTags} />
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
