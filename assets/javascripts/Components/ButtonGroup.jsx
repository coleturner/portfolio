import React from 'react';
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
  className: React.PropTypes.string,
  children: React.PropTypes.node.isRequired
};

export default ButtonGroup;
