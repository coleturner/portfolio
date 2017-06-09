import {
  createFragmentContainer,
  graphql,
} from 'react-relay';
import View from './View';

export const query = graphql`
  query EditorRefetchQuery (
    $nodeID: ID!
  ) {
    node(id: $nodeID) {
      ...Editor_node
    }
  }
`;


export const NodeEditorContainer = createFragmentContainer(View, {
  node: graphql`
    fragment Editor_node on Node {
      __typename
      ...ArticleEditor_node
    }
  `
});

export default NodeEditorContainer;
