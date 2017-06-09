import React from 'react';
import Route from '../Route';

import { default as Container, query } from '../../ProductDetail';

export default (
  <Route
    path=":productSlug"
    Component={Container}
    query={query}
    getInitialVariables={(route) => {
      const { productSlug } = route.routeParams;
      return {
        productSlug,
        reviewOrder: 'POPULAR',
        reviewCount: 3,
        reviewCursor: null
      };
    }}
  />
);
