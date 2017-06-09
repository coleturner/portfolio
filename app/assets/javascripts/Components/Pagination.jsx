import React from 'react';
import classNames from 'classnames';

import Flex from './Flex';
import Hyperlink from './Hyperlink';
import Icon from './SimpleIcon';
import Loading from './Loading';
import Text from './Text';
import View from './View';

export const Pagination = (props) => {
  const { children, className, loading, prevPage, nextPage, page, prevText, nextText, onPrevPage, onNextPage, query, ...otherProps } = props;

  const previousLink = new URL(location.href);
  const nextLink = new URL(location.href);

  Object.keys(query.toObject()).forEach(key => {
      previousLink.searchParams.set(key, props.query[key]);
      nextLink.searchParams.set(key, props.query[key]);
  });

  previousLink.searchParams.set('page', prevPage);
  nextLink.searchParams.set('page', nextPage);

  if (loading) {
    return (
      <View className="text-center"><Loading /></View>
    );
  }

  const previous = prevPage !== null ? (
      prevPage ? (<Hyperlink onClick={onPrevPage} className="previous" rel="prev" href={previousLink.toString()}>{prevText}</Hyperlink>)
      : (<Text className="previous">{prevText}</Text>)
    ) : null;

  const next = nextPage !== null ? (
      nextPage ? (<Hyperlink onClick={onNextPage} className="next" rel="next" href={nextLink.toString()}>{nextText}</Hyperlink>)
      : (<Text className="next">{nextText}</Text>)
    ) : null;

  return (
    <Flex className={classNames('pagination', className)} {...otherProps}>
      {previous}
      {page !== null ? <Text className="current-page">Page {page}</Text> : null}
      {next}
    </Flex>
  );
};

Pagination.propTypes = {
  prevPage: React.PropTypes.number,
  nextPage: React.PropTypes.number,
  page: React.PropTypes.number,
  prevText: React.PropTypes.node,
  nextText: React.PropTypes.node,
  onPrevPage: React.PropTypes.func,
  onNextPage: React.PropTypes.func
};

Pagination.defaultProps = {
  page: null,
  prevPage: null,
  nextPage: null,
  prevText: (<Text><Icon id="chevron-left" /> Previous</Text>),
  nextText: (<Text>Next <Icon id="chevron-right" /></Text>),
  onPrevPage: () => { console.log("onPrevPage not implemented"); },
  onNextPage: () => { console.log("onNextPage not implemented"); }
}

export default Pagination;
