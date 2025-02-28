import { Module, Global } from '@nestjs/common';
import { CacheModule as NestCacheModule } from '@nestjs/cache-manager';
import { ConfigService } from '@nestjs/config';
import { HttpCacheInterceptor } from '../../common/interceptors/http-cache.interceptor';

@Global()
@Module({
  imports: [
    NestCacheModule.registerAsync({
      useFactory: (configService: ConfigService) => ({
        ttl: configService.get('CACHE_TTL', 300), // 5 minutes default
        max: configService.get('CACHE_MAX_ITEMS', 100), // maximum number of items in cache
        isGlobal: true,
      }),
      inject: [ConfigService],
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
