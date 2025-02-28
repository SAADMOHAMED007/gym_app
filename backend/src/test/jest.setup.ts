import { ConfigModule } from '@nestjs/config';
import { Test } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ValidationPipe } from '@nestjs/common';
import { useContainer } from 'class-validator';
import { AppModule } from '../app.module';

beforeAll(async () => {
  // Create a test module with real providers but mock repositories
  const moduleRef = await Test.createTestingModule({
    imports: [
      ConfigModule.forRoot({
        isGlobal: true,
        envFilePath: '.env.test',
      }),
      TypeOrmModule.forRoot({
        type: 'sqlite',
        database: ':memory:',
        entities: ['./**/*.entity.ts'],
        synchronize: true,
      }),
      AppModule,
    ],
  }).compile();

  const app = moduleRef.createNestApplication();

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

  await app.init();
});

// Clean up after all tests
afterAll(async () => {
  // Any cleanup code here
});

// Reset mocks before each test
beforeEach(() => {
  jest.resetAllMocks();
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

// Global test utilities
global.wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Mock console methods to keep test output clean
global.console = {
  ...console,
  log: jest.fn(),
  info: jest.fn(),
  warn: jest.fn(),
  error: jest.fn(),
};

// Add custom matchers
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
