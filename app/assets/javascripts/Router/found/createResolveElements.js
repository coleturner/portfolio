import isPromise from 'is-promise';
import {
  checkResolved, getComponents, getRouteMatches, getRouteValues, isResolved,
} from 'found/lib/ResolverUtils';
import Relay from 'react-relay';

import createElements from './createElements';

// TODO: Should we disable Relay query caching for SSR? If so, we should cache
// query sets ourselves.

const PENDING_READY_STATE = {
  aborted: false,
  done: false,
  error: null,
  events: [],
  ready: false,
  stale: false,
};

const STALE_READY_STATE = {
  ...PENDING_READY_STATE,
  ready: true,
  stale: true,
};

const DONE_READY_STATE = {
  ...PENDING_READY_STATE,
  done: true,
  ready: true,
};

export default function createResolveElements(Environment) {
  return async function* resolveElements(match) {
    // TODO: Close over and abort earlier requests?

    const routeMatches = getRouteMatches(match);
    const Components = getComponents(routeMatches);
    const matchQueries = getRouteValues(
      routeMatches,
      route => route.getQuery,
      route => route.query,
    );

    let params = null;

    const queryConfigs = routeMatches.map((routeMatch, i) => {
      const { route } = routeMatch;

      // We need to always run this to make sure we don't miss params.
      params = { ...params, ...routeMatch.routeParams };
      if (route.prepareParams) {
        params = route.prepareParams(params, routeMatch);
      }

      const query = matchQueries[i];
      if (!query) {
        return null;
      }

      const initialVariables = getRouteValues(
        [routeMatch],
        _route => _route.getInitialVariables,
        _route => _route.initialVariables,
      )[0];

      return { query, initialVariables };
    });

    yield createElements(
      Environment,
      routeMatches,
      Components,
      queryConfigs
    );
  };
}
