import React from 'react';
import PropTypes from 'prop-types';

import classNames from 'classnames';

const Button = (props) => {
  const { children, className, onClick, type, ...otherProps} = props;

  return (
    <button className={classNames(className)} type={type} onClick={onClick} {...otherProps}>{children}</button>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  type: PropTypes.string.isRequired
};

Button.defaultProps = {
  children: "Submit",
  type: "button"
};

export default Button;
