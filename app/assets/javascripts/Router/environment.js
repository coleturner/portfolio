import fetch from 'isomorphic-fetch';
import { Environment, Network, RecordSource, Store } from 'relay-runtime';

const source = new RecordSource();
const store = new Store(source);

function fetchQuery(
  operation,
  variables,
  cacheConfig,
  uploadables,
) {
  return fetch('/graphql', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      query: operation.text, // GraphQL text from input
      variables,
    }),
  }).then(response => response.json());
}


const network = Network.create(fetchQuery);

const environment = new Environment({
  network,
  store,
});

export default environment;
