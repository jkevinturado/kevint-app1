import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { SSMServiceException } from '@aws-sdk/client-ssm';
import { DynamoDBServiceException } from '@aws-sdk/client-dynamodb';

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
        error.constructor.name + ': ' + error.message,
      );
    }
    if (error instanceof BadRequestError) {
      return responseHandler(
        400,
        error.constructor.name + ': ' + error.message,
      );
    }
    if (error instanceof DynamodbItemNotFoundException) {
      console.warn('Authentication failed: ', error);
      return responseHandler(
        401,
        error.constructor.name + ': ' + error.message,
      );
    }
    if (
      error instanceof SSMItemNotFoundException ||
      error instanceof SSMServiceException ||
      error instanceof DynamoDBServiceException
    ) {
      console.error('Error processing login request: ', error);
      return responseHandler(
        500,
        error.constructor.name + ': ' + error.message,
      );
    }

    console.error(error);
    return responseHandler(500, 'Internal Server Error');
  }
};
