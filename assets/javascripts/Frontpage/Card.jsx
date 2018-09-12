import React from 'react';
import styled from 'react-emotion';

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
  transition: transform 0ms ease-in;
  transform-origin: center center;
  background: #000;
  border: 6px solid #000;
  position: relative;

  &::before {
    background-image: linear-gradient(to bottom, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.15) 100%);
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    content: " ";
    z-index: 2;
    border-radius: inherit;
  }
`;

const Image = styled.img`
  border-radius: inherit;
  object-fit: cover;
  object-position: center center;
  width: 100%;
  height: 100%;

  ${({ directionIndex, prevDirectionIndex }) =>
    directionIndex === -1 && prevDirectionIndex <= 2 ? 'transform: scale3d(-1, 1, 1) rotate(0deg);' : null}
  ${({ directionIndex, prevDirectionIndex }) =>
    directionIndex === -1 && prevDirectionIndex > 2 ? 'transform: scale3d(1, 1, 1) rotate(0deg) ;' : null}
  ${({ directionIndex }) =>
    directionIndex === 0 ? 'transform: scale3d(-1, 1, 1) rotate(15deg);' : null}
  ${({ directionIndex }) =>
    directionIndex === 1 ? 'transform: scale3d(-1, 1, 1) rotate(45deg);' : null}
  ${({ directionIndex, prevDirectionIndex }) =>
    directionIndex === 2 && prevDirectionIndex < directionIndex
      ? 'transform: scale3d(-1, 1, 1) rotate(90deg);'
      : null}
  ${({ directionIndex, prevDirectionIndex }) =>
    directionIndex === 2 && prevDirectionIndex >= directionIndex
      ? 'transform: rotate(90deg);'
      : null}
  ${({ directionIndex }) =>
    directionIndex === 3 ? 'transform: rotate(45deg);' : null}
  ${({ directionIndex }) =>
    directionIndex === 4 ? 'transform: rotate(15deg);' : null}
  ${({ directionIndex, prevDirectionIndex }) =>
  (
    !['32', '12'].includes(`${directionIndex}${prevDirectionIndex}`)
  ) &&
    Math.abs(directionIndex - prevDirectionIndex) === 1 ? 
      'transition-duration: 150ms;' :
      null
    }
`;

Image.defaultProps = {
  alt: 'Yours Truly'
};

const Heading = styled.h1`
  margin: 0;
  font-size: 5em;
  font-size: calc(1em + 4vh);
  line-height: 1;
  letter-spacing: -0.04em;
`;

const Subtitle = styled.h2`
  margin: 0;
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
    mouseOverIndex: -1,
    prevMouseOverIndex: -1
  };

  shouldAnimate = () => {
    if (!this.props.flags.animatePortrait) {
      return false;
    }

    return window.innerWidth >= 500;
  }

  outTimeoutMs = 500;
  onMouseOver = e => {
    if (!this.shouldAnimate()) {
      return null;
    }

    if (this.outTimeout) {
      clearTimeout(this.outTimeout);
    }

    const prevMouseOverIndex = this.state.mouseOverIndex == -1 ? this.state.prevMouseOverIndex : this.state.mouseOverIndex;
    const mouseOverIndex = Array.from(
      e.currentTarget.parentNode.children
    ).indexOf(e.currentTarget);

    if (mouseOverIndex === prevMouseOverIndex) {
      return;
    }

    this.setState({
      mouseOverIndex,
      prevMouseOverIndex
    });
  };

  onMouseOut = () => {
    if (!this.shouldAnimate()) {
      return null;
    }

    this.outTimeout = setTimeout(
      () => this.setState({ mouseOverIndex: -1, prevMouseOverIndex: this.state.mouseOverIndex }),
      this.outTimeoutMs
    );
  };

  render() {
    const { links, title, subtitle, image } = this.props;

    const imageUrl = image.file.url;

    return (
      <Container>
          <Portrait>
            <Image
              src={imageUrl || PORTRAIT_IMAGE} 
              directionIndex={this.state.mouseOverIndex}
              prevDirectionIndex={this.state.prevMouseOverIndex}
            />
          </Portrait>

        <Heading>{title}</Heading>
        {subtitle &&
          <Subtitle>
            <ReactMarkdown
              className="markdown"
              source={subtitle}
              renderers={{
                'Link': Hyperlink
            }} />
          </Subtitle>
        }

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
                <Icon id={Icon.LIST[icon]} /> {text}
              </Link>
            );
          })}
        </Menu>
      </Container>
    );
  }
}
