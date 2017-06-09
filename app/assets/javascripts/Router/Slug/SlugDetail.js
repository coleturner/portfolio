import {
  createRefetchContainer,
  graphql,
} from 'react-relay';

import View from './View';

export const query = graphql`
  query SlugDetailRefetchQuery($slug: String!) {
    sluggable(slug: $slug, types: [TAG, ARTICLE]) {
      ...SlugDetail_sluggable
    }
  }
`;

export const AppSlugContainer = createRefetchContainer(View,
  {
    sluggable: graphql`
      fragment SlugDetail_sluggable on SluggableUnion {
        __typename
        ... on Article {
          ...ArticleDetail_article
        }

        ... on Tag {
          ...TagDetail_tag
        }
      }
      `
  },
  query
);

export default AppSlugContainer;
