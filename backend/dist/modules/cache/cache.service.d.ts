import { Cache } from 'cache-manager';
export declare class CacheService {
    private cacheManager;
    constructor(cacheManager: Cache);
    get<T>(key: string): Promise<T | undefined>;
    set(key: string, value: any, ttl?: number): Promise<void>;
    del(key: string): Promise<void>;
    reset(): Promise<void>;
    wrap<T>(key: string, fn: () => Promise<T>, ttl?: number): Promise<T>;
    generateKey(...args: any[]): string;
    getOrSet<T>(key: string, fn: () => Promise<T>, ttl?: number): Promise<T>;
    invalidatePattern(pattern: string): Promise<void>;
    getMultiple<T>(keys: string[]): Promise<(T | undefined)[]>;
    setMultiple(keyValues: {
        key: string;
        value: any;
    }[], ttl?: number): Promise<void>;
    delMultiple(keys: string[]): Promise<void>;
}
