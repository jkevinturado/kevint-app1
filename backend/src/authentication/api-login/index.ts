import { LoginEvent } from './types';
import { InvalidAccessError } from './errors/auth';

import ApiLoginHandler from './handler';

const responseHnadler = (statusCode: number, message: string) => {
  return {
    statusCode,
    body: JSON.stringify(message),
  };
};

export const handler = async (event: LoginEvent) => {
  console.info('Received Login Event: ', event);

  try {
    const { body } = event;

    if (!body) {
      console.warn('Missing request body');
      return responseHnadler(400, 'Bad Request: Missing request body');
    }

    const apiLoginHandler = new ApiLoginHandler(body);
    const credentials = apiLoginHandler.validateCredentials();
  } catch (error) {
    if (error instanceof InvalidAccessError) {
      return responseHnadler(401, 'Unauthorized: Invalid email or password');
    }
  }
};
