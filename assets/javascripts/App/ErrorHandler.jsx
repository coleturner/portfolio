import React from 'react';

import { H1 } from '../Components/Heading';
import Paragraph from '../Components/Paragraph';
import Container from '../Components/Container';

export const ErrorHandler = (props) => {
  if (props.error) {
    console.warn('Encoutered error', props.error);
  }

  return (
    <Container isSinglePage={true}>
      <H1>Oops!</H1>
      <Paragraph>
        An unknown error has occurred. Please go back and try again.
      </Paragraph>
    </Container>
  );
};

export default ErrorHandler;
