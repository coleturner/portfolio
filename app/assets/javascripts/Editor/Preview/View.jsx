import React from 'react';
import classNames from 'classnames';

import Content from './Content';
import Image from './Image';
import Footer from './Footer';
import Picture from '../../Components/View';
import View from '../../Components/View';

export default class ArticlePreview extends React.PureComponent {
  render() {
    const { article, footer } = this.props;
    const { slug, title, byline, summary, created, image } = article;

    return (
      <View className="article-preview">
        {image ? <Image url={slug} image={image} /> : null}
        <View className="article-preview-main">
          <Content
            slug={slug}
            title={title}
            summary={summary}
            created={created}
          />
          {footer ? <Footer article={article} /> : null}
        </View>
      </View>
    );
  }
}
