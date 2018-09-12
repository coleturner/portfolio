import React from 'react';

import { H4 } from '../Components/Heading';
import Hyperlink from '../Components/Hyperlink';
import Icon from '../Components/Icon';
import Picture from '../Components/Picture';
import View from '../Components/View';

import PORTRAIT_IMAGE from '../../images/portrait.jpg';

export const Footer = () => {
  return (
    <footer>
			<View className="container">
        <View className="portrait">
          <Picture src={PORTRAIT_IMAGE} />
        </View>
        <H4>Connect with me via</H4>
        <nav>
          <Hyperlink href="https://medium.com/@colecodes">
            <Icon symbol={Icon.LIST.MEDIUM} /> Blog
          </Hyperlink>
          <Hyperlink href="mailto:turner.cole@gmail.com">
            <Icon symbol={Icon.LIST.MAIL} /> Email
          </Hyperlink>
          <Hyperlink href="http://twitter.com/colepatrickturner">
            <Icon symbol={Icon.LIST.TWITTER} /> Twitter
          </Hyperlink>
          <Hyperlink href="http://www.linkedin.com/in/colept">
            <Icon symbol={Icon.LIST.LINKED_IN} /> LinkedIn
          </Hyperlink>
          <Hyperlink href="https://github.com/coleturner">
            <Icon symbol={Icon.LIST.GITHUB} /> Github
          </Hyperlink>
        </nav>
      </View>
		</footer>
  );
};

export default Footer;
