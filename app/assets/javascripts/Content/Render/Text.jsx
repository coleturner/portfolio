import React from 'react';
import ReactMarkdown from 'react-markdown';
import Heading from './Heading';
import Link from './Link';

import { H2 } from '../../Components/Heading';
import View from '../../Components/View';

export default class ContentText extends React.PureComponent {
  static childContextTypes = {
    contentProps: React.PropTypes.object
  }

  getChildContext() {
    return {
      contentProps: this.props
    };
  }

  render() {
    const { title, contents } = this.props;

    return (
      <View className="text-entry">
        {title ? <H2>{title}</H2> : null}
        <ReactMarkdown
          className="markdown"
          renderers={{
            'Heading': Heading,
            'Link': Link
          }}
          source={contents} />
      </View>
    );
  }
}
