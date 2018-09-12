import React from 'react';
import ReactMarkdown from 'react-markdown';
import PropTypes from 'prop-types';

import Flex from '../Components/Flex';
import { H2, H3 } from '../Components/Heading';
import Icon from '../Components/Icon';
import Paragraph from '../Components/Paragraph';
import View from '../Components/View';

export default class FrontpageServices extends React.Component {
  static propTypes = {
    body: PropTypes.string,
    services: PropTypes.array.isRequired,
    title: PropTypes.string.isRequired
  };

  render() {
    const { title, body, services } = this.props;

    return (
      <View className="services">
        <View className="container">
          <H2>{title}</H2>

          {body && <ReactMarkdown className="markdown" source={body} />}

          {services &&
            services.length && (
              <Flex className="service-list">
                {services.map(({ icon, name, description }, index) => {
                  return (
                    <View className="service" key={index}>
                      {icon && <Icon symbol={icon} />}
                      <H3>{name}</H3>
                      <Paragraph>{description}</Paragraph>
                    </View>
                  );
                })}
              </Flex>
            )}
        </View>
      </View>
    );
  }
}
