import React from 'react';
import PropTypes from 'prop-types';

import Flex from '../Components/Flex';
import { H2, H3 } from '../Components/Heading';
import Icon from '../Components/Icon';
import Paragraph from '../Components/Paragraph';
import View from '../Components/View';

export default class FrontpageServices extends React.Component {
  static propTypes = {
    services: PropTypes.array.isRequired,
    title: PropTypes.string.isRequired
  }

  render() {
    const { title, services } = this.props;

    return (
      <View className="services">
        <View className="container">
          <H2>{title}</H2>
          <Flex className="service-list">
            {services.map(({ icon, name, description }, index) => {
              return (
                <View className="service" key={index}>
                  {icon && <Icon id={icon} />}
                  <H3>{name}</H3>
                  <Paragraph>
                    {description}
                  </Paragraph>
                </View>
              );
            })}
          </Flex>

        </View>
      </View>
    );
  }
}
