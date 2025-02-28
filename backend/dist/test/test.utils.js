"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestUtils = void 0;
const testing_1 = require("@nestjs/testing");
const typeorm_1 = require("@nestjs/typeorm");
const config_1 = require("@nestjs/config");
const app_module_1 = require("../app.module");
const test_config_1 = require("./test.config");
const typeorm_2 = require("typeorm");
class TestUtils {
    async initializeApp() {
        this.moduleRef = await testing_1.Test.createTestingModule({
            imports: [
                config_1.ConfigModule.forRoot({
                    isGlobal: true,
                    envFilePath: '.env.test',
                }),
                typeorm_1.TypeOrmModule.forRoot({
                    ...test_config_1.TEST_DATABASE_CONFIG,
                    autoLoadEntities: true,
                }),
                app_module_1.AppModule,
            ],
        }).compile();
        this.app = this.moduleRef.createNestApplication();
        await this.app.init();
        this.dataSource = this.moduleRef.get(typeorm_2.DataSource);
        return this.app;
    }
    getApp() {
        if (!this.app) {
            throw new Error('App not initialized. Call initializeApp() first.');
        }
        return this.app;
    }
    async closeApp() {
        if (this.app) {
            await this.app.close();
        }
    }
    async cleanTestData() {
        if (!this.dataSource) {
            throw new Error('DataSource not initialized. Call initializeApp() first.');
        }
        const entities = this.dataSource.entityMetadatas;
        for (const entity of entities) {
            const repository = this.dataSource.getRepository(entity.name);
            await repository.clear();
        }
    }
    getRepository(entity) {
        if (!this.dataSource) {
            throw new Error('DataSource not initialized. Call initializeApp() first.');
        }
        return this.dataSource.getRepository(entity);
    }
    async clearRepository(entity) {
        const repository = this.getRepository(entity);
        await repository.clear();
    }
}
exports.TestUtils = TestUtils;
//# sourceMappingURL=test.utils.js.map