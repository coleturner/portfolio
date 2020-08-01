import React, {
  useMemo,
  useState,
  useEffect,
  useRef,
  useLayoutEffect,
} from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { css } from 'emotion';
import CoverImage from 'components/cover-image';

const ARROW_WIDTH = '8px';

const Container = styled.div(
  ({ maxWidth }) => css`
    position: relative;
    overflow: hidden;
    ${maxWidth
      ? css`
          max-width: ${maxWidth}px;
          margin: 0 auto;
        `
      : ''};
  `
);

const ScrollerItem = styled.div`
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
  transition: transform 500ms ease-in;
  position: relative;
  min-height: 15em;
  transform: translateX(${({ slideIndex }) => `${-1 * slideIndex * 100}%`});

  @media screen and (prefers-reduced-motion: reduce) {
    transition: none;
  }
`;

const Images = styled.div`
  overflow: hidden;
  position: relative;
  border-radius: 0.35em;

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

const Buttons = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
`;

const ARROW_STYLE = css`
  position: absolute;
  top: 50%;
  background: rgba(0, 0, 0, 0.75);
  border: 0;
  border-radius: 10em;
  width: 3em;
  height: 3em;
  content: ' ';
  padding: 0.25em;
  z-index: 4;
  cursor: pointer;
  transition: transition 150ms ease-in;
  touch-action: manipulation;

  @media screen and (prefers-reduced-motion: reduce) {
    transition: none;
  }

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
    cursor: inherit;
  }
`;

const Previous = styled.button`
  ${ARROW_STYLE};
  left: 0;
  transform: translateX(1em);

  &::before {
    border-right-color: #fff;
    margin-left: -6px;
  }

  ${({ disabled }) => disabled && 'transform: translateX(-5em);'};
`;

const Next = styled.button`
  ${ARROW_STYLE};
  right: 0;
  transform: translateX(-1em);

  &::before {
    border-left-color: #fff;
    margin-left: 6px;
  }

  ${({ disabled }) => disabled && 'transform: translateX(5em);'};
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
      background: var(--gallery-bullet-color, var(--theme-color-1));
    }
  }

  ${({ isActive }) =>
    isActive &&
    css`
      background: #333;

      @media screen and (prefers-color-scheme: dark) {
        background: var(--gallery-bullet-color, var(--theme-color-1));
      }
    `};
`;

const ImageTitle = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 2;
  padding: 0.5em;
  font-size: 1rem;
  background: rgba(0, 0, 0, 0.65);
  color: #fff;
  text-align: center;
  overflow: hidden;
  max-height: 100%;
  max-width: 100%;
`;

export default function Gallery({ images, fit = 'contain' }) {
  const [slideIndex, setSlideIndex] = useState(0);
  const lastSlideIndexRef = useRef(null);
  const previousButtonRef = useRef();
  const nextButtonRef = useRef();

  const isStartSlide = slideIndex === 0;
  const isEndSlide = slideIndex === images.length - 1;

  useEffect(() => {
    lastSlideIndexRef.current = slideIndex;
  });

  useLayoutEffect(() => {
    if (isStartSlide && lastSlideIndexRef.current === slideIndex + 1) {
      nextButtonRef.current.focus();
    } else if (isEndSlide && lastSlideIndexRef.current === slideIndex - 1) {
      previousButtonRef.current.focus();
    }
  }, [slideIndex]);

  const aspectRatio = useMemo(
    () =>
      images.reduce((value, image) => {
        const { width, height } = image;

        const ratio = width && height && (height / width) * 100;

        return Math.max(ratio, value);
      }, 0),
    [...images.map((n) => n.src)]
  );

  const maxWidth = useMemo(
    () =>
      images.reduce((value, image) => {
        const { width } = image;

        return Math.max(width, value);
      }, 0),
    [...images.map((n) => n.src)]
  );

  const toPrevious = () => {
    setSlideIndex(Math.max(0, slideIndex - 1));
  };

  const toNext = () => {
    setSlideIndex(Math.min(images.length - 1, slideIndex + 1));
  };

  return (
    <Container className="gallery" maxWidth={maxWidth}>
      <Buttons>
        <Previous
          ref={previousButtonRef}
          onClick={toPrevious}
          disabled={slideIndex <= 0}
        />
        <Next
          ref={nextButtonRef}
          onClick={toNext}
          disabled={slideIndex >= images.length - 1}
        />
      </Buttons>
      <Images>
        <Scroller slideIndex={slideIndex}>
          {images.map((image, index) => {
            const { src, title } = image;

            return (
              <ScrollerItem
                key={index}
                aspectRatio={aspectRatio}
                isActive={slideIndex === index && 'active'}
              >
                <ScrollerItemContent>
                  <CoverImage
                    url={src}
                    borderRadius={0}
                    shadow={false}
                    fit={fit}
                  />
                  {title && <ImageTitle>{title}</ImageTitle>}
                </ScrollerItemContent>
              </ScrollerItem>
            );
          })}
        </Scroller>
      </Images>
      <SlidePicker>
        {images.length > 1 &&
          images.map((image, index) => {
            return (
              <SlidePickerOption
                key={index}
                isActive={slideIndex === index && 'active'}
                onClick={() => setSlideIndex(index)}
              />
            );
          })}
      </SlidePicker>
    </Container>
  );
}

Gallery.propTypes = {
  fit: PropTypes.string,
  images: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.shape({
        src: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
      }),
    ])
  ).isRequired,
};
