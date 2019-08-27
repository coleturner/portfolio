import React from 'react';
import styled from 'react-emotion';

import Container from '../Components/Container';
import Hyperlink from '../Components/Hyperlink';
import Icon from '../Components/Icon';
import Picture from '../Components/Picture';

import PORTRAIT_IMAGE from '../../images/portrait.jpg';

const Footer = styled.footer`
  background: #d3dbe6;
  color: #aaa;
  margin: 0;
  padding: 2em 0;

  @media screen and (prefers-color-scheme: dark) {
    background: #111f33;
  }
`;

const Portrait = styled.div`
  padding: 3px;
  margin-left: auto;
  margin-right: auto;
  margin-top: -7em;
  text-align: center;
  position: relative;
  z-index: 2;

  ${Picture} {
    margin-bottom: 1em;
    height: 12em;
    width: 12em;
    border-radius: 12em;
    overflow: hidden;
    object-fit: cover;
    object-position: center center;
  }
`;

const Menu = styled.nav`
  font-size: 1.5em;
  text-align: center;
  color: #3f4f66;

  @media screen and (prefers-color-scheme: dark) {
    color: #6f8bb3;
  }

  ${Hyperlink} {
    display: inline-block;
    white-space: nowrap;
    margin: 0.5em 0.75em;
    color: inherit;

    ${Icon} use {
      fill: currentColor;
    }

    &:hover {
      color: #10141a;
      text-decoration: none;

      @media screen and (prefers-color-scheme: dark) {
        color: #fff;
      }
    }
  }
`;

export const AppFooter = () => {
  return (
    <Footer>
      <Container>
        <Portrait>
          <Picture src={PORTRAIT_IMAGE} />
        </Portrait>
        <Menu>
          <Hyperlink href="https://medium.com/@colecodes">
            <Icon symbol={Icon.LIST.MEDIUM} /> Blog
          </Hyperlink>
          <Hyperlink href="http://twitter.com/coleturner">
            <Icon symbol={Icon.LIST.TWITTER} /> Twitter
          </Hyperlink>
          <Hyperlink href="http://www.linkedin.com/in/colept">
            <Icon symbol={Icon.LIST.LINKED_IN} /> LinkedIn
          </Hyperlink>
          <Hyperlink href="https://github.com/coleturner">
            <Icon symbol={Icon.LIST.GITHUB} /> Github
          </Hyperlink>
        </Menu>
      </Container>
    </Footer>
  );
};

export default AppFooter;
