import React from 'react';
import { H2, H3, H4, H5, H6 } from '../../Components/Heading';

export const ContentHeading = (props, context) => {
  const { level, children } = props;

  const exactLevel = (context.contentProps && context.contentProps.title) ? level + 1 : level;
  const Component = `H${Math.min(6, exactLevel + 1)}`;

  return (
    <Component>{children}</Component>
  );
};

ContentHeading.contextTypes = {
  contentProps: React.PropTypes.object
};

export default ContentHeading;
