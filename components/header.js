import React from 'react';
import PropTypes from 'prop-types';

import Link from 'next/link';
import { useRouter } from 'next/router';
import styled from '@emotion/styled';
import { css, keyframes } from '@emotion/react';
import Container from './container';
import Navigation from './navigation';
import { SHADE } from '../styles/colors';
import AnimatedPortrait from './animatedPortrait';

const BREAKING_POINT = '800px';

const LOGO_TEXT_ANIMATE = keyframes`
  0% {
    background-position: 100%;
  }

  100% {
    background-position: -100%;
  }
`;

const HeaderContainer = styled.header`
  > div {
    justify-content: space-between;
  }

  background: #000;
  color: #fff;
  margin: 0;
  position: relative;
  text-align: center;
  padding: 2em 0;

  &::after {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 1em;
    background: linear-gradient(
      to top,
      ${SHADE[0.12]} 0%,
      rgba(0, 0, 0, 0) 100%
    );

    content: '';
  }
`;

const Title = styled.div`
  font-size: 2em;
  font-weight: 900;
  margin: 0;
  padding: 0;
  margin-left: 0.5rem;

  @media screen and (max-width: 600px) {
    display: none;
  }

  a {
    color: inherit;
    text-decoration: none;

    &:hover {
      background: repeating-linear-gradient(
        to right,
        var(--link-color-stop-2) 0%,
        var(--link-color-stop-3) 50%,
        var(--link-color-stop-2) 100%
      );

      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;

      background-size: 200%;
      animation: ${LOGO_TEXT_ANIMATE} 3s infinite linear;

      @media (prefers-reduced-motion: reduce) {
        animation: none;
      }
    }
  }
`;

const Logo = styled.div`
  --portrait-size: 3em;
  display: flex;
  flex-direction: row;
  text-decoration: none;
  color: inherit;

  svg {
    margin: 0 auto;
    display: block;
    font-size: 5em;
    border-radius: 100em;
  }
`;

export default function Header() {
  const { route } = useRouter();
  const tag = route === '/' ? 'h1' : 'div';

  return (
    <HeaderContainer>
      <Container flex="row">
        <Logo>
          <AnimatedPortrait border={false} />
          <Title as={tag}>
            <a href="/">Cole Turner</a>
          </Title>
        </Logo>
        <Navigation />
      </Container>
    </HeaderContainer>
  );
}
