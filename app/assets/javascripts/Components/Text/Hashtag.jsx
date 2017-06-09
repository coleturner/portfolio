import React from 'react';
import { Link, withRouter } from 'found';
import classNames from 'classnames';

export const Hashtag = props => {
  const { children, className, ...otherProps } = props;
  const tag = children.replace('#', '');
  return (
      <Link className={classNames('mention', className)} to={'/tags/' + tag} {...otherProps}>#{tag}</Link>
  );
};

Hashtag.propTypes = {
  children: React.PropTypes.string.isRequired,
  className: React.PropTypes.any
};


export default withRouter(Hashtag);
