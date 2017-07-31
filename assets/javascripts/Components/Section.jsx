import React from 'react';
import PropTypes from 'prop-types';

import classNames from 'classnames';

export const Section = (props) => {
  const { children, className, ...otherProps } = props;
  return (
    <section className={classNames(className)} {...otherProps}>
      {children}
    </section>
  );
};

Section.propTypes = {
  children: PropTypes.node,
  className: PropTypes.any
};

export default Section;
