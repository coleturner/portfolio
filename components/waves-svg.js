import React from 'react';
import styled from '@emotion/styled';
import { useRef } from 'react';
import { keyframes } from '@emotion/react';
import { useInViewport } from 'react-in-viewport';
const WAVE_ROCK = keyframes`
  0%, 100% {
    transform: translateX(0%) translateY(0%) scaleY(0.2);
  }

  25% {
    transform: translateX(10%) translateY(-0.25em) scaleY(0.3); 
  }

  75% {
    transform: translateX(-10%) translateY(0%) scaleY(0.3);
  }

`;
const WavesContainer = styled.div`
  position: absolute;
  width: 100%;
  overflow: hidden;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  user-select: none;
  pointer-events: none;

  .wave {
    position: absolute;
    left: -20%;
    right: -20%;
    bottom: 2em;
    width: 140%;

    svg {
      width: 100%;
      max-width: none;
      display: block;
      height: auto;
      transform-origin: bottom center;
      transform: translateX(0%) translateY(0%) scaleY(0.2);
      animation: ${WAVE_ROCK} 10s infinite linear;
      animation-fill-mode: backwards;

      @media (prefers-reduced-motion: reduce) {
        animation: 30s;
      }
    }

    &:nth-child(2) svg {
      animation-delay: -2.5s;
    }

    &:nth-child(3) svg {
      animation-delay: -5s;
    }

    @media (prefers-color-scheme: dark) {
      &:nth-child(1) svg path {
        fill: #02144d;
      }

      &:nth-child(2) svg path {
        fill: #01081f;
      }

      &:nth-child(3) svg path {
        fill: #030f36;
      }
    }
  }
`;
export function Waves(props) {
  const ref = useRef();
  const { inViewport } = useInViewport(ref, undefined, undefined, props);

  const animationPlayState = inViewport ? 'running' : 'paused';

  return (
    <WavesContainer ref={ref}>
      <div className="wave">
        <svg viewBox="0 0 1440 285" style={{ animationPlayState }}>
          <path
            fill="#a2d9ff"
            d="M0 29l48 10.7C96 50 192 72 288 98.3c96 26.7 192 58.7 288 37.4C672 114 768 40 864 13s192-5 288 16 192 43 240 53.3l48 10.7v192H0V29z"
          />
        </svg>
      </div>

      <div className="wave">
        <svg viewBox="0 0 1440 272" style={{ animationPlayState }}>
          <path
            fill="#66bfff"
            d="M0 160l48 5.3c48 5.7 144 15.7 240-16C384 117 480 43 576 53.3 672 64 768 160 864 170.7 960 181 1056 107 1152 64s192-53 240-58.7l48-5.3v288H0V160z"
          />
        </svg>
      </div>

      <div className="wave">
        <svg viewBox="0 0 1440 132" style={{ animationPlayState }}>
          <path
            fill="#09F"
            d="M0 32l48 5.3C96 43 192 53 288 42.7 384 32 480 0 576 0s192 32 288 53.3c96 21.7 192 31.7 288 32 96-.3 192-10.3 240-16l48-5.3v128H0V32z"
          />
        </svg>
      </div>
    </WavesContainer>
  );
}
