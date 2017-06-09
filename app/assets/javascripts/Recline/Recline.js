import {
  createFragmentContainer,
  graphql,
} from 'react-relay';
import View from './View';


export const ReclineContainer = createFragmentContainer(View, {
  model: graphql`
    fragment Recline_model on ReclineModel {
      attributes {
        name
        field_name
        appearance
        read_only
        validators {
          absence
          presence
          uniqueness
          with_format
          without_format
          min_length
          max_length
          inclusion
          exclusion
        }
      }

      primaryKey

      versions {
        id
        createdAt
        object {
          attribute
          type
          intValue
          floatValue
          boolValue
          stringValue
        }
      }
    }
  `
});

export default ReclineContainer;
