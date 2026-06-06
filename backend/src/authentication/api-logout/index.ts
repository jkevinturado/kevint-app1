import { APIGatewayEvent } from 'aws-lambda';

export const handler = async (event: APIGatewayEvent) => {
  // TODO implement

  console.info('Event: ', event);
  const response = {
    statusCode: 200,
    body: JSON.stringify('Okay'),
  };
  return response;
};
