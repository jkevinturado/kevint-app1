import {
  SSMClient,
  SSMClientConfig,
  GetParameterCommand,
} from '@aws-sdk/client-ssm';
import { NodeHttpHandler } from '@smithy/node-http-handler';

import { SSMItemNotFoundException } from '../errors/aws';

const {
  ENVIRONMENT,
  LOCALSTACK_ENDPOINT,
  LOCALSTACK_REGION,
  LOCALSTACK_ACCESS_KEY,
  LOCALSTACK_SECRET_KEY,
  SSM_PARAM_STORE_REGION,
  SSM_PARAM_STORE_JWT_SECRET_DATA_API_PATH,
  SSM_PARAM_STORE_CONNECTION_TIMEOUT,
  SSM_PARAM_STORE_REQUEST_TIMEOUT,
  SSM_PARAM_STORE_MAX_ATTEMPTS,
  SSM_PARAM_STORE_MAX_AGE,
} = process.env;

const clientConfig: SSMClientConfig =
  ENVIRONMENT === 'local'
    ? {
        endpoint: LOCALSTACK_ENDPOINT,
        region: LOCALSTACK_REGION,
        credentials: {
          accessKeyId: LOCALSTACK_ACCESS_KEY!,
          secretAccessKey: LOCALSTACK_SECRET_KEY!,
        },
        requestHandler: new NodeHttpHandler({
          connectionTimeout:
            parseInt(SSM_PARAM_STORE_CONNECTION_TIMEOUT!) || 3000,
          requestTimeout: parseInt(SSM_PARAM_STORE_REQUEST_TIMEOUT!) || 3000,
        }),
        maxAttempts: parseInt(SSM_PARAM_STORE_MAX_ATTEMPTS!) || 3,
      }
    : {
        region: SSM_PARAM_STORE_REGION || 'ap-southeast-1',
        requestHandler: new NodeHttpHandler({
          connectionTimeout:
            parseInt(SSM_PARAM_STORE_CONNECTION_TIMEOUT!) || 3000,
          requestTimeout: parseInt(SSM_PARAM_STORE_REQUEST_TIMEOUT!) || 3000,
        }),
        maxAttempts: parseInt(SSM_PARAM_STORE_MAX_ATTEMPTS!) || 3,
      };

const ssmClient: SSMClient = new SSMClient(clientConfig);

// cache variables
let cachedJwtSecretData: string | undefined;
let cacheTimestamp: number | undefined;
const cacheMaxAge: number = SSM_PARAM_STORE_MAX_AGE
  ? parseInt(SSM_PARAM_STORE_MAX_AGE!)
  : 1000;

export const getJwtSecretDataParamPath = async (): Promise<
  string | undefined
> => {
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
  const jwtSecretValue = response.Parameter?.Value;

  if (jwtSecretValue) {
    cachedJwtSecretData = jwtSecretValue;
    cacheTimestamp = now;
  } else {
    throw new SSMItemNotFoundException('Parameter Value not found');
  }

  return jwtSecretValue;
};
