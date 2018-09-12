import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import styled from 'react-emotion';


import CHECKMARK from '../../icons/checkmark.svg';
import COG from '../../icons/cog.svg';
import DATABASE from '../../icons/database.svg';
import EDUCATION from '../../icons/education.svg';
import FOLDER from '../../icons/folder.svg';
import GITHUB from '../../icons/github.svg';
import GRAPHQL from '../../icons/graphql.svg';
import JAVASCRIPT from '../../icons/javascript.svg';
import LINK from '../../icons/link.svg';
import LINKED_IN from '../../icons/linked_in.svg';
import MAIL from '../../icons/mail.svg';
import MEDIUM from '../../icons/medium.svg';
import MICROSCOPE from '../../icons/microscope.svg';
import NODE from '../../icons/node.svg';
import PYTHON from '../../icons/python.svg';
import REACT from '../../icons/react.svg';
import RESPONSIVE from '../../icons/responsive.svg';
import RUBY from '../../icons/ruby.svg';
import STACK from '../../icons/stack.svg';
import TROPHY from '../../icons/trophy.svg';
import TWITTER from '../../icons/twitter.svg';
import USER from '../../icons/user.svg';

const SVG = styled.svg`
  max-width: 1.15em;
  max-height: 1.15em;

  use {
    fill: #aaa;
    transition: all 0.15s ease-out;
  }
`;

export const Icon = props => {
  const { className, symbol: { viewBox, id }, ...otherProps } = props;
  return (
    <SVG className={classNames('icon', className)} {...otherProps}>
      <use xlinkHref={`#${id}`} />
    </SVG>
  );
};

Icon.propTypes = {
  className: PropTypes.any,
  symbol: PropTypes.shape({
    viewBox: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired
  }).isRequired
};

Icon.LIST = {
  CHECKMARK,
  COG,
  DATABASE,
  EDUCATION,
  FOLDER,
  GITHUB,
  GRAPHQL,
  JAVASCRIPT,
  LINK,
  LINKED_IN,
  MAIL,
  MEDIUM,
  MICROSCOPE,
  NODE,
  PYTHON,
  REACT,
  RESPONSIVE,
  RUBY,
  STACK,
  TROPHY,
  TWITTER,
  USER
};

export default Icon;
