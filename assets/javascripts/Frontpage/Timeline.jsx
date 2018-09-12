import React from 'react';
import PropTypes from 'prop-types';

import { H2 } from '../Components/Heading';
import Icon from '../Components/Icon';
import Paragraph from '../Components/Paragraph';
import Timeline from '../Components/Timeline';
import View from '../Components/View';

export const getDomain = (url) => {
  try {
    const constructed = new URL(url);
    return constructed.hostname;
  } catch (e) {
    return url;
  }
};

export default class FrontpageTimeline extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    contents: PropTypes.array.isRequired
  }

  render() {
    const { title, description, contents } = this.props;

    return (
      <View className="experience">
        <H2>{title}</H2>
        <Paragraph>
          {description}
        </Paragraph>
        <View className="timespan-container">
          <Timeline events={contents.map(event => {
            return {
              ...event,
              image: event.timelineImage.file.url,
              moreLink: event.url && {
                url: event.url,
                text: [
                  <Icon key="icon" symbol={Icon.LIST.LINK} />,
                  <span key="txt">{getDomain(event.url)}</span>
                ]
              }
            };
          })} />
        </View>
      </View>
    );
  }
}
