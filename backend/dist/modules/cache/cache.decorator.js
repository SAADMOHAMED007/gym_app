"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NoCache = exports.CacheTTL = exports.CacheKey = exports.Cache = exports.CACHE_TTL_METADATA = exports.CACHE_KEY_METADATA = void 0;
const common_1 = require("@nestjs/common");
exports.CACHE_KEY_METADATA = 'cache_module:cache_key';
exports.CACHE_TTL_METADATA = 'cache_module:cache_ttl';
const Cache = (options = {}) => {
    const { key, ttl } = options;
    return (target, propertyKey, descriptor) => {
        if (key) {
            (0, common_1.SetMetadata)(exports.CACHE_KEY_METADATA, key)(target, propertyKey, descriptor);
        }
        if (ttl !== undefined) {
            (0, common_1.SetMetadata)(exports.CACHE_TTL_METADATA, ttl)(target, propertyKey, descriptor);
        }
        return descriptor;
    };
};
exports.Cache = Cache;
const CacheKey = (key) => (0, common_1.SetMetadata)(exports.CACHE_KEY_METADATA, key);
exports.CacheKey = CacheKey;
const CacheTTL = (ttl) => (0, common_1.SetMetadata)(exports.CACHE_TTL_METADATA, ttl);
exports.CacheTTL = CacheTTL;
const NoCache = () => (0, exports.Cache)({ ttl: 0 });
exports.NoCache = NoCache;
//# sourceMappingURL=cache.decorator.js.map