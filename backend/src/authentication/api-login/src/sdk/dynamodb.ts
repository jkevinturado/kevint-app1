import { randomUUID } from 'crypto';

import {
  DynamoDBClient,
  DynamoDBClientConfig,
  QueryCommand,
  QueryCommandInput,
  PutItemCommand,
  PutItemCommandInput,
} from '@aws-sdk/client-dynamodb';
import { marshall, unmarshall } from '@aws-sdk/util-dynamodb';
import { NodeHttpHandler } from '@smithy/node-http-handler';
import { DateTime } from 'luxon';

import { DynamodbItemNotFoundException } from '../errors/aws';
import { UserDetails } from '../types';

const {
  ENVIRONMENT,
  LOCALSTACK_ENDPOINT,
  LOCALSTACK_REGION,
  LOCALSTACK_ACCESS_KEY,
  LOCALSTACK_SECRET_KEY,
  DYNAMODB_REGION,
  DYNAMODB_CONNECTION_TIMEOUT,
  DYNAMODB_REQUEST_TIMEOUT,
  DYNAMODB_MAX_ATTEMPTS,
  DYNAMODB_USER_DETAILS_TABLE,
  DYNAMODB_USER_SESSION_TABLE,
  DYNAMODB_USER_SESSION_TABLE_TTL_VALUE,
} = process.env;

const clientConfig: DynamoDBClientConfig =
  ENVIRONMENT === 'local'
    ? {
        endpoint: LOCALSTACK_ENDPOINT,
        region: LOCALSTACK_REGION,
        credentials: {
          accessKeyId: LOCALSTACK_ACCESS_KEY!,
          secretAccessKey: LOCALSTACK_SECRET_KEY!,
        },
        requestHandler: new NodeHttpHandler({
          connectionTimeout: parseInt(DYNAMODB_CONNECTION_TIMEOUT!) || 3000,
          requestTimeout: parseInt(DYNAMODB_REQUEST_TIMEOUT!) || 3000,
        }),
        maxAttempts: parseInt(DYNAMODB_MAX_ATTEMPTS!) || 3,
      }
    : {
        region: DYNAMODB_REGION || 'ap-southeast-1',
        requestHandler: new NodeHttpHandler({
          connectionTimeout: parseInt(DYNAMODB_CONNECTION_TIMEOUT!) || 3000,
          requestTimeout: parseInt(DYNAMODB_REQUEST_TIMEOUT!) || 3000,
        }),
        maxAttempts: parseInt(DYNAMODB_MAX_ATTEMPTS!) || 3,
      };

const ddbClient: DynamoDBClient = new DynamoDBClient(clientConfig);

export const getUserDetails = async (email: string) => {
  const input: QueryCommandInput = {
    TableName: DYNAMODB_USER_DETAILS_TABLE,
    IndexName: 'email-index',
    KeyConditionExpression: 'email = :email',
    ExpressionAttributeValues: marshall({ ':email': email }),
  };

  const command = new QueryCommand(input);
  const output = await ddbClient.send(command);

  if (!output.Items || output.Items.length === 0) {
    throw new DynamodbItemNotFoundException('User not found');
  }

  return unmarshall(output.Items[0]) as UserDetails;
};

export const putUserSession = async (userId: string, token: string) => {
  const now = DateTime.now().toISO({ includeOffset: true });
  const ttl = DateTime.utc()
    .plus({
      seconds: DYNAMODB_USER_SESSION_TABLE_TTL_VALUE
        ? parseInt(DYNAMODB_USER_SESSION_TABLE_TTL_VALUE!)
        : 600,
    })
    .toUnixInteger();

  const input: PutItemCommandInput = {
    TableName: DYNAMODB_USER_SESSION_TABLE,
    Item: marshall({
      sessionId: randomUUID(),
      userId,
      token,
      createdAt: now,
      expiresAt: ttl,
    }),
  };

  const command = new PutItemCommand(input);
  await ddbClient.send(command);
};
