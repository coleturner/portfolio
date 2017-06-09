import React from 'react';

import classNames from 'classnames';

export const Article = (props) => {
  const { children, className, ...otherProps } = props;
  return (
    <article className={classNames(className)} {...otherProps}>
      {children}
    </article>
  );
};

Article.propTypes = {
  children: React.PropTypes.node,
  className: React.PropTypes.any
};

export default Article;
