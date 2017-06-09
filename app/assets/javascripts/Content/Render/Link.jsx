import React from 'react';
import classNames from 'classnames';
import { Link as RouterLink, withRouter } from 'found';

export const ContentLink = (props) => {
  const { className, href, title, children, target = '_blank' } = props;

  try {
    const url = new URL(href);
    if (url.hostname === window.location.hostname) {
      return (
        <RouterLink className={classNames(className)} {...{ to: url.pathname, title, target }}>{children}</RouterLink>
      );
    }
    return (
        <a className={classNames(className)} {...{ href, title, target, rel: 'nofollow' }}>{children}</a>
    );

  } catch (e) { }

  return (
    <a className={classNames(className)} {...{ href, title, target, rel }}>{children}</a>
  );
};

export default withRouter(ContentLink);
