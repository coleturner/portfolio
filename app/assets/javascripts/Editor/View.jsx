import React from 'react';

import ArticleEditor from '../ArticleEditor';

export const ObjectComponents = {
  'Article': ArticleEditor
};

export default class NodeEditorScreen extends React.PureComponent {
  static contextTypes = {
    route: React.PropTypes.object,
    router: React.PropTypes.object
  }

  render() {
    const { node } = this.props;

    switch (node.__typename) {
      case 'Article':
        const Component = ObjectComponents[node.__typename];
        return <Component {...this.props} />;
        break;
    }
  }
}
