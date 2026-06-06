import bcryptjs from 'bcryptjs';
import * as jwt from 'jsonwebtoken';

import { LoginEvent } from '../types';

import { getUserDetails, putUserSession } from '../sdk/dynamodb';
import { getJwtSecretDataParamPath } from '../sdk/ssm';

import { InvalidAccessError, BadRequestError } from '../errors/';

export default class ApiLoginHandler {
  private body: LoginEvent['body'];
  private email: string;
  private password: string;
  private userId: string;

  constructor(body: LoginEvent['body']) {
    this.body = body;
    this.email = '';
    this.password = '';
    this.userId = '';
  }

  private validateCredentials() {
    console.info('Validating login credentials');
    if (!this.body) {
      console.warn('Missing request body');
      throw new BadRequestError('Missing request body');
    }

    try {
      const parsedBody = this.body ? JSON.parse(this.body) : null;
      if (!parsedBody) {
        console.warn('Invalid email or password');
        throw new InvalidAccessError('Invalid email or password');
      }

      this.email = parsedBody.email;
      this.password = parsedBody.password;
    } catch {
      console.warn('Invalid request body format');
      throw new BadRequestError('Invalid request body format');
    }

    if (!this.email || !this.password) {
      console.warn('Email and password are required');
      throw new BadRequestError('Email and password are required');
    }
  }

  private async authenticateUser() {
    console.info('Authenticating user');

    const userDetails = await getUserDetails(this.email);

    const passwordMatch = await bcryptjs.compare(
      this.password,
      userDetails.password,
    );
    if (!passwordMatch) {
      console.warn('Authentication failed, Invalid password.');
      throw new InvalidAccessError('Unauthorized: Invalid email or password');
    }

    this.userId = userDetails.userId;
  }

  private async generateToken() {
    console.info('Generating JWT token');
    const jwtSecretData = await getJwtSecretDataParamPath();
    if (!jwtSecretData) {
      console.warn('Failed to retrieve JWT secret data.');
      throw new Error('Failed to retrieve JWT secret data.');
    }

    const token = jwt.sign({ userId: this.userId }, jwtSecretData, {
      expiresIn: '1h',
    });
    await putUserSession(this.userId, token);
  }

  async execute() {
    this.validateCredentials();
    await this.authenticateUser();
    await this.generateToken();
  }
}
