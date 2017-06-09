import React from 'react';
import { createResolveElements } from './found';

import createFarceRouter from 'found/lib/createFarceRouter';
import BrowserProtocol from 'farce/lib/BrowserProtocol';
import queryMiddleware from 'farce/lib/queryMiddleware';

import { createRender } from 'found';
import { makeRouteConfig, Route } from 'found/lib/jsx';

import environment from './environment';

import AppWrapper from '../App/Wrapper';
import ArticleRoutes from './Articles';
import EditorRoutes from './Editor';
import FrontpageRoute from './Frontpage';
import ProductRoutes from './Products';
import CatchAllRoute from './CatchAll';

const Routes = makeRouteConfig(
  <Route
    path="/"
    Component={AppWrapper}
  >
    {ArticleRoutes}
    {ProductRoutes}
    {FrontpageRoute}
    {EditorRoutes}
    {CatchAllRoute}
  </Route>
);


const Router = createFarceRouter({
  historyProtocol: new BrowserProtocol(),
  historyMiddlewares: [queryMiddleware],
  routeConfig: Routes,
  render: createRender({}),
});


const Resolver = (props) => (
  <Router
    resolveElements={createResolveElements(environment)}
    {...props} />
);

export default Resolver;
