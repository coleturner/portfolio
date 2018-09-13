import React from 'react';

import { H1 } from '../Components/Heading';
import Paragraph from '../Components/Paragraph';
import Container from '../Components/Container';

const Page404 = (props) => (
<Container isSinglePage={true}>
  <H1>Oops!</H1>
  <Paragraph>
    What you are looking for cannot be found.
  </Paragraph>
</Container>
);

export default Page404;
