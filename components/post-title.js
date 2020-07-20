import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';

const Title = styled.h1`
  font-size: 4em;
  font-size: clamp(1rem, 1rem + 3vw, 4em);
  line-height: 1.2;
  text-shadow: 0 3px 100px #000;
`;

export default function PostTitle({ color, children }) {
  return <Title color={color}>{children}</Title>;
}

PostTitle.propTypes = {
  color: PropTypes.string,
  children: PropTypes.node,
};
