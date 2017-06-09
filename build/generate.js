const fetch = require('node-fetch');
const fs = require('fs');
const {
  buildClientSchema,
  introspectionQuery,
  printSchema,
} = require('graphql/utilities');

const path = require('path');
const schemaPath = path.join(__dirname, 'schema');

const GRAPH_URL = `http://web:${process.env.BACKEND_PORT}/graphql`;
console.log("Generating schema for Graph: ",GRAPH_URL);

// Save JSON of full schema introspection for Babel Relay Plugin to use
fetch(GRAPH_URL, {
  method: 'POST',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ 'query': introspectionQuery }),
}).then(res => res.json()).then(schemaJSON => {
  fs.writeFileSync(
    `${schemaPath}.json`,
    JSON.stringify(schemaJSON, null, 2)
  );

  // Save user readable type system shorthand of schema
  const graphQLSchema = buildClientSchema(schemaJSON.data);
  fs.writeFileSync(
    `${schemaPath}.graphql`,
    printSchema(graphQLSchema)
  );

  console.log("Done!");
}).catch(e => {
  console.error("Could not generate schema: ", e.toString());
});
