declare const _default: () => {
    port: number;
    database: {
        type: string;
        host: string;
        port: number;
        username: string;
        password: string;
        database: string;
        synchronize: boolean;
        logging: boolean;
    };
    jwt: {
        secret: string;
        expiresIn: string;
    };
    cache: {
        ttl: number;
        max: number;
    };
    cors: {
        enabled: boolean;
        origin: string | boolean;
        credentials: boolean;
    };
    swagger: {
        enabled: boolean;
        title: string;
        description: string;
        version: string;
        path: string;
    };
    security: {
        bcryptSaltRounds: number;
    };
    upload: {
        maxFileSize: number;
        destination: string;
    };
    email: {
        host: string;
        port: number;
        secure: boolean;
        auth: {
            user: string;
            pass: string;
        };
        from: string;
    };
};
export default _default;
