import React from 'react';
import classNames from 'classnames';

import Author from './Author';
import Button from '../../Components/Button';
import Flex from '../../Components/Flex';
import Hyperlink from '../../Components/Hyperlink';
import Icon from '../../Components/Icon';
import Share from '../../Components/Share';
import View from '../../Components/View';

export default class ArticlePreviewFooter extends React.PureComponent {
  render() {
    const { article } = this.props;
    const meta = article.meta || {};

    return (
      <Flex className="article-preview-footer">
        <Author author={article.author} />

        <Flex className="actions">
          <Share
            facebookID={meta.facebookShareID}
            twitterID={meta.twitterShareID}
            count={article.totalShares}
            schema={{
              '@type': 'NewsArticle',
              'mainEntityOfPage': {
                '@type': 'WebPage',
                '@id': article.url
              },
              'headline': article.title,
              'image': {
                '@type': 'ImageObject',
                'url': article.thumbnail,
              //  'height': article.thumbnail_height,
              //  'width': article.thumbnail_width
              },
              'datePublished': article.timestamp,
              'author': {
                '@type': 'Person',
                'name': article.author.name,
                'image':  article.author.image
              }
            }}/>
          {'comments' in article ? (
            <Hyperlink
              href={'#'} className="action comments">
                <Icon id={Icon.LIST.COMMENT} />
                {article.comments}
            </Hyperlink>
            ) : null}
          {'likes' in article ? (
            <Button className="action favorites">
              <Icon id={Icon.LIST.HEART} />
              {article.favorites}
            </Button>
            ) : null
          }
        </Flex>
      </Flex>
    );
  }
}
