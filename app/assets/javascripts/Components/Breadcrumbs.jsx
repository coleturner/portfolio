import React from 'react';
import { Link, withRouter } from 'found';

import List from './List';
import View from './View';

export const Breadcrumbs = props => {
  return (
    <View id="breadcrumbs">
      <List className="container" ordered={true} items={props.crumbs.map(crumb => {
        return 'url' in crumb ? (
          <Link to={crumb.url}>{crumb.text}</Link>
        ) : crumb.text;
      })} />
    </View>
  );
};

Breadcrumbs.propTypes = {
  crumbs: React.PropTypes.any.isRequired
};

export default withRouter(Breadcrumbs);
