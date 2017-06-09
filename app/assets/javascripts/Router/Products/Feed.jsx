import React from 'react';
import Route from '../Route';

import {
  default as Container,
  query
} from '../../ProductFeed';

export default (
  <Route
    Component={Container}
    initialVariables={{
      brand: null,
      tag: null,
      order: 'POPULAR',
      first: 15
    }}
    query={query}
  />
);
