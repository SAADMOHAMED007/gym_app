export declare const VALIDATION_PIPE_OPTIONS: {
    whitelist: boolean;
    transform: boolean;
    forbidNonWhitelisted: boolean;
    transformOptions: {
        enableImplicitConversion: boolean;
    };
};
export declare const SWAGGER_CONFIG: {
    title: string;
    description: string;
    version: string;
    tag: string;
};
export declare const JWT_CONFIG: {
    secret: string;
    expiresIn: string;
};
export declare const DATABASE_CONFIG: {
    type: string;
    host: string;
    port: number;
    username: string;
    password: string;
    database: string;
    synchronize: boolean;
    logging: boolean;
};
export declare const CORS_CONFIG: {
    origin: boolean;
    methods: string;
    credentials: boolean;
};
export declare const BCRYPT_ROUNDS = 10;
export declare const DEFAULT_PAGINATION: {
    page: number;
    limit: number;
};
export declare const FILE_UPLOAD_CONFIG: {
    maxFileSize: number;
    allowedMimeTypes: string[];
    uploadDir: string;
};
export declare const ERROR_MESSAGES: {
    USER_NOT_FOUND: string;
    INVALID_CREDENTIALS: string;
    EMAIL_EXISTS: string;
    UNAUTHORIZED: string;
    FORBIDDEN: string;
    INVALID_TOKEN: string;
    EXPIRED_TOKEN: string;
    INVALID_PASSWORD: string;
    INVALID_EMAIL: string;
    INVALID_FILE_TYPE: string;
    FILE_TOO_LARGE: string;
};
