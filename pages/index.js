import React from 'react';
import PropTypes from 'prop-types';
import postPropType from '../components/propTypes/postPropType';
import MoreStories from '../components/stories-list';
import Layout from '../components/layout';
import { getLatestPostsForHome } from '../lib/api';
import styled from '@emotion/styled';

import AnimatedPortrait from '../components/animatedPortrait';
import { PillButton } from '../components/button';

import AppFooter from '../components/footer';
import Link from 'next/link';
import { ScrollDown } from '../components/scrollDown';
import { Waves } from '../components/waves';
import { RocketShip } from '../components/rocketShip';
import { Clouds } from '../components/clouds';
import { SunOrMoon } from '../components/sunAndMoon';
import Typewriter from '../components/typewriter';

const CardList = styled.div`
  max-width: 100%;
  width: 100%;
  overflow: hidden;
`;

const Card = styled.div`
  display: grid;
  place-items: center;
  font-size: 2em;
  min-height: 100%;
  text-align: center;
  width: 100%;
  position: relative;
  z-index: 1;
  min-height: 100vh;

  .netflix-link {
    color: #e50914;

    @media (prefers-color-scheme: dark) {
      color: #ff3d47;
    }
  }

  .paypal-link {
    color: #003087;

    @media (prefers-color-scheme: dark) {
      color: #0079c1;
    }
  }

  .tinychat-link {
    color: #257aa2;

    @media (prefers-color-scheme: dark) {
      color: #2f9bce;
    }
  }
`;

const CardContent = styled.div`
  width: 100%;
`;

const CardText = styled.div`
  margin: 0 auto;
  max-width: 700px;
  max-width: 60ch;
  width: 91%;
`;

const Title = styled.h1`
  margin: 0;
  letter-spacing: -0.06em;
  margin-top: 0.5em;
`;

const Introduction = styled.div`
  width: 91%;
  max-width: 70ch;
  margin: 0 auto;
  opacity: 0.85;
`;

const LastCardContainer = styled.div`
  --primary-wave-color: #09f;
  --primary-wave-color-end: #04a;

  background: #09f;
  background: var(--primary-wave-color);
  background: #09f linear-gradient(to bottom, #09f 0%, #04a 100%);
  background: var(--primary-wave-color)
    linear-gradient(
      to bottom,
      var(--primary-wave-color) 0%,
      var(--primary-wave-color-end) 100%
    );
  position: relative;
  z-index: 1;

  @media (prefers-color-scheme: dark) {
    --primary-wave-color: #030f36;
    --primary-wave-color-end: #10131c;
  }

  &::before {
    position: absolute;
    bottom: 100%;
    left: 0;
    right: 0;
    background: #09f;
    background: var(--primary-wave-color);
    height: 4.5em;
    content: ' ';
  }
`;

export default function Index({ preview, latestPosts }) {
  return (
    <Layout preview={preview}>
      <CardList>
        <Card>
          <CardContent>
            <div style={{ marginTop: '1em' }}>
              <AnimatedPortrait interactable={true} />
            </div>

            <Title>Cole Turner</Title>
            <Introduction>
              <Typewriter text="I enjoy developing 👉good👈great ideas for the web." />
            </Introduction>
          </CardContent>
          <ScrollDown />
        </Card>
        <Card>
          <SunOrMoon />
          <Waves />
          <Clouds />
          <RocketShip />

          <CardContent>
            <CardText style={{ paddingBottom: '1em' }}>
              <h2>
                I ship code at{' '}
                <strong>
                  <a
                    target="_blank"
                    rel="nofollow noreferrer"
                    href="https://www.netflix.com/"
                    className="netflix-link"
                  >
                    Netflix
                  </a>
                </strong>
                .
              </h2>
              <p>
                Previously, I worked at{' '}
                <strong>
                  <a
                    target="_blank"
                    rel="nofollow noreferrer"
                    href="https://www.paypal.com/"
                    className="paypal-link"
                  >
                    PayPal
                  </a>
                </strong>
                <br />
                and co-founded{' '}
                <strong>
                  <a
                    target="_blank"
                    rel="nofollow noreferrer"
                    href="https://www.tinychat.com/"
                    className="tinychat-link"
                  >
                    Tinychat
                  </a>
                </strong>
                .
              </p>
            </CardText>
          </CardContent>
        </Card>
        <LastCardContainer>
          <Card
            style={{
              color: '#fff',
              placeItems: 'flex-start',
            }}
          >
            <CardContent>
              <CardText>
                <h2>Recent posts</h2>

                <div
                  style={{ maxWidth: 600, margin: '0 auto', fontSize: '1rem' }}
                >
                  {latestPosts.length > 0 && (
                    <MoreStories posts={latestPosts} />
                  )}
                  <Link href="/blog" passHref>
                    <PillButton as="a" colorScheme="dark">
                      See more posts
                    </PillButton>
                  </Link>
                </div>
              </CardText>
            </CardContent>
          </Card>
          <AppFooter blendColor="rgba(0,0,0,0.55)" />
        </LastCardContainer>
      </CardList>
    </Layout>
  );
}

Index.propTypes = {
  preview: PropTypes.bool,
  latestPosts: PropTypes.arrayOf(postPropType),
};

export async function getStaticProps({ preview = false }) {
  const latestPosts = await getLatestPostsForHome(preview);
  return {
    props: { preview, latestPosts },
  };
}
