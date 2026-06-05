import { APIGatewayProxyEvent } from 'aws-lambda';

interface PartialApiGatewayEvent {
  headers: APIGatewayProxyEvent['headers'];
  body: APIGatewayProxyEvent['body'];
}

export type LoginEvent = APIGatewayProxyEvent | PartialApiGatewayEvent;

export interface body {
  email: string;
  password: string;
}

export interface UserDetails {
  userId: string;
  email: string;
  passwordHash: string;
}
