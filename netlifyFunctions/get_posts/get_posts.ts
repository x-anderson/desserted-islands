import { MongoClient } from "mongodb";
import { Handler, HandlerEvent, HandlerContext } from "@netlify/functions";

const handler: Handler = async (
  event: HandlerEvent,
  context: HandlerContext
) => {
  const client = await MongoClient.connect(
    process.env.MONGODB_URI_CLIENT || ""
  );

  const db = client.db(process.env.MONGO_DB_NAME);

  const res = await db
    .collection(process.env.MONGO_DB_COLLECTION || "")
    .find({})
    .toArray();

  return {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(res),
  };
};

export { handler };
