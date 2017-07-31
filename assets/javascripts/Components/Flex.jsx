import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import View from './View';

const Flex = (props) => {
  const { children, direction, ...otherProps } = props;
  otherProps.className = classNames('flex', otherProps.className, 'flex-' + direction);

  return (
    <View {...otherProps}>
      {children}
    </View>
  );
};

Flex.propTypes = {
  children: PropTypes.node.isRequired,
  direction: PropTypes.string
};

Flex.defaultProps = {
  direction: 'row'
};

export default Flex;
