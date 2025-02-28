import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Inject,
} from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Cache } from 'cache-manager';

@Injectable()
export class HttpCacheInterceptor implements NestInterceptor {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest();
    const { method, url, query, params } = request;

    // Skip caching for non-GET requests
    if (method !== 'GET') {
      return next.handle();
    }

    // Generate cache key
    const cacheKey = this.generateCacheKey(url, query, params);

    try {
      // Try to get from cache
      const cachedResponse = await this.cacheManager.get(cacheKey);
      if (cachedResponse) {
        return of(cachedResponse);
      }

      // If not in cache, execute handler and cache result
      return next.handle().pipe(
        tap(async response => {
          await this.cacheManager.set(cacheKey, response, 300000); // 5 minutes in milliseconds
        }),
      );
    } catch (error) {
      // If caching fails, just execute handler
      return next.handle();
    }
  }

  private generateCacheKey(
    url: string,
    query: object,
    params: object,
  ): string {
    return `${url}-${JSON.stringify(query)}-${JSON.stringify(params)}`;
  }
}
