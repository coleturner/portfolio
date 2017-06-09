import React from 'react';
import Route from './Route';

import { default as Container, query } from './Slug';

export default (
  <Route
    path=":slug"
    Component={Container}
    query={query}
    getInitialVariables={(route) => route.routeParams}
  />
);
