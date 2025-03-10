import { Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import configuration from './configuration';
import { validationSchema } from './validation.schema';

@Module({
  imports: [
    CacheModule.register({
      isGlobal: true, // Makes CACHE_MANAGER available app-wide
      ttl: 30, // Time-to-live in seconds (adjust as needed)
    }),
    NestConfigModule.forRoot({
      isGlobal: true,
      load: [configuration], // Use your configuration file
      validationSchema,
      validationOptions: {
        allowUnknown: true,
        abortEarly: true,
      },
      expandVariables: true,
      cache: true,
    }),
  ],
  exports: [NestConfigModule, CacheModule], // Export both
})
export class ConfigModule {}
