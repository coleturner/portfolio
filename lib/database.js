import { MongoClient } from 'mongodb';

export function withMongoDB(resolver) {
  return async function connectedResolver(req, res) {
    const {
      MONGO_DB_CLUSTER_URL,
      MONGO_DB_PASS,
      MONGO_DB_USER,
      MONGO_DB_STORE_NAME,
    } = process.env;

    const uri = `mongodb+srv://${MONGO_DB_USER}:${MONGO_DB_PASS}@${MONGO_DB_CLUSTER_URL}?retryWrites=true&w=majority`;

    try {
      req.mongoClient =
        req.mongoClient || new MongoClient(uri, { useNewUrlParser: true });

      if (!req.mongoClient.isConnected()) {
        await req.mongoClient.connect();
      }

      req.mongoDB = req.mongoClient.db(MONGO_DB_STORE_NAME);

      return await resolver(req, res);
    } finally {
      if (req.mongoClient) {
        await req.mongoClient.close();
      }
    }
  };
}
