import React from 'react';
import ReactMarkdown from 'react-markdown';

import { H2 } from '../Components/Heading';
import Hyperlink from '../Components/Hyperlink';
import View from '../Components/View';
import Container from '../Components/Container';

export default class FrontpageCallToAction extends React.Component {
  componentDidMount() {
    this.maxHeight = screen.height || window.innerHeight;
  }

  render() {
    const { title, text, action, url } = this.props;

    return (
      <View className="call-to-action">
        <H2>{title}</H2>
        <Container>
          <ReactMarkdown
            className="markdown"
            source={text}
            renderers={{
              link: Hyperlink
            }} />

          <View className="actions">
            <Hyperlink className="button" href={url}>{action}</Hyperlink>
          </View>

        </Container>
      </View>
    );
  }
}
