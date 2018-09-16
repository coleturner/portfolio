import React from 'react';
import styled from 'react-emotion';

import Container from '../Components/Container';

const Title = styled.h1``;
const Text = styled.p``;

export const ErrorHandler = props => {
  if (props.error) {
    console.warn('Encoutered error', props.error);
  }

  return (
    <Container isSinglePage={true}>
      <Title>Oops!</Title>
      <Text>An unknown error has occurred. Please go back and try again.</Text>
    </Container>
  );
};

export default ErrorHandler;
