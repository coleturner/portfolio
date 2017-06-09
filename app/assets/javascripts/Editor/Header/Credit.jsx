import React from 'react';
import { Link, withRouter } from 'found';

import Flex from '../../Components/Flex';
import Icon from '../../Components/Icon';
import Picture from '../../Components/Picture';
import Timestamp from '../../Components/Timestamp';
import View from '../../Components/View';

export const ArticleHeaderCredit = (props) => {
  const { author, created } = props;
  const { byline, name, avatar, slug } = author;

  return (
    <Flex className="author">
      {avatar ? (
        <View className="avatar">
          <Picture src={avatar.thumb.url} />
        </View>
        ) : null}
      <View className="details">
        <Link to={`/profile/${slug}`} className="name">{name}</Link>
        <Icon id={Icon.LIST.TIMESTAMP} />
        <Timestamp dateTime={created} />
      </View>
    </Flex>
  );
};

export default withRouter(ArticleHeaderCredit);
