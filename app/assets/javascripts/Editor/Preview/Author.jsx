import React from 'react';
import { Link, withRouter } from 'found';
import classNames from 'classnames';

import Flex from '../../Components/Flex';

import Picture from '../../Components/Picture';
import Text from '../../Components/Text';
import View from '../../Components/View';

export const ArticlePreviewAuthor = (props) => {
  const { author } = props;
  const { byline, name, avatar, slug } = author;

  return (
    <Flex className="author">
      {avatar ? (
        <View className="avatar">
          <Picture src={avatar.url} />
        </View>
        ) : null}
      <View className="details">
        <Link to={`/profile/${slug}`} className="name">{name}</Link>
        {byline ? <Text className="byline">{byline}</Text> : null}
      </View>
    </Flex>
  );
};

export default withRouter(ArticlePreviewAuthor);
