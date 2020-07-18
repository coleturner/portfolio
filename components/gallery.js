import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { css } from 'emotion';
import CoverImage from './cover-image';

const GalleryImage = styled.img`
  height: 100%;
  width: 100%;
  max-width: 100%;
  object-fit: cover;
  object-position: top center;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 2;

  opacity: ${({ isPreload }) => (isPreload ? '1' : '0')};

  ${({ isPreload }) =>
    isPreload &&
    `
      z-index: 1;
      filter: blur(30px);
  `};
`;

const ARROW_WIDTH = '8px';

const Container = styled.div`
  position: relative;
  overflow: hidden;
`;

const ScrollerItem = styled.div`
  border-radius: 0.35em;
  overflow: hidden;
  position: relative;
  flex: 0 0 100%;
  padding-bottom: ${({ aspectRatio }) => `${aspectRatio || 60}%`};
`;

const ScrollerItemContent = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

const Scroller = styled.div`
  display: flex;
  flex-direction: row;
  transition: left 150ms ease;
  position: relative;
  min-height: 15em;
  max-height: 60vh;
  max-height: 60vmax;
  left: ${({ slideIndex }) => `${-1 * slideIndex * 100}%`};
`;

const Images = styled.div`
  overflow: hidden;
  position: relative;

  &::before {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 3;
    border-radius: 0.35em;
    content: ' ';
    box-shadow: inset 0 0 3em rgba(0, 0, 0, 0.15);
  }
`;

const ARROW_STYLE = css`
  background: rgba(0, 0, 0, 0.65);
  border-radius: 10em;
  width: 3em;
  height: 3em;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  content: ' ';
  padding: 0.25em;
  z-index: 4;
  cursor: pointer;
  transition: all 150ms ease;

  &:hover {
    background: rgba(0, 0, 0, 0.85);

    &::before {
      opacity: 0.85;
    }
  }

  &::before {
    width: 0;
    height: 0;
    content: ' ';
    border: ${ARROW_WIDTH} solid transparent;
    position: absolute;
    opacity: 0.45;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
`;

const Previous = styled.div`
  ${ARROW_STYLE} left: 1em;

  &::before {
    border-right-color: #fff;

    margin-left: -6px;
  }

  ${({ disabled }) => disabled && 'left: -5em;'};
`;

const Next = styled.div`
  ${ARROW_STYLE};
  right: 1em;

  &::before {
    border-left-color: #fff;
    margin-left: 6px;
  }

  ${({ disabled }) => disabled && 'right: -5em;'};
`;

const SlidePicker = styled.div`
  padding: 0.5em 0 0;
  text-align: center;

  &:empty {
    display: none;
  }
`;

const SlidePickerOption = styled.div`
  display: inline-block;
  vertical-align: middle;
  border-radius: 10em;
  background: #ccc;
  width: 0.73em;
  height: 0.73em;
  margin: 0 0.35em;
  padding: 1px;
  cursor: pointer;

  &:hover {
    background: #333;

    @media screen and (prefers-color-scheme: dark) {
      background: var(--theme-color-1);
    }
  }

  ${({ isActive }) =>
    isActive &&
    css`
      background: #333;

      @media screen and (prefers-color-scheme: dark) {
        background: var(--theme-color-1);
      }
    `};
`;

export default class Gallery extends React.PureComponent {
  static propTypes = {
    images: PropTypes.arrayOf(
      PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.shape({
          src: PropTypes.string.isRequired,
          preloadSrc: PropTypes.string,
        }),
      ])
    ).isRequired,
  };

  state = { slideIndex: 0, srcLoaded: [], keepPreloading: false };
  srcTouched = [];

  toPrevious = () => {
    this.setState(this.stateToPrevious, this.preloadPrevious);
  };

  preloadPrevious = () => {
    const prevImage = this.props.images[this.state.slideIndex - 1];
    return prevImage && this.preload(prevImage);
  };

  stateToPrevious = (state) => {
    return {
      slideIndex: Math.max(0, state.slideIndex - 1),
    };
  };

  toNext = () => {
    this.setState(this.stateToNext, () => this.preloadNext());
  };

  preloadNext = () => {
    const nextImage = this.props.images[this.state.slideIndex + 1];
    return nextImage && this.preload(nextImage);
  };

  stateToNext = (state) => {
    return {
      slideIndex: Math.min(this.props.images.length - 1, state.slideIndex + 1),
    };
  };

  setSlideIndex = (index) => {
    this.setState({
      slideIndex: index,
    });
  };

  preload(src) {
    if (!src) {
      return;
    }

    const srcLoaded = [].concat(this.state.srcLoaded);
    if (this.srcTouched.indexOf(src) !== -1) {
      return;
    }

    this.srcTouched.push(src);

    const imageLoader = new Image();
    imageLoader.onload = () => {
      srcLoaded.push(src);
      this.setState({ srcLoaded });
      imageLoader.onload = () => {};
    };

    imageLoader.src = src;
    if (imageLoader.complete) {
      imageLoader.onload();
    }
  }

  isSourceLoaded(src) {
    return this.state.srcLoaded.indexOf(src) !== -1;
  }

  renderScroller() {
    const { images } = this.props;
    const { slideIndex } = this.state;

    const aspectRatio = images.reduce((value, image) => {
      const width = typeof image === 'string' ? null : image.width;
      const height = typeof image === 'string' ? null : image.height;

      const ratio = width && height && (height / width) * 100;

      return ratio < value ? ratio : value;
    }, 100);

    return (
      <Scroller slideIndex={slideIndex}>
        {images.map((image, index) => {
          const src = typeof image === 'string' ? image : image.src;

          return (
            <ScrollerItem
              key={index}
              aspectRatio={aspectRatio}
              isActive={this.state.slideIndex === index && 'active'}
            >
              <ScrollerItemContent>
                <CoverImage url={src} borderRadius={0} />
              </ScrollerItemContent>
            </ScrollerItem>
          );
        })}
      </Scroller>
    );
  }

  render() {
    const { images } = this.props;
    return (
      <Container className="gallery">
        <Previous
          onClick={this.toPrevious}
          disabled={this.state.slideIndex <= 0}
        />
        <Next
          onClick={this.toNext}
          disabled={this.state.slideIndex >= this.props.images.length - 1}
        />
        <Images>{this.renderScroller()}</Images>
        <SlidePicker>
          {images.length > 1 &&
            images.map((image, index) => {
              return (
                <SlidePickerOption
                  key={index}
                  isActive={this.state.slideIndex === index && 'active'}
                  onClick={() => this.setSlideIndex(index)}
                />
              );
            })}
        </SlidePicker>
      </Container>
    );
  }
}
