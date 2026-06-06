import { APIGatewayProxyEvent } from 'aws-lambda';

interface PartialApiGatewayEvent {
  headers: APIGatewayProxyEvent['headers'];
  body: APIGatewayProxyEvent['body'];
}

export type LoginEvent = APIGatewayProxyEvent | PartialApiGatewayEvent;

export interface LoginRequestBody {
  email: string;
  password: string;
}

export interface UserDetails {
  userId: string;
  email: string;
  password: string;
}
