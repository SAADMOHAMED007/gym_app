import { ConfigModule } from '@nestjs/config';
import { Test } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ValidationPipe } from '@nestjs/common';
import { useContainer } from 'class-validator';
import { AppModule } from '../app.module';
import { TestUtils } from './test.utils';

// Initialize testUtils as null and assign it in beforeAll
let testUtils: TestUtils | null = null;

beforeAll(async () => {
  // Create new TestUtils instance
  testUtils = new TestUtils();
  await testUtils.initializeApp();
  const app = testUtils.getApp();

  // Enable validation pipe for all tests
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  // Enable dependency injection in validators
  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  // Make test utils available globally after initialization
  (global as any).testUtils = testUtils;
});

afterAll(async () => {
  if (testUtils) {
    await testUtils.closeApp();
    testUtils = null;
    (global as any).testUtils = null;
  }
});

beforeEach(async () => {
  if (testUtils) {
    await testUtils.cleanTestData();
  }
});

// Make test utils available globally
declare global {
  namespace NodeJS {
    interface Global {
      testUtils: TestUtils | null;
    }
  }
}

// Configure Jest matchers
expect.extend({
  toBeWithinRange(received: number, floor: number, ceiling: number) {
    const pass = received >= floor && received <= ceiling;
    if (pass) {
      return {
        message: () =>
          `expected ${received} not to be within range ${floor} - ${ceiling}`,
        pass: true,
      };
    } else {
      return {
        message: () =>
          `expected ${received} to be within range ${floor} - ${ceiling}`,
        pass: false,
      };
    }
  },
});

// Add custom matchers to TypeScript
declare global {
  namespace jest {
    interface Matchers<R> {
      toBeWithinRange(floor: number, ceiling: number): R;
    }
  }
}

// Mock console methods to keep test output clean
const mockConsole = {
  log: jest.fn(),
  info: jest.fn(),
  warn: jest.fn(),
  error: jest.fn(),
  debug: jest.fn(),
};

// Preserve original console methods
const originalConsole = { ...console };

// Replace console methods with mocks for tests
beforeAll(() => {
  global.console = { ...console, ...mockConsole };
});

// Restore original console methods after tests
afterAll(() => {
  global.console = originalConsole;
});

// Reset mocks before each test
beforeEach(() => {
  jest.resetAllMocks();
  Object.values(mockConsole).forEach(mock => mock.mockClear());
});

// Global test environment setup
const originalEnv = process.env;

beforeEach(() => {
  jest.resetModules();
  process.env = { ...originalEnv };
});

afterEach(() => {
  process.env = originalEnv;
});
