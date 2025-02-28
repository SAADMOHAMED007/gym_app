"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validationSchema = void 0;
const Joi = require("joi");
exports.validationSchema = Joi.object({
    NODE_ENV: Joi.string()
        .valid('development', 'production', 'test')
        .default('development'),
    PORT: Joi.number().default(3000),
    DB_HOST: Joi.string().default('localhost'),
    DB_PORT: Joi.number().default(3306),
    DB_USERNAME: Joi.string().required(),
    DB_PASSWORD: Joi.string().required(),
    DB_DATABASE: Joi.string().required(),
    JWT_SECRET: Joi.string().required(),
    JWT_EXPIRES_IN: Joi.string().default('7d'),
    CACHE_TTL: Joi.number().default(300),
    CACHE_MAX_ITEMS: Joi.number().default(100),
    CORS_ORIGIN: Joi.alternatives()
        .try(Joi.string(), Joi.boolean())
        .default(true),
    SWAGGER_ENABLED: Joi.boolean().default(true),
    BCRYPT_SALT_ROUNDS: Joi.number().default(10),
    MAX_FILE_SIZE: Joi.number().default(5 * 1024 * 1024),
    UPLOAD_DESTINATION: Joi.string().default('uploads'),
    EMAIL_HOST: Joi.string().optional(),
    EMAIL_PORT: Joi.number().default(587),
    EMAIL_SECURE: Joi.boolean().default(false),
    EMAIL_USER: Joi.string().optional(),
    EMAIL_PASS: Joi.string().optional(),
    EMAIL_FROM: Joi.string().email().default('noreply@gymapp.com'),
});
//# sourceMappingURL=validation.schema.js.map