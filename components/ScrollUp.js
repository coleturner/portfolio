import React from 'react';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { useReducedMotion } from 'framer-motion';
import { css } from '@emotion/react';
import styled from '@emotion/styled';

const ScrollUpContainer = styled.div(
  ({ color }) => css`
    position: fixed;
    bottom: 1em;
    right: 1em;
    font-size: 2em;
    cursor: pointer;
    z-index: 100;

    svg {
      fill: ${color};
    }

    &:hover svg {
      transform: scale(1.25);
    }
  `
);

export function ScrollUp({ color, ...props }) {
  const shouldReduceMotion = useReducedMotion();
  const [shouldAppear, setShouldAppear] = useState(false);

  const scrollListener = () => {
    if (window.scrollY > window.innerHeight / 2) {
      setShouldAppear(true);
    } else {
      setShouldAppear(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', scrollListener);

    return () => {
      window.removeEventListener('scroll', scrollListener);
    };
  }, []);

  const scroll = () => {
    window.scroll({
      top: 0,
      left: 0,
      behavior: shouldReduceMotion ? 'auto' : 'smooth',
    });
  };

  if (!shouldAppear) {
    return null;
  }

  return (
    <ScrollUpContainer color={color} onClick={scroll}>
      <svg viewBox="0 0 512 512" {...props}>
        <path d="M256 0C114.833 0 0 114.833 0 256s114.833 256 256 256 256-114.853 256-256S397.167 0 256 0zm0 472.341c-119.275 0-216.341-97.046-216.341-216.341S136.725 39.659 256 39.659c119.295 0 216.341 97.046 216.341 216.341S375.275 472.341 256 472.341z" />
        <path d="M369.227 283.365l-99.148-99.148c-7.734-7.694-20.226-7.694-27.96 0l-99.148 99.148c-6.365 7.416-6.365 18.382 0 25.798 7.119 8.309 19.651 9.28 27.96 2.161L256 226.256l85.267 85.069c7.734 7.694 20.226 7.694 27.96 0 7.694-7.734 7.694-20.227 0-27.96z" />
      </svg>
    </ScrollUpContainer>
  );
}

ScrollUp.propTypes = {
  color: PropTypes.string,
};
