import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

const ActionList = props => {
  const { children, className, ...otherProps } = props;
  return (
    <div className={classNames('form-actions', className)} {...otherProps}>
      {children}
    </div>
  );
};

ActionList.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired
};

export default ActionList;
