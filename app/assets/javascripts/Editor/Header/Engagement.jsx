import React from 'react';
import { Link, withRouter } from 'found';

import Flex from '../../Components/Flex';
import View from '../../Components/View';
import locale from '../../locale';

export const ArticleHeaderEngagement = (props) => {
  const { objects } = props;

  return (
    <Flex className="engagements">
      {objects.map(object => {
        const { count, text, url } = object;
        const otherProps = {};

        if (url) {
          otherProps.to = url;
        }

        const Component = url ? Link : View;

        return (
          <Component className="object" key={text} {...otherProps}>
            <View className="count">{count}</View>
            {locale(text, { count })}
          </Component>
        );
      })}
    </Flex>
  );
};

export default withRouter(ArticleHeaderEngagement);
