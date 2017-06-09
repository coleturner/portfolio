import React from 'react';
import Route from '../Route';

import ListRoute from './List';
import DetailRoute from './Detail';

export default (
<Route
  path="reviews"
>
  {ListRoute}
  {DetailRoute}
</Route>
);
