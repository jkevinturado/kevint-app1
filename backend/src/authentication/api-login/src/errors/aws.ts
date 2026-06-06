export class DynamodbItemNotFoundException extends Error {
  constructor(message: string) {
    super(message);

    super.name = 'DynamodbItemNotFoundException';
  }
}

export class SSMItemNotFoundException extends Error {
  constructor(message: string) {
    super(message);

    super.name = 'SSMItemNotFoundException';
  }
}
