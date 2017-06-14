import React from 'react';

import classNames from 'classnames';

const Button = (props) => {
  const { children, className, onClick, type, ...otherProps} = props;

  return (
    <button className={classNames(className)} type={type} onClick={onClick} {...otherProps}>{children}</button>
  );
};

Button.propTypes = {
  children: React.PropTypes.node.isRequired,
  className: React.PropTypes.string,
  type: React.PropTypes.string.isRequired
};

Button.defaultProps = {
  children: "Submit",
  type: "button"
};

export default Button;
