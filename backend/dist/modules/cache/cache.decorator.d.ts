export declare const CACHE_KEY_METADATA = "cache_module:cache_key";
export declare const CACHE_TTL_METADATA = "cache_module:cache_ttl";
export interface CacheOptions {
    key?: string;
    ttl?: number;
}
export declare const Cache: (options?: CacheOptions) => (target: any, propertyKey: string, descriptor: PropertyDescriptor) => PropertyDescriptor;
export declare const CacheKey: (key: string) => import("@nestjs/common").CustomDecorator<string>;
export declare const CacheTTL: (ttl: number) => import("@nestjs/common").CustomDecorator<string>;
export declare const NoCache: () => (target: any, propertyKey: string, descriptor: PropertyDescriptor) => PropertyDescriptor;
