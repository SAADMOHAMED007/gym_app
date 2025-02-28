import { SetMetadata } from '@nestjs/common';

export const CACHE_KEY_METADATA = 'cache_module:cache_key';
export const CACHE_TTL_METADATA = 'cache_module:cache_ttl';

export interface CacheOptions {
  key?: string;
  ttl?: number;
}

export const Cache = (options: CacheOptions = {}) => {
  const { key, ttl } = options;
  return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    if (key) {
      SetMetadata(CACHE_KEY_METADATA, key)(target, propertyKey, descriptor);
    }
    if (ttl !== undefined) {
      SetMetadata(CACHE_TTL_METADATA, ttl)(target, propertyKey, descriptor);
    }
    return descriptor;
  };
};

export const CacheKey = (key: string) => SetMetadata(CACHE_KEY_METADATA, key);
export const CacheTTL = (ttl: number) => SetMetadata(CACHE_TTL_METADATA, ttl);

export const NoCache = () => Cache({ ttl: 0 });
