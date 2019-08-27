import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'react-emotion';

import Container from '../Components/Container';
import Logo from './Logo';
import Hyperlink from '../Components/Hyperlink';

const BREAKING_POINT = '800px';

const LogoContainer = styled.div`
  margin: 0;
  font-size: 1.5em;
  letter-spacing: -0.05em;
  line-height: 1.4;
  color: #333;
  transition: all 0.2s ease-out;

  font-weight: 600;
  display: inline-block;
  vertical-align: middle;
  position: relative;
  white-space: nowrap;
  z-index: 10;

  a {
    display: block;
    -webkit-font-smoothing: subpixel-antialiased;
    color: inherit;
    font-size: 2.5em;
    text-decoration: none !important;
    transition: all 0.15s ease-out;
    transition-property: font-size, letter-spacing, text-shadow, transform;
  }

  @media screen and (prefers-color-scheme: dark) {
    color: #8fbfea;
  }
`;

const stickyStyle = css`
  @media screen and (min-width: ${BREAKING_POINT}) {
    animation-fill-mode: forwards;
    transition: all 150ms ease;
    transition-property: padding, background;
    background: #fff;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    padding: 0;
    box-shadow: 0 0.5em 1em rgba(0, 0, 0, 0.15);

    a {
      font-size: 2em;
      transform: none !important;
      text-shadow: none;
    }
  }
`;

const Header = styled.header`
  margin: 0;
  position: relative;
  z-index: 5;
  text-align: center;
  padding: 2em 0;
  will-change: padding;

  body.index & {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
  }

  ${({ sticky }) => sticky && stickyStyle}
  ${({
    sticky,
    theme: {
      ANIMATIONS: { SLIDE_DOWN }
    }
  }) =>
    sticky &&
    `
    animation: ${SLIDE_DOWN} 500ms;
  `}
`;

const HeaderContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  z-index: 3;

  ${Container} {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;

    @media screen and (min-width: 900px) {
      justify-content: space-between;
    }
  }
`;

const Navigation = styled.nav`
  font-size: 1.25em;
  letter-spacing: -1px;
  color: #222;
  vertical-align: middle;
  position: relative;
  padding: 0.5em;
  mix-blend-mode: multiply;
  white-space: nowrap;

  @media screen and (prefers-color-scheme: dark) {
    color: #ddd;
  }

  ${Hyperlink} {
    margin: 0 1.25em;
    display: inline-block;
    vertical-align: middle;
    zoom: 1;
    *display: inline;
    color: inherit;
    letter-spacing: 1px;
    border-bottom: 2px solid transparent;
    text-decoration: none;

    &.active {
      font-weight: 600;
    }

    &.active,
    &:hover {
      border-bottom: 2px solid
        ${({
          theme: {
            COLORS: { PRIMARY }
          }
        }) => PRIMARY};
    }
  }
`;

const Menu = styled.div``;

export default class HeaderView extends React.PureComponent {
  static propTypes = {
    animateLogo: PropTypes.bool.isRequired
  };

  state = { sticky: false };

  componentDidMount() {
    document.addEventListener('scroll', this.onScroll);
  }

  componentWillUnmount() {
    document.removeEventListener('scroll', this.onScroll);
  }

  onScroll = () => {
    if (!this.node) {
      return;
    }

    if (document.body.scrollTop > this.node.offsetHeight) {
      if (!this.state.sticky) {
        this.setState({ sticky: true });
      }
    } else if (this.state.sticky) {
      this.setState({ sticky: false });
    }
  };

  logo() {
    if (document.body.className.indexOf('index') === -1) {
      return (
        <LogoContainer>
          <Logo animateLogo={this.props.animateLogo} />
        </LogoContainer>
      );
    }

    const H1 = LogoContainer.withComponent('h1');

    return (
      <H1>
        <Logo animateLogo={this.props.animateLogo} />
      </H1>
    );
  }

  onReference = node => {
    this.node = node;
  };

  render() {
    return (
      <Header ref={this.onReference} sticky={this.state.sticky}>
        <HeaderContent>
          <Container>
            {this.logo()}
            <Navigation>
              <Menu>
                <Hyperlink path="/" activeClassName="active">
                  Home
                </Hyperlink>
                <Hyperlink path="resume" activeClassName="active">
                  Resume
                </Hyperlink>
                <Hyperlink
                  href="https://medium.com/@colecodes"
                  activeClassName="active"
                >
                  Blog
                </Hyperlink>
              </Menu>
            </Navigation>
          </Container>
        </HeaderContent>
      </Header>
    );
  }
}
