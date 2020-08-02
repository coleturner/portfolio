import React from 'react';

import { useRouter } from 'next/router';
import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';
import Container from 'components/container';
import Navigation from 'components/navigation';
import { SHADE } from 'styles/colors';
import AnimatedPortrait from 'components/animatedPortrait';
import { PORTRAIT_URL } from '../lib/constants';

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
  display: flex;
  flex-direction: row;
  text-decoration: none;
  color: inherit;
  align-items: center;
`;

const Portrait = styled.img`
  width: 3em;
  height: 3em;
  border-radius: 3em;
  margin-right: 0.3em;
`;

export default function Header() {
  const { route } = useRouter();
  const tag = route === '/' ? 'h1' : 'div';

  return (
    <HeaderContainer>
      <Container flex="row">
        <Logo>
          <Portrait loading="eager" src={PORTRAIT_URL} alt="Cole Turner" />
          <Title as={tag}>
            <a href="/">Cole Turner</a>
          </Title>
        </Logo>
        <Navigation />
      </Container>
    </HeaderContainer>
  );
}
