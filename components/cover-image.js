import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import Container from './container';
import hexToRgba from 'hex-to-rgba';
import { useEffect, useState, useMemo } from 'react';
import parse from 'url-parse';
import { AnimatePresence, motion } from 'framer-motion';
import { css } from '@emotion/react';

const CoverImageContainer = styled.div(
  ({ color, borderRadius }) => css`
    border-radius: ${borderRadius}em;
    width: 100%;
    height: 100%;
    ${color &&
    css`
      border-bottom: 6px solid ${color};
    `};
    position: relative;
    overflow: hidden;
  `
);

const CoverImageElement = styled.div(({ imageURL, blurry, color }) => {
  const backgroundColor = color && hexToRgba(color, 0.3);
  return css`
    background-color: ${backgroundColor};
    background-image: url(${imageURL});
    background-position: center center;
    background-position: var(--cover-image-background-position, center center);
    background-size: cover;
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
      background-color: ${backgroundColor};
      background-image: linear-gradient(
        to bottom,
        rgba(0, 0, 0, 0) 0%,
        rgba(0, 0, 0, 0.85) 100%
      );
      boxshadow: inset 0 0 100px #000;
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      content: '';
    }
  `;
});

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

const CONTENTFUL_HOST = 'ctfassets.net';

function getThumbURL(urlStr) {
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

function getFullURL(urlStr) {
  const params = {};

  if (urlStr.includes(CONTENTFUL_HOST)) {
    params.fm = 'jpg';
  }

  const url = parse(urlStr, true);
  url.query = { ...url.query, ...params };

  return url.toString();
}

function useImage(url) {
  const [isLoaded, setIsLoaded] = useState(false);

  const thumbURL = useMemo(() => getThumbURL(url), [url]);
  const fullURL = useMemo(() => getFullURL(url), [url]);

  useEffect(() => {
    setIsLoaded(false);

    const img = new Image();
    img.onload = () => {
      setIsLoaded(true);
    };

    img.src = fullURL;

    if (img.complete) {
      img.onload();
    }
  }, [fullURL]);

  return [isLoaded && fullURL ? fullURL : thumbURL, isLoaded];
}

export default function CoverImage({
  url,
  children,
  style,
  size = 15,
  borderRadius = 0.75,
  color,
}) {
  const [imageURL, isLoaded] = useImage(url);

  return (
    <CoverImageContainer
      key={url}
      style={style}
      borderRadius={borderRadius}
      color={color}
    >
      <AnimatePresence key={url}>
        {!isLoaded && (
          <CoverImageElement
            key="thumb"
            as={motion.div}
            exit={{ opacity: 0 }}
            imageURL={imageURL}
            blurry={true}
            color={color}
          />
        )}
        {isLoaded && (
          <CoverImageElement
            key="full"
            as={motion.div}
            enter={{ opacity: 1 }}
            imageURL={imageURL}
            blurry={false}
            color={color}
          />
        )}
      </AnimatePresence>

      <Sizer size={size}>
        {children && (
          <CoverImageContent borderRadius={0}>
            <Container>{children}</Container>
          </CoverImageContent>
        )}
      </Sizer>
    </CoverImageContainer>
  );
}

CoverImage.propTypes = {
  url: PropTypes.string,
  children: PropTypes.node,
  style: PropTypes.object,
  size: PropTypes.number,
  borderRadius: PropTypes.number,
  color: PropTypes.string,
};
