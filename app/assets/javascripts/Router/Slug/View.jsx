import React from 'react';

import ArticleDetail from '../../ArticleDetail';
import TagDetail from '../../TagDetail';
import Error404 from '../../App/404';

export default class TagSlugScreen extends React.PureComponent {
  render() {
    const { sluggable } = this.props;

    if (sluggable && sluggable.__typename === 'Tag') {
      return <TagDetail tag={sluggable} />;
    } if (sluggable && sluggable.__typename === 'Article') {
      return <ArticleDetail article={sluggable} />;
    }

    return <Error404 />;
  }
}

TagSlugScreen.propTypes = {
  sluggable: React.PropTypes.object
};
