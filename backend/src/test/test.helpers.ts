import { User } from '../entities/user.entity';
import { Gym } from '../entities/gym.entity';
import { Course } from '../entities/course.entity';
import { Exercise } from '../entities/exercise.entity';
import { Training, TrainingStatus } from '../entities/training.entity';
import {
  TestUserData,
  TestGymData,
  TestCourseData,
  TestExerciseData,
  TestTrainingData,
  TEST_CONFIG,
  TEST_EXERCISE,
} from './test.constants';

export const createTestUser = (overrides: Partial<TestUserData> = {}): Partial<User> => ({
  id: 'test-user-id',
  ...TEST_CONFIG.DEFAULT_USER,
  isActive: true,
  createdAt: new Date(),
  updatedAt: new Date(),
  ...overrides,
});

export const createTestGym = (overrides: Partial<TestGymData> = {}): Partial<Gym> => ({
  id: 'test-gym-id',
  name: 'Test Gym',
  address: '123 Test St',
  phone: '123-456-7890',
  email: 'gym@example.com',
  description: 'A test gym',
  createdAt: new Date(),
  updatedAt: new Date(),
  ...overrides,
});

export const createTestCourse = (overrides: Partial<TestCourseData> = {}): Partial<Course> => ({
  id: 'test-course-id',
  name: 'Test Course',
  description: 'A test course',
  maxParticipants: 10,
  price: 100,
  schedule: [{ day: 'Monday', isActive: true }],
  createdAt: new Date(),
  updatedAt: new Date(),
  ...overrides,
});

export const createTestExercise = (overrides: Partial<TestExerciseData> = {}): Partial<Exercise> => ({
  id: 'test-exercise-id',
  ...TEST_EXERCISE,
  createdAt: new Date(),
  updatedAt: new Date(),
  ...overrides,
});

export const createTestTraining = (overrides: Partial<TestTrainingData> = {}): Partial<Training> => ({
  id: 'test-training-id',
  userId: 'test-user-id',
  exerciseId: 'test-exercise-id',
  date: new Date(),
  duration: 60,
  status: TrainingStatus.SCHEDULED,
  notes: 'Test notes',
  createdAt: new Date(),
  updatedAt: new Date(),
  ...overrides,
});

export const mockJwtService = {
  sign: jest.fn().mockReturnValue('mock-jwt-token'),
  verify: jest.fn().mockReturnValue({ sub: 'test-user-id' }),
};

export const mockConfigService = {
  get: jest.fn((key: string) => {
    const config = {
      'jwt.secret': TEST_CONFIG.JWT_SECRET,
      'jwt.expiresIn': TEST_CONFIG.JWT_EXPIRES_IN,
      'database.host': 'localhost',
      'database.port': 5432,
      'database.username': 'test',
      'database.password': 'test',
      'database.database': 'test_db',
    };
    return config[key as keyof typeof config];
  }),
};

export const mockRepository = {
  find: jest.fn(),
  findOne: jest.fn(),
  save: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
  remove: jest.fn(),
  count: jest.fn(),
  createQueryBuilder: jest.fn(() => ({
    where: jest.fn().mockReturnThis(),
    andWhere: jest.fn().mockReturnThis(),
    orderBy: jest.fn().mockReturnThis(),
    skip: jest.fn().mockReturnThis(),
    take: jest.fn().mockReturnThis(),
    getMany: jest.fn(),
    getOne: jest.fn(),
    getManyAndCount: jest.fn(),
  })),
};

export const mockRequest = {
  user: createTestUser(),
};

export const mockResponse = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn().mockReturnThis(),
  send: jest.fn().mockReturnThis(),
};
