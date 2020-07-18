import React from 'react';
import PropTypes from 'prop-types';

import Link from 'next/link';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import Container from './container';
import { SHADE } from '../styles/colors';
import { useRouter } from 'next/router';

const NavigationContainer = styled.nav`
  display: grid;
  place-items: center;
  position: relative;
  padding: 0.5em;
  font-weight: 600;

  a {
    margin: 0 1.25em;
    display: inline-block;
    color: inherit;
    text-decoration: none;

    &:hover,
    &[aria-current] {
      background: linear-gradient(
        to bottom right,
        var(--link-color-stop-1),
        var(--link-color-stop-2),
        var(--link-color-stop-3)
      );
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
  }
`;

const Menu = styled.div``;

function NavLink(props) {
  const { matchPaths, ...otherProps } = props;

  const { asPath, route } = useRouter();
  const isActive =
    asPath === props.href ||
    (Array.isArray(matchPaths) && matchPaths.includes(route));

  return <a {...otherProps} aria-current={isActive || undefined} />;
}

export default function Navigation() {
  return (
    <NavigationContainer>
      <Menu>
        <Link href="/" passHref>
          <NavLink>Home</NavLink>
        </Link>
        <Link href="/resume" passHref>
          <NavLink>Resume</NavLink>
        </Link>
        <Link href="/blog" passHref>
          <NavLink matchPaths={['/posts/[slug]']}>Blog</NavLink>
        </Link>
      </Menu>
    </NavigationContainer>
  );
}
