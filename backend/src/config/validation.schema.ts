import * as Joi from 'joi';

export const validationSchema = Joi.object({
  // Server
  NODE_ENV: Joi.string()
    .valid('development', 'production', 'test')
    .default('development'),
  PORT: Joi.number().default(3000),

  // Database
  DB_HOST: Joi.string().default('localhost'),
  DB_PORT: Joi.number().default(3306),
  DB_USERNAME: Joi.string().required(),
  DB_PASSWORD: Joi.string().required(),
  DB_DATABASE: Joi.string().required(),

  // JWT
  JWT_SECRET: Joi.string().required(),
  JWT_EXPIRES_IN: Joi.string().default('7d'),

  // Cache
  CACHE_TTL: Joi.number().default(300),
  CACHE_MAX_ITEMS: Joi.number().default(100),

  // CORS
  CORS_ORIGIN: Joi.alternatives()
    .try(Joi.string(), Joi.boolean())
    .default(true),

  // Swagger
  SWAGGER_ENABLED: Joi.boolean().default(true),

  // Security
  BCRYPT_SALT_ROUNDS: Joi.number().default(10),

  // Upload
  MAX_FILE_SIZE: Joi.number().default(5 * 1024 * 1024), // 5MB
  UPLOAD_DESTINATION: Joi.string().default('uploads'),

  // Email
  EMAIL_HOST: Joi.string().optional(),
  EMAIL_PORT: Joi.number().default(587),
  EMAIL_SECURE: Joi.boolean().default(false),
  EMAIL_USER: Joi.string().optional(),
  EMAIL_PASS: Joi.string().optional(),
  EMAIL_FROM: Joi.string().email().default('noreply@gymapp.com'),
});
