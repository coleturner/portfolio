import Container from '../components/container';
import MoreStories from '../components/stories-list';
import Header from '../components/header';
import HeroPost from '../components/post-preview';
import Layout from '../components/layout';
import { getAllPostsForHome } from '../lib/api';
import Head from 'next/head';
import AppFooter from '../components/footer';
import styled from '@emotion/styled';
import { SHADE } from '../styles/colors';

const Content = styled.div`
  --post-preview-shadow-color: ${SHADE[0.15]};
  margin-top: 3em;
`;

const FeaturedTitle = styled.h2``;
const Divider = styled.div`
  padding: 1em;
`;

export default function BlogIndex({ preview, allPosts }) {
  const heroPost = allPosts[0];
  const morePosts = allPosts.slice(1);
  return (
    <Layout preview={preview}>
      <Head>
        <title>Blog | Cole Turner</title>
      </Head>

      <Header />
      <Content>
        {heroPost && (
          <Container>
            <FeaturedTitle>Featured</FeaturedTitle>
            <HeroPost
              title={heroPost.title}
              coverImage={heroPost.coverImage}
              date={heroPost.date}
              author={heroPost.author}
              slug={heroPost.slug}
              excerpt={heroPost.excerpt}
              color={heroPost.color}
            />
          </Container>
        )}
        <Divider />
        <Container>
          {morePosts.length > 0 && (
            <MoreStories title="All Stories" posts={morePosts} />
          )}
        </Container>
      </Content>
      <AppFooter />
    </Layout>
  );
}

export async function getStaticProps({ preview = false }) {
  const allPosts = await getAllPostsForHome(preview);
  return {
    props: { preview, allPosts },
  };
}
