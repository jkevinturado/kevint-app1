import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';

import { InvalidAccessError, BadRequestError } from './src/errors';
import {
  DynamodbItemNotFoundException,
  SSMItemNotFoundException,
} from './src/errors/aws';

import ApiLoginHandler from './src/handler';

const responseHandler = (
  statusCode: number,
  message: string,
): APIGatewayProxyResult => {
  return {
    statusCode,
    body: JSON.stringify(message),
  };
};

export const handler = async (event: APIGatewayProxyEvent) => {
  console.info('Received Login Event: ', event);

  try {
    const { body } = event;

    const apiLoginHandler = new ApiLoginHandler(body);
    await apiLoginHandler.execute();

    console.info('Authentication successful');

    return responseHandler(200, 'Login successful');
  } catch (error) {
    if (error instanceof InvalidAccessError) {
      return responseHandler(
        401,
        InvalidAccessError.name + ': ' + error.message,
      );
    }
    if (error instanceof BadRequestError) {
      return responseHandler(400, BadRequestError.name + ': ' + error.message);
    }
    if (error instanceof DynamodbItemNotFoundException) {
      console.error('Error processing login request: ', error);
      return responseHandler(
        500,
        DynamodbItemNotFoundException.name + ': ' + error.message,
      );
    }
    if (error instanceof SSMItemNotFoundException) {
      console.error('Error processing login request: ', error);
      return responseHandler(
        500,
        SSMItemNotFoundException.name + ': ' + error.message,
      );
    }

    return responseHandler(500, 'Internal Server Error');
  }
};
