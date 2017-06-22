import React from 'react';
import PropTypes from 'prop-types';

import Header from './Header';
import Footer from './Footer';
import Main from './Main';
import View from '../Components/View';

export const AppWrapper = ({ animateLogo, children }) => (
  <View className="application-wrapper">
    <Header animateLogo={animateLogo} />
    <Main>
      {children}
    </Main>
    <Footer />
  </View>
);

AppWrapper.propTypes = {
  animateLogo: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired
};

AppWrapper.defaultProps = {
  animateLogo: true
};

export default AppWrapper;
