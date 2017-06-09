import React from 'react';
import classNames from 'classnames';

export const Icon = (props) => {
  const { className, id, ...otherProps } = props;

  return (
      <svg className={classNames('icon', className)} {...otherProps}><use xlinkHref={id}></use></svg>
  );
};

Icon.propTypes = {
  className: React.PropTypes.any,
  id: React.PropTypes.string.isRequired
};

Icon.LIST = {
  BACK: require('../../icons/back-button.svg'),
  COMMENT: require('../../icons/comment.svg'),
  EDIT: require('../../icons/edit.svg'),
  EMAIL: require('../../icons/email.svg'),
  FACEBOOK: require('../../icons/facebook.svg'),
  HOME: require('../../icons/home.svg'),
  HEART: require('../../icons/heart.svg'),
  READ_MORE: require('../../icons/read_more.svg'),
  PINTEREST: require('../../icons/pinterest.svg'),
  REORDER: require('../../icons/reorder.svg'),
  STAR: require('../../icons/star.svg'),
  TIMESTAMP: require('../../icons/timestamp.svg'),
  TUMBLR: require('../../icons/tumblr.svg'),
  TWITTER: require('../../icons/twitter.svg'),
  UPVOTE: require('../../icons/upvote.svg'),
  UNLINK: require('../../icons/unlink.svg'),
  USER: require('../../icons/user.svg')
};

export default Icon;
