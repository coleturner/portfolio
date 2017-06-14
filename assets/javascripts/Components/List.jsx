import React from 'react';

export const List = (props) => {
  const { children, items, ordered, ...otherProps } = props;
  const listItems = items.map((child, index) => {
    return (
      <ListItem key={index}>{child}</ListItem>
    );
  });

  if (ordered) {
    return (
      <ol {...otherProps}>{listItems}{children}</ol>
    );
  }

  return (
    <ul {...otherProps}>{listItems}{children}</ul>
  );
};

export const ListItem = (props) => {
  const { children, ...otherProps } = props;
  return (
    <li {...otherProps}>{children}</li>
  );
};

List.propTypes = {
  children: React.PropTypes.node,
  ordered: React.PropTypes.bool,
  items: React.PropTypes.array
};

List.defaultProps = {
  items: []
};

export default List;
