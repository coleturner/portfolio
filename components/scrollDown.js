import React from 'react';
import { useCallback } from 'react';
import {
  motion,
  useViewportScroll,
  useTransform,
  useReducedMotion,
} from 'framer-motion';
import styled from '@emotion/styled';
import { UI_COLORS } from 'styles/colors';
import { keyframes } from '@emotion/react';

const BOUNCE_DOWN = keyframes`
   0%, 100% {
     opacity: 0.5;
      transform: translateY(0);
   }

   50% {
      opacity: 1;
      transform: translateY(10%);
   }
}`;

const ScrollDownContainer = styled.div`
  font-size: 1rem;
  color: ${UI_COLORS.ScrollDown};
  cursor: pointer;
  position: relative;
  width: 100%;

  a {
    display: none;
    position: absolute;
    bottom: 100%;
    left: 50%;
    transform: translateX(-50%);
    text-decoration: none;

    &:hover {
      font-weight: bold;
    }
  }

  &:hover a {
    display: block;
  }

  .page-down {
    background: transparent;
    border: 0;
    padding: 0;
    margin: 0;
    color: inherit;
    font-size: 3em;
    animation: ${BOUNCE_DOWN} 1s infinite;
    cursor: pointer;

    @media (prefers-reduced-motion: reduce) {
      animation: none;

      &::before {
        display: block;
        content: 'Scroll Down';
        font-size: 1rem;
      }
    }
  }
`;

export function ScrollDown(props) {
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useViewportScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);

  const scrollPastThis = useCallback((e) => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    const rect = e.currentTarget.getBoundingClientRect();
    const top = Math.round(scrollTop + rect.top + rect.height);

    window.scroll({
      top,
      left: 0,
      behavior: shouldReduceMotion ? 'auto' : 'smooth',
    });
  }, []);

  return (
    <ScrollDownContainer>
      <motion.div
        style={{
          opacity,
        }}
      >
        <button
          className="page-down"
          title="Jump to main content"
          onClick={scrollPastThis}
          onKeyDown={scrollPastThis}
        >
          <svg viewBox="0 0 1792 1792" {...props}>
            <path d="M1408 704q0 26-19 45l-448 448q-19 19-45 19t-45-19L403 749q-19-19-19-45t19-45 45-19h896q26 0 45 19t19 45z" />
          </svg>
        </button>
      </motion.div>
    </ScrollDownContainer>
  );
}
