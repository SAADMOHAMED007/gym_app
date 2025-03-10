import { Module } from '@nestjs/common';
import { CacheModule as NestCacheModule } from '@nestjs/cache-manager';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { HttpCacheInterceptor } from '../../common/interceptors/http-cache.interceptor';

@Module({
  imports: [
    NestCacheModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const ttl = parseInt(configService.get<string>('CACHE_TTL') || '60', 10);
        const max = parseInt(configService.get<string>('CACHE_MAX') || '100', 10);
        
        // Ensure both values are positive integers
        return {
          ttl: ttl > 0 ? ttl : 60,  // Default to 60 seconds if invalid
          max: max > 0 ? max : 100, // Default to 100 items if invalid
          isGlobal: true,
        };
      },
    }),
  ],
  providers: [
    {
      provide: 'CACHE_INTERCEPTOR',
      useClass: HttpCacheInterceptor,
    },
  ],
  exports: [NestCacheModule, 'CACHE_INTERCEPTOR'],
})
export class CacheModule {}
