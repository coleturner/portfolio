import React from 'react';

import { H1 } from '../Components/Heading';
import Paragraph from '../Components/Paragraph';
import View from '../Components/View';

const Page404 = (props) => (
<View className="single-page container">
  <H1>Oops!</H1>
  <Paragraph>
    What you are looking for cannot be found.
  </Paragraph>
</View>
);

export default Page404;
