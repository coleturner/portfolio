import React from 'react';
import styled, { css } from 'react-emotion';

import Hyperlink from '../Components/Hyperlink';
import Icon from '../Components/Icon';

import ReactMarkdown from 'react-markdown';

import PORTRAIT_IMAGE from '../../images/portrait.jpg';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  align-content: center;
  height: 100%;
  min-height: 100vh;
  text-align: center;
  padding: 10vw;
`;

const Portrait = styled.div`
  width: 21em;
  height: 21em;
  width: 40vh;
  height: 40vh;
  min-height: 10em;
  min-width: 10em;
  max-width: 60vw;
  max-height: 60vw;
  border-radius: 21em;
  margin-bottom: 2em;
  position: relative;

  ${({ useBorder }) =>
    useBorder &&
    `

    background: #000;
    border: 6px solid #000;
  `}
`;

const Image = styled.img`
  border-radius: inherit;
  object-fit: cover;
  object-position: center center;
  width: 100%;
  height: 100%;
  transition: transform 150ms ease-in;
  transform-origin: center center;
`;

Image.defaultProps = {
  alt: 'Yours Truly'
};

const CSS_STATES = [
  css`
    transform: scale3d(-1, 1, 1) rotate3d(0, 0, 1, 0deg);
  `,
  css`
    transform: scale3d(-1, 1, 1) rotate3d(0, 0, 1, 15deg);
  `,
  css`
    transform: scale3d(-1, 1, 1) rotate3d(0, 0, 1, 45deg);
  `,
  css`
    transform: scale3d(-1, 1, 1) rotate3d(0, 0, 1, 90deg);
  `,
  css`
    transform: scale3d(-1, 1, 1) rotate3d(0, 0, 1, 120deg);
  `,
  css`
    transform: scale3d(-1, 1, 1) rotate3d(0, 0, 1, 140deg);
  `,
  css`
    transform: scale3d(-1, 1, 1) rotate3d(0, 0, 1, 160deg);
  `
];

const Heading = styled.h1`
  margin: 0;
  font-size: 5em;
  font-size: calc(1em + 4vh);
  line-height: 1;
  letter-spacing: -0.04em;
`;

const Subtitle = styled.h2`
  ${({ theme: { heading2 } }) => `${heading2}`} margin: 0;
  font-size: 1em;
  font-size: calc(1em + 1.3vh);
  @media (min-width: 500px) {
    font-size: calc(1em + 1.5vh);
  }
`;

const Menu = styled('nav')`
  font-size: 1.5em;
  margin-top: 1em;

  @media (min-width: 500px) {
    display: flex;
    flex-direction: row;
    justify-content: center;
    flex-wrap: wrap;
    flex: 0;
  }
`;

const Link = styled(Hyperlink)`
  display: block;
  margin: 0 1em;
  flex: 0 1 auto;
  min-width: 4em;
  text-align: center;
  color: #777;
  margin-bottom: 2em;

  &:hover {
    text-decoration: none;
    color: #000;

    svg use {
      fill: #000;
    }
  }

  svg {
    display: block;
    font-size: 1.5em;
    margin: 0 auto 0;
    margin-bottom: 0.5rem;

    @media (max-width: 500px) {
      display: none;
    }
  }
`;

export default class Card extends React.Component {
  componentDidMount() {
    this.maxHeight = screen.height || window.innerHeight;
  }

  state = {
    mouseOverIndex: -1
  };

  shouldAnimate = () => {
    if (!this.props.flags.animatePortrait) {
      return false;
    }

    return window.innerWidth >= 500;
  };

  outTimeoutMs = 500;
  onMouseOver = e => {
    if (!this.shouldAnimate()) {
      return null;
    }

    if (this.outTimeout) {
      clearTimeout(this.outTimeout);
    }

    const mouseOverIndex = Array.from(
      e.currentTarget.parentNode.children
    ).indexOf(e.currentTarget);

    this.setState({
      mouseOverIndex
    });
  };

  onMouseOut = () => {
    if (!this.shouldAnimate()) {
      return null;
    }

    this.outTimeout = setTimeout(
      () =>
        this.setState({
          mouseOverIndex: -1
        }),
      this.outTimeoutMs
    );
  };

  render() {
    const { links, title, subtitle, image, flags } = this.props;

    const { useBorder, animatePortrait } = flags;

    const widthBasedMax = (screen ? screen.width : window.innerWidth) * 0.6;
    const heightBasedMax = (screen ? screen.width : window.innerWidth) * 0.4;
    const w = Math.round(Math.min(widthBasedMax, heightBasedMax));

    const imageUrl = `${image.file.url}?w=${w}`;

    return (
      <Container>
        <Portrait key="the-portrait" useBorder={useBorder}>
          <Image
            key="the-image"
            src={imageUrl || PORTRAIT_IMAGE}
            className={
              animatePortrait && CSS_STATES[this.state.mouseOverIndex + 1]
            }
          />
        </Portrait>

        <Heading>{title}</Heading>
        {subtitle && (
          <Subtitle>
            <ReactMarkdown
              className="markdown"
              source={subtitle}
              renderers={{
                link: Hyperlink
              }}
            />
          </Subtitle>
        )}

        <Menu>
          {links.map(({ text, icon, path, url }) => {
            return (
              <Link
                key={text}
                path={path}
                href={url}
                onMouseOver={this.onMouseOver}
                onMouseOut={this.onMouseOut}
              >
                <Icon symbol={Icon.LIST[icon]} /> {text}
              </Link>
            );
          })}
        </Menu>
      </Container>
    );
  }
}
