import {MongoClient, Db} from 'mongodb'

let cachedDb;

const connectToDatabase = async (uri: string) => {
  // we can cache the access to our database to speed things up a bit
  // (this is the only thing that is safe to cache here)
  if (cachedDb) return cachedDb;

  const client = await MongoClient.connect(uri);

  cachedDb = client.db(process.env.MONGO_DB_NAME);

  return cachedDb;
};

const queryDatabase = async (db: Db) => {
  const res = await db.collection(process.env.MONGO_DB_COLLECTION || '').find({}).toArray();

  return {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(res),
  };
};

module.exports.handler = async (event, context) => {
  // otherwise the connection will never complete, since
  // we keep the DB connection alive
  context.callbackWaitsForEmptyEventLoop = false;

  const db = await connectToDatabase(process.env.MONGODB_URI || '');
  return queryDatabase(db);
};