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
          <View className="availability">
            <Icon id={Icon.LIST.CHECKMARK} />
            Available For Hire
          </View>
        </View>
        <H4>Here is where you reach me</H4>
        <nav>
          <Hyperlink href="https://medium.com/@colecodes">
            <Icon id={Icon.LIST.MEDIUM} /> Blog
          </Hyperlink>
          <Hyperlink href="mailto:turner.cole@gmail.com">
            <Icon id={Icon.LIST.MAIL} /> Email
          </Hyperlink>
          <Hyperlink href="http://twitter.com/colepatrickturner">
            <Icon id={Icon.LIST.TWITTER} /> Twitter
          </Hyperlink>
          <Hyperlink href="http://www.linkedin.com/in/colept">
            <Icon id={Icon.LIST.LINKED_IN} /> LinkedIn
          </Hyperlink>
          <Hyperlink href="https://github.com/colepatrickturner">
            <Icon id={Icon.LIST.GITHUB} /> Github
          </Hyperlink>
        </nav>
      </View>
		</footer>
  );
};

export default Footer;
