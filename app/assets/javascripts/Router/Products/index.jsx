import React from 'react';
import Route from '../Route';

import ProductFeedRoute from './Feed';
import ProductDetailRoute from './Detail';

export default (
<Route
  path="products"
>
  {ProductFeedRoute}
  {ProductDetailRoute}
</Route>
);
