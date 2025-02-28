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
    schedule: Array<{
        day: string;
        isActive: boolean;
    }>;
}
export interface TestExerciseData {
    id?: string;
    name: string;
    description?: string;
    type: ExerciseType;
    difficulty: string;
    equipment: Array<{
        name: string;
        quantity?: number;
    }>;
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
export declare const TEST_EXERCISE: {
    name: string;
    description: string;
    type: ExerciseType;
    difficulty: string;
    equipment: {
        name: string;
    }[];
    muscles: string;
    instructions: string;
};
export declare const TEST_CONFIG: {
    JWT_SECRET: string;
    JWT_EXPIRES_IN: string;
    BCRYPT_ROUNDS: number;
    DEFAULT_USER: {
        email: string;
        password: string;
        firstName: string;
        lastName: string;
        role: UserRole;
    };
    DEFAULT_ADMIN: {
        email: string;
        password: string;
        firstName: string;
        lastName: string;
        role: UserRole;
    };
    DEFAULT_COACH: {
        email: string;
        password: string;
        firstName: string;
        lastName: string;
        role: UserRole;
    };
    DEFAULT_CLIENT: {
        email: string;
        password: string;
        firstName: string;
        lastName: string;
        role: UserRole;
    };
};
