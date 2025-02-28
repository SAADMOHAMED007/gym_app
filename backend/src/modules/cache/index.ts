export * from './cache.module';
export * from './cache.service';
export * from './cache.decorator';

// Re-export cache-related constants and types
export const CACHE_DEFAULT_TTL = 300; // 5 minutes
export const CACHE_DEFAULT_MAX_ITEMS = 100;

export interface CacheConfig {
  ttl?: number;
  max?: number;
  isGlobal?: boolean;
}

export interface CacheEntry<T = any> {
  key: string;
  value: T;
  ttl?: number;
}
