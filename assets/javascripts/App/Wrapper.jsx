import React from 'react';

import Header from './Header';
import Footer from './Footer';
import Main from './Main';
import View from '../Components/View';

export const AppWrapper = ({ children }) => (
  <View className="application-wrapper">
    <Header />
    <Main>
      {children}
    </Main>
    <Footer />
  </View>
);

export default AppWrapper;
