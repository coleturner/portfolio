import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import Container from './container';
import { useEffect, useState, useMemo } from 'react';
import parse from 'url-parse';
import { AnimatePresence, motion } from 'framer-motion';
import { css } from '@emotion/react';
import { CONTENTFUL_HOST } from '../lib/constants';

const CoverImageContainer = styled.div(
  ({ borderRadius }) => css`
    border-radius: ${borderRadius}em;
    width: 100%;
    height: 100%;
    border-bottom: var(--cover-image-border-width) solid
      var(--cover-image-color);
    position: relative;
    overflow: hidden;
  `
);

const CoverImageElement = styled.div(
  ({ imageURL, blurry, shadow, fit = 'cover' }) => {
    return css`
      background-color: var(--cover-image-color-0_3);
      background-image: url(${imageURL});
      background-repeat: no-repeat;
      background-position: center center;
      background-position: var(
        --cover-image-background-position,
        center center
      );
      background-size: ${fit};
      border-radius: inherit;
      width: 100%;
      height: 100%;
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      z-index: ${blurry ? '2' : '1'};

      ${blurry &&
      css`
        filter: blur(10px);
      `};

      &::after {
        background-color: var(
          --cover-image-gradient-overlay-color,
          var(--cover-image-color-0_3)
        );
        ${shadow &&
        css`
          background-image: linear-gradient(
            to bottom,
            rgba(0, 0, 0, 0) 0%,
            rgba(0, 0, 0, 0.85) 100%
          );
        `};
        boxshadow: inset 0 0 100px #000;
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        content: '';
      }
    `;
  }
);

const Sizer = styled.div(
  ({ size }) =>
    css`
      padding-top: ${size}%;
      padding-bottom: 3%;
      position: relative;
    `
);

const CoverImageContent = styled.div`
  min-height: 10em;
  color: #fff;
  z-index: 3;
  position: relative;
`;

function getThumbURL(urlStr) {
  if (!urlStr) {
    return null;
  }

  const params = {};

  if (urlStr.includes(CONTENTFUL_HOST)) {
    params.fm = 'jpg';
    params.w = 50;
    params.fit = 'thumb';
  }

  const url = parse(urlStr, true);
  url.query = { ...url.query, ...params };

  return url.toString();
}

function getFullURL(urlStr, dimensions) {
  if (!urlStr) {
    return null;
  }

  const [width, height] = dimensions;

  const params = {};

  if (urlStr.includes(CONTENTFUL_HOST)) {
    params.fm = 'jpg';
  }

  if (width) {
    // Add some padding to it, for quality
    params.w = Math.round(width + 100);
  }

  if (height) {
    params.h = Math.round(height + 100);
  }

  const url = parse(urlStr, true);
  url.query = { ...url.query, ...params };

  return url.toString();
}

function useImage(url, ref) {
  const [isLoaded, setIsLoaded] = useState(false);

  const thumbURL = useMemo(() => getThumbURL(url), [url]);
  const [fullURL, setFullURL] = useState(null);

  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setFullURL(getFullURL(url, [rect.width, rect.height]));
    }
  }, [ref]);

  useEffect(() => {
    // If we're using a ref, wait until the width is set
    if (!ref || !fullURL) {
      return () => {};
    }

    setIsLoaded(false);

    const img = new Image();
    img.onload = () => {
      setIsLoaded(true);
    };

    img.src = fullURL;

    if (img.complete) {
      img.onload();
    }

    return () => {
      img.onload = () => {};
    };
  }, [fullURL]);

  return [isLoaded && fullURL ? fullURL : thumbURL, isLoaded];
}

export default function CoverImage({
  url,
  children,
  style,
  size = 15,
  borderRadius = 0.75,
  shadow = true,
  fit = 'cover',
}) {
  const ref = useRef();
  const [imageURL, isLoaded] = useImage(url, ref);

  return (
    <CoverImageContainer
      ref={ref}
      key={url}
      style={style}
      borderRadius={borderRadius}
    >
      <AnimatePresence key={url}>
        {!isLoaded && (
          <CoverImageElement
            key="thumb"
            as={motion.div}
            exit={{ opacity: 0 }}
            imageURL={imageURL}
            blurry={true}
            shadow={shadow}
            fit={fit}
          />
        )}
        {isLoaded && (
          <CoverImageElement
            key="full"
            as={motion.div}
            enter={{ opacity: 1 }}
            imageURL={imageURL}
            blurry={false}
            shadow={shadow}
            fit={fit}
          />
        )}
      </AnimatePresence>

      {children && (
        <Sizer size={size}>
          <CoverImageContent borderRadius={0}>
            <Container>{children}</Container>
          </CoverImageContent>
        </Sizer>
      )}
    </CoverImageContainer>
  );
}

CoverImage.propTypes = {
  url: PropTypes.string,
  children: PropTypes.node,
  style: PropTypes.object,
  size: PropTypes.number,
  shadow: PropTypes.bool,
  borderRadius: PropTypes.number,
  fit: PropTypes.string,
};
