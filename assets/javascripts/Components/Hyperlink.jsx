import React from 'react';
import PropTypes from 'prop-types';

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
  const { children, path, ...otherProps } = props;

  const href = getHref(props);

  if (!('target' in otherProps) && href && href.slice(0, 1) !== '#') {
    try {
      const url = new URL(href);
      if (typeof location !== 'undefined' && url.host !== location.host && url.protocol !== 'mailto:') {
        otherProps.target = '_blank';
        otherProps.rel = 'nofollow';
      }
    } catch (e) {

    }
  }

  return (
    <a href={href} {...otherProps}>
      {children || href}
    </a>
  );
};

Hyperlink.propTypes = {
  children: PropTypes.node,
  href: PropTypes.string,
  path: PropTypes.string
};

export default Hyperlink;
