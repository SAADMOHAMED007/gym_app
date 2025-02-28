import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigModuleOptions } from '@nestjs/config';
import { ValidationPipeOptions } from '@nestjs/common';
export declare const TEST_DATABASE_CONFIG: TypeOrmModuleOptions;
export declare const TEST_CONFIG_MODULE_OPTIONS: ConfigModuleOptions;
export declare const TEST_VALIDATION_PIPE_OPTIONS: ValidationPipeOptions;
export declare const TEST_CORS_OPTIONS: {
    origin: boolean;
    methods: string;
    credentials: boolean;
};
export declare const TEST_SWAGGER_OPTIONS: {
    title: string;
    description: string;
    version: string;
    path: string;
};
export declare const TEST_JWT_OPTIONS: {
    secret: string;
    expiresIn: string;
};
export declare const TEST_CACHE_OPTIONS: {
    ttl: number;
    max: number;
};
export declare const TEST_UPLOAD_OPTIONS: {
    dest: string;
    limits: {
        fileSize: number;
    };
};
export declare const TEST_THROTTLE_OPTIONS: {
    ttl: number;
    limit: number;
};
export declare const TEST_TIMEOUT_OPTIONS: {
    timeout: number;
};
export declare const TEST_COMPRESSION_OPTIONS: {
    level: number;
};
export declare const TEST_SECURITY_OPTIONS: {
    bcryptSaltRounds: number;
};
export declare const TEST_LOGGING_OPTIONS: {
    level: string;
};
export declare const TEST_APP_OPTIONS: {
    port: number;
    globalPrefix: string;
    versioning: {
        type: string;
        defaultVersion: string;
    };
};
