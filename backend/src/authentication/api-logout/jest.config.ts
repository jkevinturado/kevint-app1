import type { JestConfigWithTsJest } from 'ts-jest';

export default {
  preset: 'ts-jest',
  testEnvironment: 'node',
  silent: true,
  verbose: true,
  collectCoverage: true,
  collectCoverageFrom: ['./src/**/*'],
  coverageThreshold: {
    global: {
      statements: 85,
    },
  },
  //   setupFiles: ['./test/setup.ts'],
} satisfies JestConfigWithTsJest;
