import React from 'react';
import styled from 'react-emotion';
import Container from '../Components/Container';

const Title = styled.h1``;
const Text = styled.p``;

const Page404 = props => (
  <Container isSinglePage={true}>
    <Title>Oops!</Title>
    <Text>What you are looking for cannot be found.</Text>
  </Container>
);

export default Page404;
