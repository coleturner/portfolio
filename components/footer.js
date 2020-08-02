import React from 'react';
import styled from '@emotion/styled';
import Container from 'components/container';
import Navigation from 'components/navigation';
import TwitterIcon from 'components/icons/twitter-icon';
import LinkedInIcon from 'components/icons/linkedin-icon';
import GithubIcon from 'components/icons/github-icon';
import { PORTRAIT_URL } from '../lib/constants';

const BREAKPOINT_MOBILE = '500px';

const FooterContainer = styled.div`
  margin-top: 7em;
`;

const Footer = styled.footer`
  background: #000;
  color: rgba(255, 255, 255, 0.85);
  margin: 0;
  padding: 2em 0;
  text-align: center;

  @media screen and (min-width: ${BREAKPOINT_MOBILE}) {
    text-align: left;

    .container {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
    }
  }

  #icon-gradient {
    --color-stop-1: #00dbde;
    --color-stop-2: #00de82;
    --color-stop-3: #00a3de;
  }

  a:hover svg {
    background: #fff;
    border-radius: 10em;
    fill: url(#icon-gradient) currentColor;
  }
`;

const Portrait = styled.div`
  height: 9em;
  width: 9em;
  border-radius: 12em;
  padding: 0.15em;
  text-align: center;
  position: relative;
  z-index: 2;
  margin: 1em auto;

  @media screen and (min-width: ${BREAKPOINT_MOBILE}) {
    margin: 0;
    margin-bottom: 1em;
  }

  &::before {
    background: linear-gradient(
      to bottom,
      var(--theme-color-1) 0%,
      var(--theme-color-2) 50%,
      var(--theme-color-3) 100%
    );

    content: '';
    position: absolute;
    border-radius: inherit;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: -1;
    transform: rotate(-45deg);
  }

  img {
    background: #000;
    width: 100%;
    height: 100%;
    border-radius: inherit;
    margin-bottom: 0;
    overflow: hidden;
    object-fit: cover;
    object-position: center center;
  }
`;

const NavigationContainer = styled.div`
  font-size: 1.2em;
`;

const SocialMenu = styled.nav`
  font-size: 2em;
  padding: 0 0.5em;

  a {
    display: inline-block;
    white-space: nowrap;
    margin: 0.5em 0.5em;
    color: inherit;
    text-decoration: none;

    &:hover {
      color: #10141a;
      text-decoration: none;
    }
  }
`;

export default function AppFooter() {
  return (
    <FooterContainer>
      <Footer>
        <Container>
          <NavigationContainer>
            <Navigation />
            <SocialMenu>
              <a
                target="_blank"
                rel="noreferrer"
                href="http://twitter.com/coleturner"
              >
                <TwitterIcon title="Twitter" />
              </a>
              <a
                target="_blank"
                rel="noreferrer"
                href="http://www.linkedin.com/in/colept"
              >
                <LinkedInIcon title="LinkedIn" />
              </a>
              <a
                target="_blank"
                rel="noreferrer"
                href="https://github.com/coleturner"
              >
                <GithubIcon title="Github" />
              </a>
            </SocialMenu>
            <svg
              aria-hidden="true"
              style={{
                width: 0,
                height: 0,
                position: 'absolute',
              }}
            >
              <linearGradient id="icon-gradient" x2="1" y2="1">
                <stop offset="0%" stopColor="var(--color-stop-1)">
                  <animate
                    attributeName="offset"
                    values="0;.15;0"
                    dur="2s"
                    repeatCount="indefinite"
                  />
                </stop>
                <stop offset="50%" stopColor="var(--color-stop-2)">
                  <animate
                    attributeName="offset"
                    values=".5;.65;.5"
                    dur="2s"
                    repeatCount="indefinite"
                  />
                </stop>
                <stop offset="75%" stopColor="var(--color-stop-3)" />
              </linearGradient>
            </svg>
          </NavigationContainer>
          <div>
            <Portrait>
              <img src={PORTRAIT_URL} alt="Cole, smiling." />
            </Portrait>
          </div>
        </Container>
      </Footer>
    </FooterContainer>
  );
}
