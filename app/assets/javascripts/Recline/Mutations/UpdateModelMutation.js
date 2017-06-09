import {
  commitMutation,
  graphql,
}  from 'react-relay';

const mutation = graphql`
  mutation UpdateModelMutation($input: UpdateModelInput!) {
    updateModel(input: $input) {
      model {
        ... on Article {
          _model {
            ...Recline_model
          }
        }
      }
    }
  }
`;

/*
const optimisticResponse = () => ({
  markReadNotification: {
    notification: {
      seenState: SEEN,
    },
  },
});
*/

export default function updateModel(nodeID, fields) {
  const variables = {
    input: {
      nodeID,
      fields,
    },
  };

  return new Promise((resolve, reject) => {
    commitMutation(
      this,
      {
        mutation,
      //  optimisticResponse,
        variables,
        onCompleted: resolve,
        onError: reject
      },
    );
  });
}
