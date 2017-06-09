import {
  createFragmentContainer,
  graphql,
} from 'react-relay';
import View from './View';

export const ReferenceListContainer = createFragmentContainer(View, {
  references: graphql`
    fragment ReferenceList_references on ContentType @relay(plural: true) {
      title
      status
      object {
        __typename

        ... on ButtonEntry {
          id
        }

        ... on Image {
          id
        }

        ... on TextEntry {
          id
        }
      }
    }
  `
});

export default ReferenceListContainer;
