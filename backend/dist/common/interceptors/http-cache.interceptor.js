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
exports.HttpCacheInterceptor = void 0;
const common_1 = require("@nestjs/common");
const cache_manager_1 = require("@nestjs/cache-manager");
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
let HttpCacheInterceptor = class HttpCacheInterceptor {
    constructor(cacheManager) {
        this.cacheManager = cacheManager;
    }
    async intercept(context, next) {
        const request = context.switchToHttp().getRequest();
        const { method, url, query, params } = request;
        if (method !== 'GET') {
            return next.handle();
        }
        const cacheKey = this.generateCacheKey(url, query, params);
        try {
            const cachedResponse = await this.cacheManager.get(cacheKey);
            if (cachedResponse) {
                return (0, rxjs_1.of)(cachedResponse);
            }
            return next.handle().pipe((0, operators_1.tap)(async (response) => {
                await this.cacheManager.set(cacheKey, response, 300000);
            }));
        }
        catch (error) {
            return next.handle();
        }
    }
    generateCacheKey(url, query, params) {
        return `${url}-${JSON.stringify(query)}-${JSON.stringify(params)}`;
    }
};
exports.HttpCacheInterceptor = HttpCacheInterceptor;
exports.HttpCacheInterceptor = HttpCacheInterceptor = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(cache_manager_1.CACHE_MANAGER)),
    __metadata("design:paramtypes", [Object])
], HttpCacheInterceptor);
//# sourceMappingURL=http-cache.interceptor.js.map