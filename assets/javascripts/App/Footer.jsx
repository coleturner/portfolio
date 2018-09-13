import React from 'react';
import styled from 'react-emotion';

import Container from '../Components/Container';
import Hyperlink from '../Components/Hyperlink';
import Icon from '../Components/Icon';
import Picture from '../Components/Picture';
import View from '../Components/View';

import PORTRAIT_IMAGE from '../../images/portrait.jpg';
import FOOTER_MAP from '../../images/footer-map.jpg';

const Footer = styled.footer`
  background: #333 url(${FOOTER_MAP}) no-repeat center center;
  background-size: cover;
  color: #aaa;
  margin: 0;
`;

const Title = styled.h4`
  text-align: center;
  margin-top: 0.75em;
  margin-bottom: 0;
  font-size: 2em;
  text-transform: uppercase;
  color: #ddd;
  font-weight: 900;
`;

const Portrait = styled.div`
  padding: 3px;
  margin-left: auto;
  margin-right: auto;
  margin-top: -3.5em;
  text-align: center;
  position: relative;
  z-index: 2;

  ${Picture} {
    background: #333;
    border: 0.65em solid #333;
    margin-bottom: 1em;
    height: 12em;
    width: 12em;
    border-radius: 12em;
    overflow: hidden;
    object-fit: cover;
    object-position: center center;
  }
`;

const Availability = styled.div`
  padding: 0.5em 1em;
  border-radius: 10em;
  background: $success-color;
  font-size: 1.35em;
  font-weight: 300;
  color: #fff;
  display: inline-block;
  position: absolute;
  bottom: 0;
  left: 50%;
  z-index: 2;
  transform: translateX(-50%);
  white-space: nowrap;
  transition: transform 150ms ease-out;
  will-change: transform;

  &:hover {
    text-decoration: none;
    color: #fff;
    transform: translateX(-50%) scale(1.1);
  }

  ${Icon} {
    margin-right: 0.5em;
    use {
      fill: #fff;
    }
  }
`;

const Menu = styled.nav`
  padding: 1.5em 0;
  font-size: 1.5em;
  text-align: center;

  ${Hyperlink} {
    margin: 0 0.75em;
    color: inherit;

    &:hover {
      color: #fff;
      text-decoration: none;

      ${Icon} use {
        fill: #fff;
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
        <Title>Connect with me via</Title>
        <Menu>
          <Hyperlink href="https://medium.com/@colecodes">
            <Icon symbol={Icon.LIST.MEDIUM} /> Blog
          </Hyperlink>
          <Hyperlink href="mailto:turner.cole@gmail.com">
            <Icon symbol={Icon.LIST.MAIL} /> Email
          </Hyperlink>
          <Hyperlink href="http://twitter.com/colepatrickturner">
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
