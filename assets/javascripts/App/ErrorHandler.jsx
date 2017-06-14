import React from 'react';

import { H1 } from '../Components/Heading';
import Paragraph from '../Components/Paragraph';
import View from '../Components/View';

export const ErrorHandler = (props) => {
  if (props.error) {
    console.warn('Encoutered error', props.error);
  }

  return (
    <View className="single-page container">
      <H1>Oops!</H1>
      <Paragraph>
        An unknown error has occurred. Please go back and try again.
      </Paragraph>
    </View>
  );
};

export default ErrorHandler;
