import React from 'react';
import styled from 'react-emotion';

import Container from '../Components/Container';

const Title = styled.h1``;
const Text = styled.p``;

const Page404 = props => (
  <Container>
    <Title>Page Not Found</Title>
    <Text>You have reached a page that does not exist.</Text>
  </Container>
);

export default Page404;
