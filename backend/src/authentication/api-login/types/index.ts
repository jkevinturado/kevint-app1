import { APIGatewayEvent } from 'aws-lambda';

interface PartialApiGatewayEvent {
  headers: APIGatewayEvent['headers'];
  body: APIGatewayEvent['body'];
}

export type LoginEvent = APIGatewayEvent | PartialApiGatewayEvent;

export interface body {
  email: string;
  password: string;
}
