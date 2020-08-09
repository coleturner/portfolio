import { MongoClient } from 'mongodb';

export async function withMongoDB(operation) {
  const {
    MONGO_DB_CLUSTER_URL,
    MONGO_DB_PASS,
    MONGO_DB_USER,
    MONGO_DB_STORE_NAME,
  } = process.env;
  const uri = `mongodb+srv://${MONGO_DB_USER}:${MONGO_DB_PASS}@${MONGO_DB_CLUSTER_URL}?retryWrites=true&w=majority`;
  const client = new MongoClient(uri);

  try {
    await client.connect();

    const database = client.db(MONGO_DB_STORE_NAME);

    const postsCollection = () => database.collection('posts');

    await operation({ postsCollection });
  } finally {
    await client.close();
  }
}
