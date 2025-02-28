export * from './app.module';
export * from './app.config';
export * from './config.service';
export * from './validation.schema';

export interface DatabaseConfig {
  type: string;
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
  synchronize: boolean;
  logging: boolean;
}

export interface JwtConfig {
  secret: string;
  expiresIn: string;
}

export interface CacheConfig {
  ttl: number;
  max: number;
}

export interface CorsConfig {
  enabled: boolean;
  origin: boolean | string;
  credentials: boolean;
}

export interface SwaggerConfig {
  enabled: boolean;
  title: string;
  description: string;
  version: string;
  path: string;
}

export interface SecurityConfig {
  bcryptSaltRounds: number;
}

export interface UploadConfig {
  maxFileSize: number;
  destination: string;
}

export interface EmailConfig {
  host?: string;
  port: number;
  secure: boolean;
  auth: {
    user?: string;
    pass?: string;
  };
  from: string;
}

export interface AppConfig {
  port: number;
  database: DatabaseConfig;
  jwt: JwtConfig;
  cache: CacheConfig;
  cors: CorsConfig;
  swagger: SwaggerConfig;
  security: SecurityConfig;
  upload: UploadConfig;
  email: EmailConfig;
}
