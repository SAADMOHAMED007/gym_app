import { UserRole } from '../entities/user.entity';
import { ExerciseType } from '../entities/exercise.entity';
import { TrainingStatus } from '../entities/training.entity';

export interface TestUserData {
  id?: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role?: UserRole;
  isActive?: boolean;
  profilePicture?: string;
}

export interface TestGymData {
  id?: string;
  name: string;
  address: string;
  phone: string;
  email: string;
  description?: string;
}

export interface TestCourseData {
  id?: string;
  name: string;
  description?: string;
  maxParticipants: number;
  price: number;
  schedule: Array<{ day: string; isActive: boolean }>;
}

export interface TestExerciseData {
  id?: string;
  name: string;
  description?: string;
  type: ExerciseType;
  difficulty: string;
  equipment: Array<{ name: string; quantity?: number }>;
  muscles: string;
  instructions?: string;
}

export interface TestTrainingData {
  id?: string;
  userId: string;
  exerciseId: string;
  date: Date;
  duration: number;
  status: TrainingStatus;
  notes?: string;
}

export const TEST_EXERCISE = {
  name: 'Test Exercise',
  description: 'A test exercise',
  type: ExerciseType.CARDIO,
  difficulty: 'beginner',
  equipment: [{ name: 'treadmill' }],
  muscles: 'legs, core',
  instructions: '1. Step 1\n2. Step 2',
};

export const TEST_CONFIG = {
  JWT_SECRET: 'test-secret',
  JWT_EXPIRES_IN: '1h',
  BCRYPT_ROUNDS: 4,
  DEFAULT_USER: {
    email: 'test@example.com',
    password: 'password123',
    firstName: 'Test',
    lastName: 'User',
    role: UserRole.CLIENT,
  },
  DEFAULT_ADMIN: {
    email: 'admin@example.com',
    password: 'admin123',
    firstName: 'Admin',
    lastName: 'User',
    role: UserRole.ADMIN,
  },
  DEFAULT_COACH: {
    email: 'coach@example.com',
    password: 'coach123',
    firstName: 'Coach',
    lastName: 'User',
    role: UserRole.COACH,
  },
  DEFAULT_CLIENT: {
    email: 'client@example.com',
    password: 'client123',
    firstName: 'Client',
    lastName: 'User',
    role: UserRole.CLIENT,
  },
};
