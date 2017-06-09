import React from 'react';
import classNames from 'classnames';
import { Link, withRouter } from 'found';

import View from '../../Components/View';

export const ArticleHeaderCategories = (props) => {
  const { tags } = props;

  return (
    <View className="categories">
      {tags.map(tag => {
        const { slug, displayName } = tag;
        return (
          <Link key={slug} className={classNames('category', `category-${slug}`)} to={`/${slug}`}>{displayName}</Link>
        );
      })}
    </View>
  );
};

export default withRouter(ArticleHeaderCategories);
