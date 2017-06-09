import React from 'react';
import Route from '../Route';

import Container from '../../ReviewDetail';

export default (
  <Route
    path=":reviewSlug"
    Component={Container}
  />
);
