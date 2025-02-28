import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigModuleOptions } from '@nestjs/config';
import { ValidationPipeOptions } from '@nestjs/common';
import { User } from '../entities/user.entity';
import { Gym } from '../entities/gym.entity';
import { Course } from '../entities/course.entity';
import { Exercise } from '../entities/exercise.entity';
import { Training } from '../entities/training.entity';
import { Nutrition } from '../entities/nutrition.entity';
import { Promotion } from '../entities/promotion.entity';

export const TEST_DATABASE_CONFIG: TypeOrmModuleOptions = {
  type: 'sqlite',
  database: ':memory:',
  entities: [User, Gym, Course, Exercise, Training, Nutrition, Promotion],
  synchronize: true,
  logging: false,
  dropSchema: true,
};

export const TEST_CONFIG_MODULE_OPTIONS: ConfigModuleOptions = {
  isGlobal: true,
  envFilePath: '.env.test',
  cache: true,
  expandVariables: true,
};

export const TEST_VALIDATION_PIPE_OPTIONS: ValidationPipeOptions = {
  whitelist: true,
  transform: true,
  forbidNonWhitelisted: true,
  transformOptions: {
    enableImplicitConversion: true,
  },
};

export const TEST_CORS_OPTIONS = {
  origin: true,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  credentials: true,
};

export const TEST_SWAGGER_OPTIONS = {
  title: 'Gym App API - Test Environment',
  description: 'API documentation for the test environment',
  version: '1.0',
  path: 'api',
};

export const TEST_JWT_OPTIONS = {
  secret: 'test-jwt-secret',
  expiresIn: '1h',
};

export const TEST_CACHE_OPTIONS = {
  ttl: 60, // 1 minute for tests
  max: 10, // smaller cache size for tests
};

export const TEST_UPLOAD_OPTIONS = {
  dest: './test/uploads',
  limits: {
    fileSize: 1024 * 1024, // 1MB for tests
  },
};

export const TEST_THROTTLE_OPTIONS = {
  ttl: 60,
  limit: 100,
};

export const TEST_TIMEOUT_OPTIONS = {
  timeout: 5000, // 5 seconds for tests
};

export const TEST_COMPRESSION_OPTIONS = {
  level: 1, // fastest compression for tests
};

export const TEST_SECURITY_OPTIONS = {
  bcryptSaltRounds: 1, // faster hashing for tests
};

export const TEST_LOGGING_OPTIONS = {
  level: 'error', // only log errors in tests
};

export const TEST_APP_OPTIONS = {
  port: 0, // random port for tests
  globalPrefix: 'api',
  versioning: {
    type: 'URI',
    defaultVersion: '1',
  },
};
