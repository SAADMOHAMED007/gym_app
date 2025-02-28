"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CacheService = void 0;
const common_1 = require("@nestjs/common");
const cache_manager_1 = require("@nestjs/cache-manager");
let CacheService = class CacheService {
    constructor(cacheManager) {
        this.cacheManager = cacheManager;
    }
    async get(key) {
        return this.cacheManager.get(key);
    }
    async set(key, value, ttl) {
        await this.cacheManager.set(key, value, ttl);
    }
    async del(key) {
        await this.cacheManager.del(key);
    }
    async reset() {
        await this.cacheManager.reset();
    }
    async wrap(key, fn, ttl) {
        const cached = await this.get(key);
        if (cached) {
            return cached;
        }
        const fresh = await fn();
        await this.set(key, fresh, ttl);
        return fresh;
    }
    generateKey(...args) {
        return args
            .map(arg => {
            if (typeof arg === 'object') {
                return JSON.stringify(arg);
            }
            return String(arg);
        })
            .join(':');
    }
    async getOrSet(key, fn, ttl) {
        const cached = await this.get(key);
        if (cached) {
            return cached;
        }
        const value = await fn();
        await this.set(key, value, ttl);
        return value;
    }
    async invalidatePattern(pattern) {
        const keys = await this.cacheManager.store.keys(pattern);
        await Promise.all(keys.map(key => this.del(key)));
    }
    async getMultiple(keys) {
        return Promise.all(keys.map(key => this.get(key)));
    }
    async setMultiple(keyValues, ttl) {
        await Promise.all(keyValues.map(({ key, value }) => this.set(key, value, ttl)));
    }
    async delMultiple(keys) {
        await Promise.all(keys.map(key => this.del(key)));
    }
};
exports.CacheService = CacheService;
exports.CacheService = CacheService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(cache_manager_1.CACHE_MANAGER)),
    __metadata("design:paramtypes", [Object])
], CacheService);
//# sourceMappingURL=cache.service.js.map