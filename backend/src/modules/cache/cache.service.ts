import { Injectable, Inject } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
export class CacheService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  async get<T>(key: string): Promise<T | undefined> {
    return this.cacheManager.get<T>(key);
  }

  async set(key: string, value: any, ttl?: number): Promise<void> {
    await this.cacheManager.set(key, value, ttl);
  }

  async del(key: string): Promise<void> {
    await this.cacheManager.del(key);
  }

  async reset(): Promise<void> {
    await this.cacheManager.reset();
  }

  async wrap<T>(
    key: string,
    fn: () => Promise<T>,
    ttl?: number,
  ): Promise<T> {
    const cached = await this.get<T>(key);
    if (cached) {
      return cached;
    }

    const fresh = await fn();
    await this.set(key, fresh, ttl);
    return fresh;
  }

  generateKey(...args: any[]): string {
    return args
      .map(arg => {
        if (typeof arg === 'object') {
          return JSON.stringify(arg);
        }
        return String(arg);
      })
      .join(':');
  }

  async getOrSet<T>(
    key: string,
    fn: () => Promise<T>,
    ttl?: number,
  ): Promise<T> {
    const cached = await this.get<T>(key);
    if (cached) {
      return cached;
    }

    const value = await fn();
    await this.set(key, value, ttl);
    return value;
  }

  async invalidatePattern(pattern: string): Promise<void> {
    const keys = await this.cacheManager.store.keys(pattern);
    await Promise.all(keys.map(key => this.del(key)));
  }

  async getMultiple<T>(keys: string[]): Promise<(T | undefined)[]> {
    return Promise.all(keys.map(key => this.get<T>(key)));
  }

  async setMultiple(keyValues: { key: string; value: any }[], ttl?: number): Promise<void> {
    await Promise.all(
      keyValues.map(({ key, value }) => this.set(key, value, ttl)),
    );
  }

  async delMultiple(keys: string[]): Promise<void> {
    await Promise.all(keys.map(key => this.del(key)));
  }
}
