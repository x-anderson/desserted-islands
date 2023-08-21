import { MongoClient } from "mongodb";
import { Handler, HandlerEvent, HandlerContext } from "@netlify/functions";

const mongoClient = new MongoClient(process.env.MONGODB_URI_CLIENT || "");

const handler: Handler = async (
  event: HandlerEvent,
  context: HandlerContext
) => {
  try {
    const db = mongoClient.db(process.env.MONGO_DB_NAME);

    const res = await db
      .collection(process.env.MONGO_DB_COLLECTION_COUNTRIES || "")
      .find({})
      .toArray();

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(res),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify(error),
    };
  }
};

export { handler };
