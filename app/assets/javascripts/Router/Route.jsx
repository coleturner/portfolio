import React from 'react';
import { Route } from 'found/lib/jsx';

import ErrorHandler from '../App/ErrorHandler';
import Loading from '../Components/Loading';

const render = ({ Component, props, match, ownProps, error }) => {
  if (!Component) {
    return null;
  }

  if (error) {
    return (<ErrorHandler error={error} />);
  } else if (!props) {
    return <Loading />;
  }

  return <Component {...match} {...ownProps} {...props} />;
};

export default class AppRoute extends Route {
  static defaultProps = {
    render
  }
}
