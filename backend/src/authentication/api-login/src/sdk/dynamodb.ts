import {
  ConditionalCheckFailedException,
  DynamoDBClient,
  GetItemCommand,
  GetItemCommandInput,
  PutItemCommand,
  PutItemCommandInput,
} from '@aws-sdk/client-dynamodb';
import { marshall, unmarshall } from '@aws-sdk/util-dynamodb';
import { NodeHttpHandler } from '@smithy/node-http-handler';
import { DateTime } from 'luxon';

import { DynamodbItemNotFoundException } from '../errors/aws';
import { UserDetails } from '../types';

const {
  DDB_CONNECTION_TIMEOUT,
  DDB_REQUEST_TIMEOUT,
  DDB_MAX_ATTEMPT,
  DDB_USER_SESSION_TTL_VALUE,
} = process.env;

let ddbClient: DynamoDBClient = new DynamoDBClient({
  region: process.env.AWS_REGION,
  requestHandler: new NodeHttpHandler({
    connectionTimeout: parseInt(DDB_CONNECTION_TIMEOUT!) || 3000,
    requestTimeout: parseInt(DDB_REQUEST_TIMEOUT!) || 3000,
  }),
  maxAttempts: parseInt(DDB_MAX_ATTEMPT!) || 3,
});

export const getUserDetails = async (email: string) => {
  try {
    const input: GetItemCommandInput = {
      TableName: process.env.DYNAMODB_USER_DETAILS_TABLE,
      Key: marshall({ email }),
    };

    const command = new GetItemCommand(input);
    const output = await ddbClient.send(command);

    if (!output.Item) {
      throw new DynamodbItemNotFoundException('User not found');
    }

    return unmarshall(output.Item) as UserDetails;
  } finally {
    if (ddbClient) {
      ddbClient.destroy();
    }
  }
};

export const putUserSession = async (userId: string, token: string) => {
  try {
    const now = DateTime.now().toISO({ includeOffset: true });
    const ttl = DateTime.utc()
      .plus({
        seconds: DDB_USER_SESSION_TTL_VALUE
          ? parseInt(DDB_USER_SESSION_TTL_VALUE!)
          : 600,
      })
      .toUnixInteger();

    const input: PutItemCommandInput = {
      TableName: process.env.DYNAMODB_USER_SESSION_TABLE,
      Item: marshall({ userId, token, createdAt: now, expiresAt: ttl }),
    };

    const command = new PutItemCommand(input);
    await ddbClient.send(command);
  } finally {
    if (ddbClient) {
      ddbClient.destroy();
    }
  }
};
