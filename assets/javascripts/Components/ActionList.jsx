import React from 'react';
import classNames from 'classnames';

const ActionList = props => {
  const { children, className, ...otherProps } = props;
  return (
    <div className={classNames('form-actions', className)} {...otherProps}>
      {children}
    </div>
  );
};

ActionList.propTypes = {
  className: React.PropTypes.string,
  children: React.PropTypes.node.isRequired
};

export default ActionList;
