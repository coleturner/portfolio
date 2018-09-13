import React from 'react';
import PropTypes from 'prop-types';
import styled from 'react-emotion';

import Header from './Header';
import Footer from './Footer';
import Main from './Main';

const Wrapper = styled.div`
  flex: 1;
  width: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: flex-start;
  align-content: stretch;
  align-items: center;
  flex-direction: column;

  > * {
    width: 100%;
  }
`;

export const AppWrapper = ({ animateLogo, children }) => (
  <Wrapper>
    <Header animateLogo={animateLogo} />
    <Main>
      {children}
    </Main>
    <Footer />
  </Wrapper>
);

AppWrapper.propTypes = {
  animateLogo: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired
};

AppWrapper.defaultProps = {
  animateLogo: true
};

export default AppWrapper;
