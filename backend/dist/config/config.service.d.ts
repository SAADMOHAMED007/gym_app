import { ConfigService as NestConfigService } from '@nestjs/config';
import { AppConfig, DatabaseConfig, JwtConfig, CacheConfig, CorsConfig, SwaggerConfig, SecurityConfig, UploadConfig, EmailConfig } from './index';
export declare class ConfigService {
    private configService;
    constructor(configService: NestConfigService);
    get isDevelopment(): boolean;
    get isProduction(): boolean;
    get isTest(): boolean;
    get port(): number;
    get database(): DatabaseConfig;
    get jwt(): JwtConfig;
    get cache(): CacheConfig;
    get cors(): CorsConfig;
    get swagger(): SwaggerConfig;
    get security(): SecurityConfig;
    get upload(): UploadConfig;
    get email(): EmailConfig;
    get<T>(key: keyof AppConfig): T;
}
