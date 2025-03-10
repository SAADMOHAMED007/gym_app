"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CacheModule = void 0;
const common_1 = require("@nestjs/common");
const cache_manager_1 = require("@nestjs/cache-manager");
const config_1 = require("@nestjs/config");
const http_cache_interceptor_1 = require("../../common/interceptors/http-cache.interceptor");
let CacheModule = class CacheModule {
};
exports.CacheModule = CacheModule;
exports.CacheModule = CacheModule = __decorate([
    (0, common_1.Module)({
        imports: [
            cache_manager_1.CacheModule.registerAsync({
                imports: [config_1.ConfigModule],
                inject: [config_1.ConfigService],
                useFactory: (configService) => {
                    const ttl = parseInt(configService.get('CACHE_TTL') || '60', 10);
                    const max = parseInt(configService.get('CACHE_MAX') || '100', 10);
                    return {
                        ttl: ttl > 0 ? ttl : 60,
                        max: max > 0 ? max : 100,
                        isGlobal: true,
                    };
                },
            }),
        ],
        providers: [
            {
                provide: 'CACHE_INTERCEPTOR',
                useClass: http_cache_interceptor_1.HttpCacheInterceptor,
            },
        ],
        exports: [cache_manager_1.CacheModule, 'CACHE_INTERCEPTOR'],
    })
], CacheModule);
//# sourceMappingURL=cache.module.js.map