import { SSMClient, GetParameterCommand } from '@aws-sdk/client-ssm';
import { NodeHttpHandler } from '@smithy/node-http-handler';

import { SSMItemNotFoundException } from '../errors/aws';

const {
  AWS_REGION,
  SSM_PARAM_STORE_JWT_SECRET_DATA_API_PATH,
  SSM_PARAM_STORE_CONNECTION_TIMEOUT,
  SSM_PARAM_STORE_REQUEST_TIMEOUT,
  SSM_PARAM_STORE_MAX_ATTEMPTS,
  SSM_PARAM_STORE_MAX_AGE,
} = process.env;

let ssmClient: SSMClient = new SSMClient({
  region: AWS_REGION,
  requestHandler: new NodeHttpHandler({
    connectionTimeout: SSM_PARAM_STORE_CONNECTION_TIMEOUT
      ? parseInt(SSM_PARAM_STORE_CONNECTION_TIMEOUT!)
      : 3000,
    requestTimeout: SSM_PARAM_STORE_REQUEST_TIMEOUT
      ? parseInt(SSM_PARAM_STORE_REQUEST_TIMEOUT!)
      : 3000,
  }),
  maxAttempts: SSM_PARAM_STORE_MAX_ATTEMPTS
    ? parseInt(SSM_PARAM_STORE_MAX_ATTEMPTS!)
    : 3,
});

// cache variables
let cachedJwtSecretData: string | undefined;
let cacheTimestamp: number | undefined;
let cacheMaxAge: number = SSM_PARAM_STORE_MAX_AGE
  ? parseInt(SSM_PARAM_STORE_MAX_AGE!)
  : 1000;

export const getJwtSecretDataParamPath = async (): Promise<
  string | undefined
> => {
  let jwtSecretValue: string | undefined;

  try {
    const now = Date.now();
    if (
      cachedJwtSecretData &&
      cacheTimestamp &&
      now - cacheTimestamp < cacheMaxAge
    ) {
      return cachedJwtSecretData;
    }

    const command = new GetParameterCommand({
      Name: SSM_PARAM_STORE_JWT_SECRET_DATA_API_PATH,
      WithDecryption: true,
    });

    const response = await ssmClient.send(command);
    jwtSecretValue = response.Parameter?.Value;

    if (jwtSecretValue) {
      cachedJwtSecretData = jwtSecretValue;
      cacheTimestamp = now;
    } else {
      throw new SSMItemNotFoundException('Parameter Value not found');
    }

    return jwtSecretValue;
  } finally {
    if (ssmClient) {
      ssmClient.destroy();
    }
  }
};
