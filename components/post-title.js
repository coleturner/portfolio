import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';

const Title = styled.h1`
  font-size: 4em;
  font-size: clamp(1rem, 1rem + 2vw, 3em);
  line-height: 1.2;
  text-shadow: 0 3px 100px #000;
`;

export default function PostTitle({ children }) {
  return <Title>{children}</Title>;
}

PostTitle.propTypes = {
  children: PropTypes.node,
};
