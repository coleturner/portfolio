import React from 'react';
import Route from '../Route';

import { Container, query } from '../../Editor';

export default (
<Route
  path=":id"
  Component={Container}
  query={query}
  getInitialVariables={(route) => {
    return {
      nodeID: route.routeParams.id
    };
  }}
/>
);
