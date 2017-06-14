import React from 'react';
import ReactMarkdown from 'react-markdown';

import { H2 } from '../Components/Heading';
import Hyperlink from '../Components/Hyperlink';
import View from '../Components/View';

export default class FrontpageCallToAction extends React.Component {
  componentWillMount() {
    this.maxHeight = screen.height || window.innerHeight;
  }

  render() {
    const { title, text, action, url } = this.props;

    return (
      <View className="call-to-action">
        <H2>{title}</H2>
        <View className="container">
          <ReactMarkdown
            className="markdown"
            source={text}
            renderers={{
              'Link': Hyperlink
            }} />

          <View className="actions">
            <Hyperlink className="button" href={url}>{action}</Hyperlink>
          </View>

        </View>
      </View>
    );
  }
}
