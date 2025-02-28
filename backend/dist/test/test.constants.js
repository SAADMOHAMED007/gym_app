"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TEST_CONFIG = exports.TEST_EXERCISE = void 0;
const user_entity_1 = require("../entities/user.entity");
const exercise_entity_1 = require("../entities/exercise.entity");
exports.TEST_EXERCISE = {
    name: 'Test Exercise',
    description: 'A test exercise',
    type: exercise_entity_1.ExerciseType.CARDIO,
    difficulty: 'beginner',
    equipment: [{ name: 'treadmill' }],
    muscles: 'legs, core',
    instructions: '1. Step 1\n2. Step 2',
};
exports.TEST_CONFIG = {
    JWT_SECRET: 'test-secret',
    JWT_EXPIRES_IN: '1h',
    BCRYPT_ROUNDS: 4,
    DEFAULT_USER: {
        email: 'test@example.com',
        password: 'password123',
        firstName: 'Test',
        lastName: 'User',
        role: user_entity_1.UserRole.CLIENT,
    },
    DEFAULT_ADMIN: {
        email: 'admin@example.com',
        password: 'admin123',
        firstName: 'Admin',
        lastName: 'User',
        role: user_entity_1.UserRole.ADMIN,
    },
    DEFAULT_COACH: {
        email: 'coach@example.com',
        password: 'coach123',
        firstName: 'Coach',
        lastName: 'User',
        role: user_entity_1.UserRole.COACH,
    },
    DEFAULT_CLIENT: {
        email: 'client@example.com',
        password: 'client123',
        firstName: 'Client',
        lastName: 'User',
        role: user_entity_1.UserRole.CLIENT,
    },
};
//# sourceMappingURL=test.constants.js.map