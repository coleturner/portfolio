import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export const Icon = (props) => {
  const { className, id: idProp, ...otherProps } = props;

  const id = idProp.indexOf('#') !== -1 ? idProp : Icon.LIST[idProp];

  return (
      <svg className={classNames('icon', className)} {...otherProps}><use xlinkHref={id}></use></svg>
  );
};

Icon.propTypes = {
  className: PropTypes.any,
  id: PropTypes.string.isRequired
};

Icon.LIST = {
  CHECKMARK: require('../../icons/checkmark.svg'),
  COG: require('../../icons/cog.svg'),
  DATABASE: require('../../icons/database.svg'),
  EDUCATION: require('../../icons/education.svg'),
  GITHUB: require('../../icons/github.svg'),
  GRAPHQL: require('../../icons/graphql.svg'),
  JAVASCRIPT: require('../../icons/javascript.svg'),
  LINK: require('../../icons/link.svg'),
  LINKED_IN: require('../../icons/linked_in.svg'),
  LOGO: require('../../icons/logo.svg'),
  MAIL: require('../../icons/mail.svg'),
  MEDIUM: require('../../icons/medium.svg'),
  MICROSCOPE: require('../../icons/microscope.svg'),
  NODE: require('../../icons/node.svg'),
  PYTHON: require('../../icons/python.svg'),
  REACT: require('../../icons/react.svg'),
  RESPONSIVE: require('../../icons/responsive.svg'),
  RUBY: require('../../icons/ruby.svg'),
  STACK: require('../../icons/stack.svg'),
  TROPHY: require('../../icons/trophy.svg'),
  TWITTER: require('../../icons/twitter.svg'),
  USER: require('../../icons/user.svg'),
};

export default Icon;
