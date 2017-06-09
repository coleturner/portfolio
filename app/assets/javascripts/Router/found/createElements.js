import { isResolved } from 'found/lib/ResolverUtils';
import React from 'react';

import RelayRouteRenderer from './RelayRouteRenderer';

export default function createElements(
  environment,
  routeMatches,
  Components,
  queryConfigs,
) {
  return routeMatches.map((match, i) => {
    const { route } = match;

    const Component = Components[i];
    const queryConfig = queryConfigs[i];

    const isComponentResolved = isResolved(Component);

    // Handle non-Relay routes.
    if (!queryConfig) {
      if (route.render) {
        return route.render({
          match,
          Component: isComponentResolved ? Component : null,
          props: match,
        });
      }

      if (!isComponentResolved) {
        return undefined;
      }

      return Component ? <Component {...match} /> : null;
    }

    if (!isComponentResolved) {
      // Can't render a RelayReadyStateRenderer here.
      if (route.render) {
        return route.render({
          match,
          Component: null,
          props: null,
        });
      }

      return null;
    }


    // If there's a query config, then there must be a component.
    return (
      <RelayRouteRenderer
        match={match}
        Component={Component}
        environment={environment}
        queryConfig={queryConfig}
      />
    );
  });
}
