export class InvalidAccessError extends Error {
  constructor(message: string) {
    super(message);

    super.name = 'InvalidAccessError';
  }
}

export class BadRequestError extends Error {
  constructor(message: string) {
    super(message);

    super.name = 'BadRequestError';
  }
}
