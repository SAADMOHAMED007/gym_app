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
const cache_manager_1 = require("@nestjs/cache-manager");
const app_module_1 = require("./config/app.module");
const config_service_1 = require("./config/config.service");
const auth_1 = require("./modules/auth");
const users_1 = require("./modules/users");
const user_entity_1 = require("./entities/user.entity");
const gym_entity_1 = require("./entities/gym.entity");
const course_entity_1 = require("./entities/course.entity");
const exercise_entity_1 = require("./entities/exercise.entity");
const training_entity_1 = require("./entities/training.entity");
const nutrition_entity_1 = require("./entities/nutrition.entity");
const promotion_entity_1 = require("./entities/promotion.entity");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            app_module_1.AppConfigModule,
            typeorm_1.TypeOrmModule.forRootAsync({
                imports: [app_module_1.AppConfigModule],
                useFactory: (configService) => ({
                    type: 'mysql',
                    host: configService.database.host,
                    port: configService.database.port,
                    username: configService.database.username,
                    password: configService.database.password,
                    database: configService.database.database,
                    entities: [user_entity_1.User, gym_entity_1.Gym, course_entity_1.Course, exercise_entity_1.Exercise, training_entity_1.Training, nutrition_entity_1.Nutrition, promotion_entity_1.Promotion],
                    synchronize: configService.isDevelopment,
                    logging: configService.isDevelopment,
                }),
                inject: [config_service_1.ConfigService],
            }),
            cache_manager_1.CacheModule.registerAsync({
                isGlobal: true,
                imports: [app_module_1.AppConfigModule],
                useFactory: (configService) => ({
                    ttl: configService.cache.ttl,
                    max: configService.cache.max,
                }),
                inject: [config_service_1.ConfigService],
            }),
            auth_1.AuthModule,
            users_1.UsersModule,
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map