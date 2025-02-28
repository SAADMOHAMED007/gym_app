"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ERROR_MESSAGES = exports.FILE_UPLOAD_CONFIG = exports.DEFAULT_PAGINATION = exports.BCRYPT_ROUNDS = exports.CORS_CONFIG = exports.DATABASE_CONFIG = exports.JWT_CONFIG = exports.SWAGGER_CONFIG = exports.VALIDATION_PIPE_OPTIONS = void 0;
exports.VALIDATION_PIPE_OPTIONS = {
    whitelist: true,
    transform: true,
    forbidNonWhitelisted: true,
    transformOptions: {
        enableImplicitConversion: true,
    },
};
exports.SWAGGER_CONFIG = {
    title: 'Gym App API',
    description: 'The Gym Application API documentation',
    version: '1.0',
    tag: 'gym-app',
};
exports.JWT_CONFIG = {
    secret: process.env.JWT_SECRET || 'your-super-secret-key-here',
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
};
exports.DATABASE_CONFIG = {
    type: 'mysql',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT, 10) || 3306,
    username: process.env.DB_USERNAME || 'root',
    password: process.env.DB_PASSWORD || 'root',
    database: process.env.DB_DATABASE || 'gym_app',
    synchronize: process.env.NODE_ENV === 'development',
    logging: process.env.NODE_ENV === 'development',
};
exports.CORS_CONFIG = {
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
};
exports.BCRYPT_ROUNDS = 10;
exports.DEFAULT_PAGINATION = {
    page: 1,
    limit: 10,
};
exports.FILE_UPLOAD_CONFIG = {
    maxFileSize: 5 * 1024 * 1024,
    allowedMimeTypes: ['image/jpeg', 'image/png', 'image/gif'],
    uploadDir: 'uploads',
};
exports.ERROR_MESSAGES = {
    USER_NOT_FOUND: 'User not found',
    INVALID_CREDENTIALS: 'Invalid credentials',
    EMAIL_EXISTS: 'Email already exists',
    UNAUTHORIZED: 'Unauthorized access',
    FORBIDDEN: 'Forbidden access',
    INVALID_TOKEN: 'Invalid token',
    EXPIRED_TOKEN: 'Token has expired',
    INVALID_PASSWORD: 'Invalid password',
    INVALID_EMAIL: 'Invalid email format',
    INVALID_FILE_TYPE: 'Invalid file type',
    FILE_TOO_LARGE: 'File is too large',
};
//# sourceMappingURL=constants.js.map