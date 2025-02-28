import { User } from '../entities/user.entity';
import { Gym } from '../entities/gym.entity';
import { Course } from '../entities/course.entity';
import { Exercise } from '../entities/exercise.entity';
import { Training } from '../entities/training.entity';
import { TestUserData, TestGymData, TestCourseData, TestExerciseData, TestTrainingData } from './test.constants';
export declare const createTestUser: (overrides?: Partial<TestUserData>) => Partial<User>;
export declare const createTestGym: (overrides?: Partial<TestGymData>) => Partial<Gym>;
export declare const createTestCourse: (overrides?: Partial<TestCourseData>) => Partial<Course>;
export declare const createTestExercise: (overrides?: Partial<TestExerciseData>) => Partial<Exercise>;
export declare const createTestTraining: (overrides?: Partial<TestTrainingData>) => Partial<Training>;
export declare const mockJwtService: {
    sign: jest.Mock<any, any, any>;
    verify: jest.Mock<any, any, any>;
};
export declare const mockConfigService: {
    get: jest.Mock<string | number, [key: string], any>;
};
export declare const mockRepository: {
    find: jest.Mock<any, any, any>;
    findOne: jest.Mock<any, any, any>;
    save: jest.Mock<any, any, any>;
    create: jest.Mock<any, any, any>;
    update: jest.Mock<any, any, any>;
    delete: jest.Mock<any, any, any>;
    remove: jest.Mock<any, any, any>;
    count: jest.Mock<any, any, any>;
    createQueryBuilder: jest.Mock<{
        where: jest.Mock<any, any, any>;
        andWhere: jest.Mock<any, any, any>;
        orderBy: jest.Mock<any, any, any>;
        skip: jest.Mock<any, any, any>;
        take: jest.Mock<any, any, any>;
        getMany: jest.Mock<any, any, any>;
        getOne: jest.Mock<any, any, any>;
        getManyAndCount: jest.Mock<any, any, any>;
    }, [], any>;
};
export declare const mockRequest: {
    user: Partial<User>;
};
export declare const mockResponse: {
    status: jest.Mock<any, any, any>;
    json: jest.Mock<any, any, any>;
    send: jest.Mock<any, any, any>;
};
