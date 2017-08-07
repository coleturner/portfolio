import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const getHref = (props) => {
  if (!('path' in props) && !('href' in props)) {
    throw new Error('Must specify either `path` or `href` to Hyperlink');
  }

  if ('path' in props) {
    if (typeof location !== 'undefined') {
      try {
        const url = new URL(location.protocol + '//' + location.host);
        url.pathname = props.path;

        return url.toString();
      } catch (e) { }
    }

    return props.path;
  }

  return props.href;
};

export const Hyperlink = (props) => {
  const { activeClassName, children, path, ...otherProps } = props;

  const href = getHref(props);

  if (!('target' in otherProps) && href && href.slice(0, 1) !== '#') {
    try {
      const url = new URL(href);
      if (typeof location !== 'undefined' && url.host !== location.host && url.protocol !== 'mailto:') {
        otherProps.target = '_blank';
        otherProps.rel = 'nofollow';
      }

      if (!!activeClassName && window.location.pathname === url.pathname) {
        otherProps.className = classNames(activeClassName, otherProps.className);
      }
    } catch (e) {}
  }

  return (
    <a href={href} {...otherProps}>
      {children || href}
    </a>
  );
};

Hyperlink.propTypes = {
  activeClassName: PropTypes.string,
  children: PropTypes.node,
  href: PropTypes.string,
  path: PropTypes.string
};

export default Hyperlink;
