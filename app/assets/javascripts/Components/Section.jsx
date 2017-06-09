import React from 'react';

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
  children: React.PropTypes.node,
  className: React.PropTypes.any
};

export default Section;
