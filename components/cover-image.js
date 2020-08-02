import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import Container from 'components/container';
import { useEffect, useState, useMemo } from 'react';
import parse from 'url-parse';
import { css } from '@emotion/react';
import { CONTENTFUL_HOST } from 'lib/constants';
import Head from 'next/head';

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

const CoverImageContent = styled.div`
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

const imageStyle = css`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

const Thumbnail = styled.img(
  ({ fit = 'cover' }) => css`
    ${imageStyle};
    object-fit: ${fit};
    object-position: center center;
    filter: blur(20px);
    z-index: 1;
  `
);

const Picture = styled.picture(
  ({ fit = 'cover' }) => css`
    &,
    & img {
      ${imageStyle};
      object-fit: ${fit};
      object-position: center center;
      z-index: 2;
    }
  `
);

const ColorShade = styled.div(
  ({ shadow }) => css`
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: var(
      --cover-image-gradient-overlay-color,
      var(--cover-image-color-0_3)
    );
    z-index: 3;

    &::after {
      ${shadow &&
      css`
        background-image: linear-gradient(
          to bottom,
          rgba(0, 0, 0, 0) 0%,
          rgba(0, 0, 0, 0.85) 100%
        );
      `};
      box-shadow: inset 0 0 100px #000;
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      content: '';
      z-index: 4;
    }
  `
);

function getFormattedImageURL(urlStr, params) {
  const url = parse(urlStr, true);
  url.query = { ...url.query, ...params };

  return url.toString();
}

function getDefaultImage(urlStr) {
  if (!urlStr || !urlStr.includes(CONTENTFUL_HOST)) {
    return urlStr;
  }

  const params = {
    fm: 'jpg',
    w: 500,
  };

  return getFormattedImageURL(urlStr, params);
}

function getSourceSet(urlStr, imageSizes, params) {
  return imageSizes
    .map((size) => {
      const url = getFormattedImageURL(urlStr, { w: size, ...params });
      return `${url} ${size}w`;
    })
    .join(', ');
}

function getSizes(_imageSizes) {
  const imageSizes = [..._imageSizes];
  const lastSize = imageSizes.pop();

  return (
    imageSizes
      .map((size) => {
        return `(max-width: ${size}px) ${size}px`;
      })
      .join(', ') +
    ', ' +
    lastSize +
    'px'
  );
}

export default function CoverImage({
  url,
  children,
  style,
  borderRadius = 0.75,
  shadow = true,
  fit = 'cover',
  imageSizes = [321, 411, 571, 700, 831, 939, 1170, 1200],
}) {
  const ref = useRef();
  const thumbURL = useMemo(() => getThumbURL(url), [url]);

  const preconnectURL = parse(url);
  Object.assign(preconnectURL, { query: '', pathname: '' });

  return (
    <CoverImageContainer
      ref={ref}
      key={url}
      style={style}
      borderRadius={borderRadius}
    >
      <Head>
        <link
          rel="preconnect"
          href={preconnectURL.toString()}
          key={'preconnect-' + preconnectURL.toString()}
        />
      </Head>
      <Thumbnail loading="eager" src={thumbURL} alt="" fit={fit} />
      <Picture fit={fit}>
        <source
          type="image/webp"
          srcSet={getSourceSet(url, imageSizes, { fm: 'webp' })}
          sizes={getSizes(imageSizes)}
        />
        <source
          type="image/jpeg"
          srcSet={getSourceSet(url, imageSizes, { fm: 'jpg' })}
          sizes={getSizes(imageSizes)}
        />
        <img loading="lazy" src={getDefaultImage(url)} alt="" />
      </Picture>

      <ColorShade shadow={shadow} />

      {children && (
        <CoverImageContent borderRadius={0}>
          <Container>{children}</Container>
        </CoverImageContent>
      )}
    </CoverImageContainer>
  );
}

CoverImage.propTypes = {
  url: PropTypes.string,
  children: PropTypes.node,
  style: PropTypes.object,
  shadow: PropTypes.bool,
  borderRadius: PropTypes.number,
  fit: PropTypes.string,
  imageSizes: PropTypes.arrayOf(PropTypes.number),
};
