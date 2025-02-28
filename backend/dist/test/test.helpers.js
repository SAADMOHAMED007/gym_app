"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mockResponse = exports.mockRequest = exports.mockRepository = exports.mockConfigService = exports.mockJwtService = exports.createTestTraining = exports.createTestExercise = exports.createTestCourse = exports.createTestGym = exports.createTestUser = void 0;
const training_entity_1 = require("../entities/training.entity");
const test_constants_1 = require("./test.constants");
const createTestUser = (overrides = {}) => ({
    id: 'test-user-id',
    ...test_constants_1.TEST_CONFIG.DEFAULT_USER,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    ...overrides,
});
exports.createTestUser = createTestUser;
const createTestGym = (overrides = {}) => ({
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
exports.createTestGym = createTestGym;
const createTestCourse = (overrides = {}) => ({
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
exports.createTestCourse = createTestCourse;
const createTestExercise = (overrides = {}) => ({
    id: 'test-exercise-id',
    ...test_constants_1.TEST_EXERCISE,
    createdAt: new Date(),
    updatedAt: new Date(),
    ...overrides,
});
exports.createTestExercise = createTestExercise;
const createTestTraining = (overrides = {}) => ({
    id: 'test-training-id',
    userId: 'test-user-id',
    exerciseId: 'test-exercise-id',
    date: new Date(),
    duration: 60,
    status: training_entity_1.TrainingStatus.SCHEDULED,
    notes: 'Test notes',
    createdAt: new Date(),
    updatedAt: new Date(),
    ...overrides,
});
exports.createTestTraining = createTestTraining;
exports.mockJwtService = {
    sign: jest.fn().mockReturnValue('mock-jwt-token'),
    verify: jest.fn().mockReturnValue({ sub: 'test-user-id' }),
};
exports.mockConfigService = {
    get: jest.fn((key) => {
        const config = {
            'jwt.secret': test_constants_1.TEST_CONFIG.JWT_SECRET,
            'jwt.expiresIn': test_constants_1.TEST_CONFIG.JWT_EXPIRES_IN,
            'database.host': 'localhost',
            'database.port': 5432,
            'database.username': 'test',
            'database.password': 'test',
            'database.database': 'test_db',
        };
        return config[key];
    }),
};
exports.mockRepository = {
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
exports.mockRequest = {
    user: (0, exports.createTestUser)(),
};
exports.mockResponse = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn().mockReturnThis(),
    send: jest.fn().mockReturnThis(),
};
//# sourceMappingURL=test.helpers.js.map