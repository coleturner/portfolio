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
import TagList from 'components/taglist';
import { BASE_URL } from '../lib/constants';
import { css } from 'emotion';

const Content = styled.div`
  --post-preview-shadow-color: ${SHADE[0.15]};
  margin-top: 3em;
`;

const Divider = styled.div`
  padding: 1em;
`;

export default function BlogIndex({ preview, allPosts, allTags, portraitURL }) {
  const heroPost = allPosts[0];
  const morePosts = allPosts.slice(1);

  const description =
    'Here is where Cole shares career advice, writes about software engineering, user experience, and more.';

  return (
    <Layout preview={preview}>
      <Head>
        <title key="title">Blog | Cole Turner</title>
        <link rel="canonical" href={BASE_URL + 'blog'} />
        <meta key="description" name="description" content={description} />
        <meta
          key="og:description"
          name="og:description"
          content={description}
        />
      </Head>

      <Header portraitURL={portraitURL} />
      <TagList tags={allTags} />
      <div
        css={css`
          background: linear-gradient(
            to bottom right,
            var(--page-background-color) 0%,
            var(--page-background-color-invert-15) 70%,
            var(--page-background-color-invert-5) 100%
          );
        `}
      >
        <div
          css={css`
            display: flex;
            flex-direction: column;
            align-items: center;
            text-align: center;
            padding: 1em;
            max-width: calc(70ch + 20em);
            margin: 0 auto;

            @media screen and (min-width: 800px) {
              flex-direction: row;
              text-align: left;
            }
          `}
        >
          <div
            css={css`
              flex: 1;
            `}
          >
            <blockquote>
              <div
                css={css`
                  font-size: 2.3em;
                  font-size: clamp(1em, 1em + 1vmin, 2.3em);

                  strong {
                    ${gradientTextStyle};

                    span {
                      white-space: nowrap;
                    }
                  }
                `}
              >
                Want to learn more about{' '}
                <strong>
                  <span>Software Engineering,</span> <span>Career Advice</span>,
                  and code?
                </strong>{' '}
                Here is where I share my thoughts and expertise.
              </div>
            </blockquote>
          </div>
          <div
            css={css`
              flex: 0;
              padding: 1em;
            `}
          />
          <div
            css={css`
              flex: 0;
            `}
          >
            <img src="/cole_desk.svg" alt="" style={{ width: '20em' }} />{' '}
          </div>
        </div>
      </div>
      <Content>
        {heroPost && (
          <Container>
            <StoriesList posts={[heroPost]} />
          </Container>
        )}
        <Divider />
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
