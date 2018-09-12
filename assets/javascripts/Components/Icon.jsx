import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import styled from 'react-emotion';

const SVG = styled.svg`
  max-width: 1.15em;
  max-height: 1.15em;

  use {
    fill: #aaa;
    transition: all 0.15s ease-out;
  }
`;

export const Icon = props => {
  const { className, id: idProp, ...otherProps } = props;

  const id = idProp.indexOf('#') !== -1 ? idProp : Icon.LIST[idProp];

  return (
    <SVG className={classNames('icon', className)} {...otherProps}>
      <use xlinkHref={id} />
    </SVG>
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
  FOLDER: require('../../icons/folder.svg'),
  GITHUB: require('../../icons/github.svg'),
  GRAPHQL: require('../../icons/graphql.svg'),
  JAVASCRIPT: require('../../icons/javascript.svg'),
  LINK: require('../../icons/link.svg'),
  LINKED_IN: require('../../icons/linked_in.svg'),
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
  USER: require('../../icons/user.svg')
};

export default Icon;
