import React from 'react';
import Link from './Link';

export const ContentButton = (props) => {
  const {
    className = 'button',
    url: href,
    contents
  } = props;

  return (
    <Link {... { className, href }}>{contents}</Link>
  );
};

export default ContentButton;
