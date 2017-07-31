import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const ButtonGroup = props => {
  const { children, className, ...otherProps } = props;
  return (
    <div className={classNames('btn-group', className)} {...otherProps}>
      {children}
    </div>
  );
};

ButtonGroup.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired
};

export default ButtonGroup;
