import { Injectable } from '@nestjs/common';
import { ConfigService as NestConfigService } from '@nestjs/config';
import {
  AppConfig,
  DatabaseConfig,
  JwtConfig,
  CacheConfig,
  CorsConfig,
  SwaggerConfig,
  SecurityConfig,
  UploadConfig,
  EmailConfig,
} from './index';

@Injectable()
export class ConfigService {
  constructor(private configService: NestConfigService) {}

  get isDevelopment(): boolean {
    return this.configService.get('NODE_ENV') === 'development';
  }

  get isProduction(): boolean {
    return this.configService.get('NODE_ENV') === 'production';
  }

  get isTest(): boolean {
    return this.configService.get('NODE_ENV') === 'test';
  }

  get port(): number {
    return this.configService.get<number>('port');
  }

  get database(): DatabaseConfig {
    return this.configService.get<DatabaseConfig>('database');
  }

  get jwt(): JwtConfig {
    return this.configService.get<JwtConfig>('jwt');
  }

  get cache(): CacheConfig {
    return this.configService.get<CacheConfig>('cache');
  }

  get cors(): CorsConfig {
    return this.configService.get<CorsConfig>('cors');
  }

  get swagger(): SwaggerConfig {
    return this.configService.get<SwaggerConfig>('swagger');
  }

  get security(): SecurityConfig {
    return this.configService.get<SecurityConfig>('security');
  }

  get upload(): UploadConfig {
    return this.configService.get<UploadConfig>('upload');
  }

  get email(): EmailConfig {
    return this.configService.get<EmailConfig>('email');
  }

  get<T>(key: keyof AppConfig): T {
    return this.configService.get<T>(key);
  }
}
