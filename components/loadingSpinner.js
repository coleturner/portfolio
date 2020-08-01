import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { keyframes, css } from '@emotion/react';
import { UI_COLORS } from 'styles/colors';

const RIPPLE = keyframes`
0% {
  width: 0;
  height: 0;
  opacity: 1;
}
  100% {
    width: 0.75em;
    height: 0.75em;
    opacity: 0;
  }
`;

const Spinner = styled.div(
  ({ size, color, speed }) => css`
    display: inline-block;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 1em;
    height: 1em;
    font-size: ${size}em;
    div {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      border: 4px solid ${color};
      opacity: 1;
      border-radius: 50%;
      animation: ${RIPPLE} ${speed} cubic-bezier(0, 0.2, 0.8, 1) infinite;

      &:nth-child(2) {
        animation-delay: -0.5s;
      }
    }
  `
);

export default function LoadingSpinner({ size, color, speed }) {
  return (
    <Spinner size={size} color={color} speed={speed}>
      <div />
      <div />
    </Spinner>
  );
}

LoadingSpinner.propTypes = {
  size: PropTypes.number,
  color: PropTypes.string,
  speed: PropTypes.string,
};

LoadingSpinner.defaultProps = {
  size: 10,
  color: UI_COLORS.Spinner,
  speed: '1s',
};
