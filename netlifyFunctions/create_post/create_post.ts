import { MongoClient } from "mongodb";
import { Handler, HandlerEvent, HandlerContext } from "@netlify/functions";

const MONGO_URI = process.env.MONGODB_URI_ADMIN || "";
const DB_NAME = process.env.MONGO_DB_NAME || "";
const COLLECTION = process.env.MONGO_DB_COLLECTION_POSTS || "";

let cachedClient: MongoClient | null = null;

async function getClient(): Promise<MongoClient> {
  if (!cachedClient) {
    cachedClient = new MongoClient(MONGO_URI);
    await cachedClient.connect();
  }
  return cachedClient;
}

function isValidUrl(u: unknown) {
  if (typeof u !== "string") return false;
  try {
    new URL(u);
    return true;
  } catch {
    return false;
  }
}

const handler: Handler = async (
  event: HandlerEvent,
  context: HandlerContext,
) => {
  if (!event.body) {
    return { statusCode: 422, body: "Empty request body" };
  }

  const user = context?.clientContext?.user;
  if (!user) {
    return { statusCode: 401, body: "Unauthorized" };
  }

  let payload: any;
  try {
    payload = JSON.parse(event.body);
  } catch (err) {
    return { statusCode: 400, body: "Invalid JSON" };
  }

  const { url, countryAlpha2, subCountry } = payload || {};
  if (!isValidUrl(url)) {
    return { statusCode: 400, body: "Invalid or missing `url`" };
  }
  if (!countryAlpha2 || typeof countryAlpha2 !== "string") {
    return {
      statusCode: 400,
      body: "Invalid or missing `countryAlpha2` (expected 2-letter code)",
    };
  }
  if (subCountry && typeof subCountry !== "string") {
    return { statusCode: 400, body: "`subCountry` must be a string" };
  }

  const doc: Record<string, unknown> = {
    url,
    countryAlpha2: countryAlpha2.toUpperCase(),
    createdAt: new Date().toISOString(),
  };
  if (subCountry) doc.subCountry = subCountry;
  if (user && user.email) doc.createdBy = user.email;

  try {
    const client = await getClient();
    const db = client.db(DB_NAME);
    await db.collection(COLLECTION).insertOne(doc);
    return { statusCode: 201, body: JSON.stringify({ success: true }) };
  } catch (error) {
    console.error("create_post error:", error);
    return { statusCode: 500, body: "Server error" };
  }
};

export { handler };
