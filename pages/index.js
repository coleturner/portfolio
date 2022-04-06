import React from 'react';
import PropTypes from 'prop-types';
import postPropType from 'components/propTypes/postPropType';
import Container from 'components/container';
import StoriesList from 'components/stories-list';
import Header from 'components/header';
import Layout from 'components/layout';
import { getAllPostsForHome, getAllPostTags, getPortraitURL } from '../lib/api';
import Head from 'next/head';
import AppFooter from 'components/footer';
import styled from '@emotion/styled';
import { gradientTextStyle } from '../styles/global';
import { SHADE } from '../styles/colors';
import { BASE_URL } from '../lib/constants';
import { css } from 'emotion';

const Content = styled.div`
  --post-preview-shadow-color: ${SHADE[0.15]};
  --post-preview-title-color: #5199d5;
`;

export default function BlogIndex({ preview, allPosts, allTags, portraitURL }) {
  const heroPost = allPosts[0];
  const morePosts = allPosts.slice(1);

  return (
    <Layout preview={preview}>
      <Head>
        <link rel="canonical" href={BASE_URL} />
      </Head>

      <Header portraitURL={portraitURL} />
      <Content>
        {heroPost && (
          <Container>
            <StoriesList posts={[heroPost]} />
          </Container>
        )}
        <Container>
          {morePosts.length > 0 && <StoriesList posts={morePosts} />}
        </Container>
      </Content>
      <AppFooter portraitURL={portraitURL} />
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
  portraitURL: PropTypes.string,
};

export async function getStaticProps({ preview = false }) {
  const allPosts = await getAllPostsForHome(preview);
  const allTags = await getAllPostTags();
  const portraitURL = await getPortraitURL();

  return {
    props: { preview, allPosts, allTags, portraitURL },
    revalidate: 60,
  };
}
