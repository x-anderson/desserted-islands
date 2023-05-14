import { MongoClient } from "mongodb";
import { Handler, HandlerEvent, HandlerContext } from "@netlify/functions";

const handler: Handler = async (
  event: HandlerEvent,
  context: HandlerContext
) => {
  if (!event.body) {
    return { statusCode: 422 };
  }

  const client = await MongoClient.connect(process.env.MONGODB_URI_ADMIN || "");

  const db = client.db(process.env.MONGO_DB_NAME);

  await db
    .collection(process.env.MONGO_DB_COLLECTION || "")
    .insertOne(JSON.parse(event.body));

  return {
    statusCode: 200,
  };
};

export { handler };
