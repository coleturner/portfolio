import Link from 'next/link';
import styled from '@emotion/styled';
import { percent, em } from '../styles/units';
import Container from './container';
import { UI_COLORS } from '../styles/colors';
import hexToRgba from 'hex-to-rgba';
import { generateIndexHash } from '../lib/hash';
import { set } from 'lodash';
import { useEffect, useState, useMemo } from 'react';
import parse from 'url-parse';
import { AnimatePresence, motion } from 'framer-motion';

const CoverImageContainer = styled.div(({ color, borderRadius }) => ({
  borderRadius,
  width: percent(100),
  height: percent(100),
  borderBottom: color && '6px solid ' + color,
  position: 'relative',
  overflow: 'hidden',
}));

const CoverImageElement = styled.div(
  ({ imageURL, borderRadius, blurry, color }) => {
    const backgroundColor = color && hexToRgba(color, 0.3);
    return {
      backgroundColor,
      backgroundImage: `url(${imageURL})`,
      backgroundPosition: [
        'center center',
        'var(--cover-image-background-position, center center)',
      ],
      backgroundSize: 'cover',
      borderRadius: 'inherit',
      width: percent(100),
      height: percent(100),
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      filter: blurry && 'blur(10px)',
      zIndex: blurry ? 2 : 1,

      '&::after': {
        backgroundColor,
        backgroundImage:
          'linear-gradient(to bottom, rgba(0,0,0,0) 0%,rgba(0,0,0,0.85) 100%)',
        boxShadow: 'inset 0 0 100px #000',
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        content: '""',
      },
    };
  }
);

const Sizer = styled.div(({ size }) => {
  return {
    paddingTop: percent(size),
    paddingBottom: percent(3),
    position: 'relative',
  };
});

const CoverImageContent = styled.div(({ borderRadius }) => {
  return {
    minHeight: '10em',
    color: '#fff',
    zIndex: 3,
    position: 'relative',
  };
});

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

function useImage(url, { updateThumb = false } = {}) {
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
  borderRadius = em(0.75),
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
