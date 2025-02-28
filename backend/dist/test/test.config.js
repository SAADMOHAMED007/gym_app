"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TEST_APP_OPTIONS = exports.TEST_LOGGING_OPTIONS = exports.TEST_SECURITY_OPTIONS = exports.TEST_COMPRESSION_OPTIONS = exports.TEST_TIMEOUT_OPTIONS = exports.TEST_THROTTLE_OPTIONS = exports.TEST_UPLOAD_OPTIONS = exports.TEST_CACHE_OPTIONS = exports.TEST_JWT_OPTIONS = exports.TEST_SWAGGER_OPTIONS = exports.TEST_CORS_OPTIONS = exports.TEST_VALIDATION_PIPE_OPTIONS = exports.TEST_CONFIG_MODULE_OPTIONS = exports.TEST_DATABASE_CONFIG = void 0;
const user_entity_1 = require("../entities/user.entity");
const gym_entity_1 = require("../entities/gym.entity");
const course_entity_1 = require("../entities/course.entity");
const exercise_entity_1 = require("../entities/exercise.entity");
const training_entity_1 = require("../entities/training.entity");
const nutrition_entity_1 = require("../entities/nutrition.entity");
const promotion_entity_1 = require("../entities/promotion.entity");
exports.TEST_DATABASE_CONFIG = {
    type: 'sqlite',
    database: ':memory:',
    entities: [user_entity_1.User, gym_entity_1.Gym, course_entity_1.Course, exercise_entity_1.Exercise, training_entity_1.Training, nutrition_entity_1.Nutrition, promotion_entity_1.Promotion],
    synchronize: true,
    logging: false,
    dropSchema: true,
};
exports.TEST_CONFIG_MODULE_OPTIONS = {
    isGlobal: true,
    envFilePath: '.env.test',
    cache: true,
    expandVariables: true,
};
exports.TEST_VALIDATION_PIPE_OPTIONS = {
    whitelist: true,
    transform: true,
    forbidNonWhitelisted: true,
    transformOptions: {
        enableImplicitConversion: true,
    },
};
exports.TEST_CORS_OPTIONS = {
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
};
exports.TEST_SWAGGER_OPTIONS = {
    title: 'Gym App API - Test Environment',
    description: 'API documentation for the test environment',
    version: '1.0',
    path: 'api',
};
exports.TEST_JWT_OPTIONS = {
    secret: 'test-jwt-secret',
    expiresIn: '1h',
};
exports.TEST_CACHE_OPTIONS = {
    ttl: 60,
    max: 10,
};
exports.TEST_UPLOAD_OPTIONS = {
    dest: './test/uploads',
    limits: {
        fileSize: 1024 * 1024,
    },
};
exports.TEST_THROTTLE_OPTIONS = {
    ttl: 60,
    limit: 100,
};
exports.TEST_TIMEOUT_OPTIONS = {
    timeout: 5000,
};
exports.TEST_COMPRESSION_OPTIONS = {
    level: 1,
};
exports.TEST_SECURITY_OPTIONS = {
    bcryptSaltRounds: 1,
};
exports.TEST_LOGGING_OPTIONS = {
    level: 'error',
};
exports.TEST_APP_OPTIONS = {
    port: 0,
    globalPrefix: 'api',
    versioning: {
        type: 'URI',
        defaultVersion: '1',
    },
};
//# sourceMappingURL=test.config.js.map