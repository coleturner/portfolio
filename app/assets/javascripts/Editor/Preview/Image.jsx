import React from 'react';
import { Link, withRouter } from 'found';

import Picture from '../../Components/Picture';
import View from '../../Components/View';

export class ArticlePreviewImage extends React.PureComponent {
  render() {
    const { image, url } = this.props;

    if (!image.feed) { return null; }

    const picture = (
      <View className="image-container">
        <Picture src={image.feed.url} alt={image.alt} />
      </View>
    );

    if (url) {
      return (
        <Link className="image-container" to={url}>{picture}</Link>
      );
    }

    return (
      <View className="image-container">
        <Picture src={image.feed.url} alt={image.alt} />
      </View>
    );
  }
}


export default withRouter(ArticlePreviewImage);
