import { LoginEvent, body } from '../types';

import { InvalidAccessError } from '../errors/auth';

export default class ApiLoginHandler {
  private body: LoginEvent['body'];

  constructor(body: LoginEvent['body']) {
    this.body = body;
  }

  validateCredentials(): body {
    const parsedBody = this.body ? JSON.parse(this.body) : null;

    if (!parsedBody) {
      console.warn('Invalid email or password ');
      throw new InvalidAccessError('Invalid email or password');
    }

    return { email: parsedBody.email, password: parsedBody.password };
  }
}
