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
var TestDatabaseModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestDatabaseModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const config_1 = require("@nestjs/config");
const test_database_1 = require("./test.database");
const user_entity_1 = require("../entities/user.entity");
const gym_entity_1 = require("../entities/gym.entity");
const course_entity_1 = require("../entities/course.entity");
const exercise_entity_1 = require("../entities/exercise.entity");
const training_entity_1 = require("../entities/training.entity");
const nutrition_entity_1 = require("../entities/nutrition.entity");
const promotion_entity_1 = require("../entities/promotion.entity");
const test_config_1 = require("./test.config");
const entities = [
    user_entity_1.User,
    gym_entity_1.Gym,
    course_entity_1.Course,
    exercise_entity_1.Exercise,
    training_entity_1.Training,
    nutrition_entity_1.Nutrition,
    promotion_entity_1.Promotion,
];
let TestDatabaseModule = TestDatabaseModule_1 = class TestDatabaseModule {
    static forRoot() {
        return {
            module: TestDatabaseModule_1,
            imports: [config_1.ConfigModule],
            global: true,
            providers: [
                {
                    provide: test_database_1.TestDatabaseService,
                    useFactory: async (configService) => {
                        const service = new test_database_1.TestDatabaseService();
                        await service.onModuleInit();
                        return service;
                    },
                    inject: [config_1.ConfigService],
                },
            ],
            exports: [test_database_1.TestDatabaseService],
        };
    }
    static forFeature(customEntities = []) {
        return {
            module: TestDatabaseModule_1,
            imports: [typeorm_1.TypeOrmModule.forFeature([...entities, ...customEntities])],
            exports: [typeorm_1.TypeOrmModule],
        };
    }
    static forRepository(entity) {
        return {
            module: TestDatabaseModule_1,
            imports: [typeorm_1.TypeOrmModule.forFeature([entity])],
            exports: [typeorm_1.TypeOrmModule],
        };
    }
    static async forTest() {
        const databaseProvider = {
            provide: test_database_1.TestDatabaseService,
            useFactory: async () => {
                const service = new test_database_1.TestDatabaseService();
                await service.onModuleInit();
                return service;
            },
        };
        return {
            module: TestDatabaseModule_1,
            imports: [
                typeorm_1.TypeOrmModule.forRoot(test_config_1.TEST_DATABASE_CONFIG),
                typeorm_1.TypeOrmModule.forFeature(entities),
            ],
            providers: [databaseProvider],
            exports: [databaseProvider, typeorm_1.TypeOrmModule],
            global: true,
        };
    }
    constructor(databaseService) {
        this.databaseService = databaseService;
    }
    async onModuleDestroy() {
        await this.databaseService.onModuleDestroy();
    }
};
exports.TestDatabaseModule = TestDatabaseModule;
exports.TestDatabaseModule = TestDatabaseModule = TestDatabaseModule_1 = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forRoot(test_config_1.TEST_DATABASE_CONFIG),
            typeorm_1.TypeOrmModule.forFeature(entities),
            config_1.ConfigModule,
        ],
        providers: [
            {
                provide: test_database_1.TestDatabaseService,
                useFactory: async (configService) => {
                    const service = new test_database_1.TestDatabaseService();
                    await service.onModuleInit();
                    return service;
                },
                inject: [config_1.ConfigService],
            },
        ],
        exports: [test_database_1.TestDatabaseService, typeorm_1.TypeOrmModule],
    }),
    __metadata("design:paramtypes", [test_database_1.TestDatabaseService])
], TestDatabaseModule);
//# sourceMappingURL=test.database.module.js.map