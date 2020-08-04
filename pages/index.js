import React from 'react';
import PropTypes from 'prop-types';
import postPropType from '../components/propTypes/postPropType';
import StoriesList from '../components/stories-list';
import Layout from '../components/layout';
import { getLatestPostsForHome, getPortraitURL } from '../lib/api';
import styled from '@emotion/styled';
import { PillButton } from '../components/button';
import AppFooter from '../components/footer';
import Link from 'next/link';
import { ScrollDown } from '../components/scrollDown';
import Waves from '../components/waves';
import Head from 'next/head';
import { BASE_URL } from '../lib/constants';
import MentorIcon from '../components/icons/mentor-icon';
import { css } from 'emotion';
import { keyframes } from '@emotion/react';
import useColorScheme from '../hooks/useColorScheme';
import { useReducedMotion } from 'framer-motion';

const GRADIENT_FLASH = keyframes`
  0% {
    background-position: 0%;
  }

  100% {
    background-position: 200%;
  }
`;

const borderStyle = css`
  --color-1: var(--theme-color-1);
  --color-2: var(--theme-color-2);
  --color-3: var(--theme-color-3);

  @media (prefers-color-scheme: dark) {
    --color-1: var(--link-color-stop-1);
    --color-2: var(--link-color-stop-2);
    --color-3: var(--link-color-stop-3);
  }

  position: relative;

  &::before {
    background: repeating-linear-gradient(
      to right,
      var(--color-1) 0%,
      var(--color-2) 25%,
      var(--color-3) 50%,
      var(--color-2) 75%,
      var(--color-1) 100%
    );
    background-size: 200%;
    border-radius: 100em;
    animation: ${GRADIENT_FLASH} 5s infinite linear;
    position: absolute;
    top: 50%;
    left: 50%;
    width: 100%;
    height: 100%;
    padding: 0.15em;
    transform: translate(-50%, -50%) rotate(45deg);
    content: ' ';

    @media (prefers-reduced-motion: reduce) {
      animation: none;
    }
  }
`;

const Portrait = styled.div`
  margin: 0 auto;
  margin-top: 1.5em;
  min-width: 6em;
  min-height: 6em;
  width: 9em;
  height: 9em;
  width: 30vmin;
  height: 30vmin;
  max-width: 288px;
  max-height: 288px;
  border-radius: 10em;
  ${borderStyle};

  img {
    width: inherit;
    height: inherit;
    min-width: inherit;
    min-height: inherit;
    max-width: inherit;
    max-height: inherit;
    border-radius: inherit;
    position: relative;
    z-index: 2;
  }
`;

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

const Biography = styled.div`
  font-size: 1em;

  @media (prefers-color-scheme: dark) {
    h2,
    p {
      background: #fff;
      background-size: 100%;
      background: linear-gradient(
        to bottom right,
        var(--link-color-stop-1) 0%,
        var(--link-color-stop-2) 50%,
        var(--link-color-stop-3) 100%
      );

      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
  }
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
    --primary-wave-color: #011630;
    --primary-wave-color-end: #000b17;
  }

  hr {
    opacity: 0.15;
    margin: 1em 0 3em 0;
  }
`;

export default function Index({ preview, latestPosts, portraitURL }) {
  const colorScheme = useColorScheme();
  const shouldReduceMotion = useReducedMotion();

  return (
    <Layout preview={preview}>
      <Head>
        <script
          key="structured-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org/',
              '@type': 'Person',
              name: 'Cole Turner',
              url: BASE_URL,
              image: BASE_URL + 'portrait.jpg',
              sameAs: [
                'https://twitter.com/coleturner',
                'https://www.linkedin.com/in/colept/',
                'https://github.com/coleturner',
              ],
              jobTitle: 'Software Engineer',
            }),
          }}
        />
      </Head>
      <CardList>
        <Card>
          <CardContent>
            <Portrait>
              <img src={portraitURL} alt="Cole Turner" />
            </Portrait>

            <CardText>
              <Biography>
                <Title>Cole Turner</Title>
                <p>
                  I am a software engineer who specializes in developing web
                  application products, seamless user experience, and
                  cross-functional communications.
                </p>
              </Biography>
            </CardText>
          </CardContent>
          <ScrollDown />
          {!shouldReduceMotion && (
            <Waves
              colors={
                colorScheme === 'dark'
                  ? [
                      'rgba(255, 72, 43, 0.5)',
                      'rgba(252, 186, 3, 0.5)',
                      'rgba(255, 72, 43, 0.5)',
                      'rgba(255, 230, 3, 0.5)',
                      'rgba(252, 107, 3, 0.5)',
                      'rgba(255, 230, 3, 0.25)',
                      'rgba(102, 191, 255, 0.5)',
                      '#011630',
                    ]
                  : [
                      '#a2d9ff',
                      'rgba(0, 204, 255, 0.5)',
                      'rgba(0, 153, 255, 0.5)',
                      '#66bfff',
                      'rgba(0, 229, 255, 0.5)',
                      'rgba(0, 153, 255, 0.5)',
                      '#09F',
                    ]
              }
            />
          )}
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
                    <StoriesList posts={latestPosts} />
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
          <Card
            style={{
              color: '#fff',
              fontSize: '1.5em',
            }}
          >
            <CardText>
              <hr />
              <MentorIcon style={{ fontSize: '3em' }} />
              <h2>Mentorship with Cole</h2>
              <p>
                Are you looking to level up, build more agency and autonomy, or
                develop your software engineering career? I&apos;d love to help.
                I can give you advice about your job search, including resume
                and cover letter reviews, or other career development needs.
              </p>

              <p>
                Are you seeking technical guidance? I can review code, chat
                about best practices, or guide you through your work. I can help
                with full-stack web development, front-end, back-end, and more.
              </p>
              <br />
              <PillButton
                as="a"
                colorScheme="dark"
                href="https://mentorcruise.com/mentor/ColeTurner/"
                target="_blank"
                rel="nofollow noopener noreferrer"
              >
                Apply for Mentorship
              </PillButton>
            </CardText>
          </Card>
          <AppFooter portraitURL={portraitURL} blendColor="rgba(0,0,0,0.55)" />
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
  const portraitURL = await getPortraitURL();
  return {
    props: { preview, latestPosts, portraitURL },
    revalidate: 60,
  };
}
