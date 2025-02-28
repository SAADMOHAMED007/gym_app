"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestModuleFactory = void 0;
const testing_1 = require("@nestjs/testing");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const test_config_1 = require("./test.config");
class TestModuleFactory {
    static async create(options = {}) {
        const { imports = [], providers = [], controllers = [], mockProviders = [], overrideProviders = [], } = options;
        const builder = await this.createTestingModuleBuilder({
            imports: [
                config_1.ConfigModule.forRoot(test_config_1.TEST_CONFIG_MODULE_OPTIONS),
                typeorm_1.TypeOrmModule.forRoot(test_config_1.TEST_DATABASE_CONFIG),
                ...imports,
            ],
            controllers,
            providers: [...providers, ...mockProviders],
        });
        overrideProviders.forEach(([provider, mockImplementation]) => {
            builder.overrideProvider(provider).useValue(mockImplementation);
        });
        return builder.compile();
    }
    static async createTestingModuleBuilder(metadata) {
        return testing_1.Test.createTestingModule(metadata);
    }
    static getProviderMock(type, methodNames) {
        const mock = {};
        methodNames.forEach(methodName => {
            mock[methodName] = jest.fn();
        });
        return mock;
    }
    static createMockRepository() {
        return {
            find: jest.fn(),
            findOne: jest.fn(),
            save: jest.fn(),
            create: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
            remove: jest.fn(),
            count: jest.fn(),
            createQueryBuilder: jest.fn(() => ({
                where: jest.fn().mockReturnThis(),
                andWhere: jest.fn().mockReturnThis(),
                orderBy: jest.fn().mockReturnThis(),
                skip: jest.fn().mockReturnThis(),
                take: jest.fn().mockReturnThis(),
                getMany: jest.fn(),
                getOne: jest.fn(),
                getManyAndCount: jest.fn(),
                leftJoinAndSelect: jest.fn().mockReturnThis(),
                innerJoinAndSelect: jest.fn().mockReturnThis(),
                select: jest.fn().mockReturnThis(),
            })),
        };
    }
    static async createTestingApp(module) {
        const app = module.createNestApplication();
        await app.init();
        return app;
    }
    static async cleanupTestingApp(app) {
        if (app) {
            await app.close();
        }
    }
}
exports.TestModuleFactory = TestModuleFactory;
//# sourceMappingURL=test.module.js.map