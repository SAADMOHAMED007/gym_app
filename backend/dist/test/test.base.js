"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestBase = void 0;
const testing_1 = require("@nestjs/testing");
const typeorm_1 = require("typeorm");
const test_database_1 = require("./test.database");
const test_factory_1 = require("./test.factory");
const config_service_1 = require("../config/config.service");
const app_module_1 = require("../app.module");
const test_config_1 = require("./test.config");
class TestBase {
    async beforeAll() {
        this.module = await testing_1.Test.createTestingModule({
            imports: [app_module_1.AppModule],
        })
            .overrideProvider(typeorm_1.Connection)
            .useValue(test_config_1.TEST_DATABASE_CONFIG)
            .compile();
        this.app = this.module.createNestApplication();
        await this.app.init();
        this.databaseService = this.module.get(test_database_1.TestDatabaseService);
        this.configService = this.module.get(config_service_1.ConfigService);
        this.connection = this.databaseService.getDataSource();
    }
    async afterAll() {
        await this.databaseService.cleanDatabase();
        await this.app.close();
    }
    async beforeEach() {
        await this.databaseService.clearAllTables();
    }
    async createTestUser(override = {}) {
        return this.databaseService.createTestData('User', test_factory_1.TestFactory.createUser(override));
    }
    async createTestGym(override = {}) {
        return this.databaseService.createTestData('Gym', test_factory_1.TestFactory.createGym(override));
    }
    async createTestCourse(override = {}) {
        return this.databaseService.createTestData('Course', test_factory_1.TestFactory.createCourse(override));
    }
    async createTestExercise(override = {}) {
        return this.databaseService.createTestData('Exercise', test_factory_1.TestFactory.createExercise(override));
    }
    async createTestTraining(override = {}) {
        return this.databaseService.createTestData('Training', test_factory_1.TestFactory.createTraining(override));
    }
    async createTestNutrition(override = {}) {
        return this.databaseService.createTestData('Nutrition', test_factory_1.TestFactory.createNutrition(override));
    }
    async createTestPromotion(override = {}) {
        return this.databaseService.createTestData('Promotion', test_factory_1.TestFactory.createPromotion(override));
    }
    async createTestUsers(count, override = {}) {
        return this.databaseService.createTestDataInBulk('User', test_factory_1.TestFactory.createMany(test_factory_1.TestFactory.createUser, count, override));
    }
    async createTestGyms(count, override = {}) {
        return this.databaseService.createTestDataInBulk('Gym', test_factory_1.TestFactory.createMany(test_factory_1.TestFactory.createGym, count, override));
    }
    async createTestCourses(count, override = {}) {
        return this.databaseService.createTestDataInBulk('Course', test_factory_1.TestFactory.createMany(test_factory_1.TestFactory.createCourse, count, override));
    }
    async createTestExercises(count, override = {}) {
        return this.databaseService.createTestDataInBulk('Exercise', test_factory_1.TestFactory.createMany(test_factory_1.TestFactory.createExercise, count, override));
    }
    async createTestTrainings(count, override = {}) {
        return this.databaseService.createTestDataInBulk('Training', test_factory_1.TestFactory.createMany(test_factory_1.TestFactory.createTraining, count, override));
    }
    async createTestNutritions(count, override = {}) {
        return this.databaseService.createTestDataInBulk('Nutrition', test_factory_1.TestFactory.createMany(test_factory_1.TestFactory.createNutrition, count, override));
    }
    async createTestPromotions(count, override = {}) {
        return this.databaseService.createTestDataInBulk('Promotion', test_factory_1.TestFactory.createMany(test_factory_1.TestFactory.createPromotion, count, override));
    }
    async expectEntityCount(entity, count) {
        const actualCount = await this.connection
            .getRepository(entity)
            .count();
        expect(actualCount).toBe(count);
    }
    async expectEntityExists(entity, criteria) {
        const exists = await this.connection
            .getRepository(entity)
            .findOne({ where: criteria });
        expect(exists).toBeTruthy();
    }
    async expectEntityNotExists(entity, criteria) {
        const exists = await this.connection
            .getRepository(entity)
            .findOne({ where: criteria });
        expect(exists).toBeFalsy();
    }
}
exports.TestBase = TestBase;
//# sourceMappingURL=test.base.js.map