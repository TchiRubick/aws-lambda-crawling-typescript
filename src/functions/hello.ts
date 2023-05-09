import type { APIGatewayProxyHandler, APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import os from 'os';

export const handler: APIGatewayProxyHandler = async (_event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    const response = {
      statusCode: 200,
      body: process.env.IS_OFFLINE || 'Not Found',
    };
    return response;
  } catch (err) {
    return {
      statusCode: 500,
      body: 'An error occured',
    };
  }
};
