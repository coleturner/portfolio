import PropTypes from 'prop-types';
import React from 'react';
import { QueryRenderer } from 'react-relay';
import { Environment } from 'relay-runtime';

const propTypes = {
  match: PropTypes.shape({
    route: PropTypes.shape({
      render: PropTypes.func,
    }).isRequired,
  }).isRequired,
  Component: PropTypes.any.isRequired,
  environment: PropTypes.instanceOf(Environment).isRequired,
  queryConfig: PropTypes.object.isRequired,
};

class RelayRouteRenderer extends React.Component {

  render() {
    // We need to explicitly pull out ownProps here to inject them into the
    // actual Relay container rather than the Relay.ReadyStateRenderer, when
    // we get cloned with props like children.
    const {
      match, Component, environment, queryConfig, ...ownProps
    } = this.props;


    const { route } = match;

    // The render function must be bound here to correctly trigger updates in
    // Relay.ReadyStateRenderer.
    function render(renderArgs) {
      const { props } = renderArgs;

      if (!route.render) {
        return <Component {...match} {...ownProps} {...props} />;
      }

      return route.render({
        ...renderArgs,
        match,
        Component,
        props: props && { ...match, ...ownProps, ...props },
        ownProps,
      });
    }

    const { query, initialVariables } = queryConfig;

    return (
      <QueryRenderer
        environment={environment}
        query={query}
        variables={initialVariables}
        render={render}
      />
    );
  }
}

RelayRouteRenderer.propTypes = propTypes;

export default RelayRouteRenderer;
