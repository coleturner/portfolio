import React from 'react';
import styled from '@emotion/styled';

const Title = styled.h1(({ color = '#333' }) => ({
  fontSize: '4em',
  lineHeight: 1.2,
  backgroundColor: '#fff',
  backgroundSize: '100%',
  backgroundImage: 'linear-gradient(to bottom, #fff 0%, #bbb 100%)',
  backgroundImage: 'repeating-linear-gradient(#fff, #aaa 1.2em)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
}));

export default function PostTitle({ color, children }) {
  return <Title color={color}>{children}</Title>;
}
