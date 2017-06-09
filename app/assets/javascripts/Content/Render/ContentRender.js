import {
  createFragmentContainer,
  graphql,
} from 'react-relay';
import View from './View';

export const ContentRenderContainer = createFragmentContainer(View, {
  contents: graphql`
    fragment ContentRender_contents on ContentType @relay(plural: true) {
      object {
        __typename

        ... on ButtonEntry {
          id
          url
          contents
        }

        ... on Image {
          id
          alt
          feed: version(name: "feed") {
            url
          }
          preview: version(name: "preview") {
            url
          }
        }

        ... on TextEntry {
          id
          title
          contents
        }
      }
    }
  `
});

export default ContentRenderContainer;
