import React from 'react';
import classNames from 'classnames';
import { Link as RouterLink, withRouter } from 'found';

import Picture from '../../Components/Picture';
import View from '../../Components/View';

export const ContentImage = (props) => {
  const { alt, feed, preview } = props;

  // TODO: responsive
  const image = feed;

  return (
    <View className="image-container"><Picture src={image.url} alt={alt} /></View>
  );
};

export default withRouter(ContentImage);
