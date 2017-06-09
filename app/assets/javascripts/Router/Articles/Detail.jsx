import React from 'react';

import Route from '../Route';

import { Container, query } from '../../ArticleDetail';

export default (
<Route
  path=":slug"
  Component={Container}
  query={query}
/>
);
