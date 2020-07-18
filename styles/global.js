import React from 'react';
import { Global, css, keyframes } from '@emotion/react';
import { UI_COLORS, SHADE, changeColorBrightness } from './colors';

const LOADING_BACKGROUND = keyframes`
  0% {
    background-position: 200%;
  }

  100% {
    background-position: 0%;
  }
`;

const LOADING_GROW = keyframes`
  0% {
    width: 0%;
  }

  100% {
    width: 100%;
  }
`;

export const globalStyles = (
  <>
    <Global
      styles={css`
        * {
          box-sizing: border-box;
        }

        :root {
          --page-background-color: #fff;
          --page-background-color-plus-15: ${changeColorBrightness(
            '#ffffff',
            15
          )};
          --page-background-color-minus-5: ${changeColorBrightness(
            '#ffffff',
            -5
          )};
          --page-text-color: #000;

          --theme-color-1: #00dbde;
          --theme-color-2: green;
          --theme-color-3: #00dbde;

          --link-color-stop-1: #f64f59;
          --link-color-stop-2: orange;
          --link-color-stop-3: #f64f59;
        }

        @media (prefers-color-scheme: dark) {
          :root {
            --page-background-color: #111d2b;
            --page-background-color-plus-15: ${changeColorBrightness(
              '#111d2b',
              15
            )};
            --page-background-color-minus-5: ${changeColorBrightness(
              '#111d2b',
              -5
            )};
            --page-text-color: #fff;
          }
        }

        html,
        body {
          background: #fff;
          background: var(--page-background-color, #fff);
          color: #fff;
          color: var(--page-text-color, #fff);
          font-family: 'Roboto', Helvetica, Arial, sans-serif;
          font-size: 16px;
          line-height: 1.4;
          overscroll-behavior-y: none;
        }

        body,
        #__next,
        main {
          min-height: 100%;
          height: 100%;
        }

        svg {
          height: 1em;
          max-width: 1em;
          display: inline-flex;
          align-self: center;
          vertical-align: middle;
          fill: currentColor;
        }

        a {
          color: ${UI_COLORS.Link};

          &:hover {
            color: ${UI_COLORS.LinkHover};
          }
        }

        #page-loading-indicator {
          height: 5px;
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          width: 100%;
          display: none;
          z-index: 1000;
          background: #777;
          animation: ${LOADING_GROW} 150ms 1;

          div {
            background: repeating-linear-gradient(
              to right,
              #00dbde 0%,
              green 25%,
              #00dbde 50%,
              green 75%,
              #00dbde 100%
            );
            background: repeating-linear-gradient(
              to right,
              var(--theme-color-1) 0%,
              var(--theme-color-2) 25%,
              var(--theme-color-3) 50%,
              var(--theme-color-2) 75%,
              var(--theme-color-1) 100%
            );
            background-size: 200%;
            height: 100%;
            padding: 0;
            animation: ${LOADING_BACKGROUND} 3s infinite;
          }
        }
      `}
    />
  </>
);

export function panelBoxShadow(size = 30, color = SHADE[size / 200]) {
  return [
    `0 3px ${size}px ${color}`,
    `0 ${Math.round(size / 2)}px ${size}px ${color}`,
  ].join(',');
}
