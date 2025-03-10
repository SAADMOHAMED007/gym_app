"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const auth_module_1 = require("./modules/auth/auth.module");
const users_module_1 = require("./modules/users/users.module");
const cache_module_1 = require("./modules/cache/cache.module");
const courses_module_1 = require("./modules/courses/courses.module");
const workouts_module_1 = require("./modules/workouts/workouts.module");
const config_module_1 = require("./config/config.module");
const data_source_1 = require("./config/data-source");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_module_1.ConfigModule,
            typeorm_1.TypeOrmModule.forRoot(data_source_1.dataSourceOptions),
            auth_module_1.AuthModule,
            users_module_1.UsersModule,
            cache_module_1.CacheModule,
            courses_module_1.CoursesModule,
            workouts_module_1.WorkoutsModule,
        ],
        providers: [],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map