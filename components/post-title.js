import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';

const Title = styled.h1`
  font-size: 4em;
  line-height: 1.2;
  background-color: #fff;
  background-size: 100%;
  background-mage: linear-gradient(to bottom, #fff 0%, #bbb 100%);
  background-image: repeating-linear-gradient(#fff, #aaa 1.2em);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

export default function PostTitle({ color, children }) {
  return <Title color={color}>{children}</Title>;
}

PostTitle.propTypes = {
  color: PropTypes.string,
  children: PropTypes.node,
};
