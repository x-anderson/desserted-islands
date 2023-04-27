import { Handler } from '@netlify/functions'

export const handler: Handler = async (event, context) => {
  const unixTime = Math.floor(Date.now() / 1000);
  return {
    statusCode: 200,
    body: `The Unix time is ${unixTime}`,
  };
}
