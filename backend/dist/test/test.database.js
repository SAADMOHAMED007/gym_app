"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestDatabaseService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const user_entity_1 = require("../entities/user.entity");
const gym_entity_1 = require("../entities/gym.entity");
const course_entity_1 = require("../entities/course.entity");
const exercise_entity_1 = require("../entities/exercise.entity");
const training_entity_1 = require("../entities/training.entity");
const nutrition_entity_1 = require("../entities/nutrition.entity");
const promotion_entity_1 = require("../entities/promotion.entity");
let TestDatabaseService = class TestDatabaseService {
    async onModuleInit() {
        this.dataSource = new typeorm_1.DataSource({
            type: 'sqlite',
            database: ':memory:',
            entities: [user_entity_1.User, gym_entity_1.Gym, course_entity_1.Course, exercise_entity_1.Exercise, training_entity_1.Training, nutrition_entity_1.Nutrition, promotion_entity_1.Promotion],
            synchronize: true,
            logging: false,
            dropSchema: true,
        });
        await this.dataSource.initialize();
        this.manager = this.dataSource.manager;
        this.userRepository = this.dataSource.getRepository(user_entity_1.User);
        this.gymRepository = this.dataSource.getRepository(gym_entity_1.Gym);
        this.courseRepository = this.dataSource.getRepository(course_entity_1.Course);
        this.exerciseRepository = this.dataSource.getRepository(exercise_entity_1.Exercise);
        this.trainingRepository = this.dataSource.getRepository(training_entity_1.Training);
        this.nutritionRepository = this.dataSource.getRepository(nutrition_entity_1.Nutrition);
        this.promotionRepository = this.dataSource.getRepository(promotion_entity_1.Promotion);
        await this.dataSource.synchronize(true);
    }
    async onModuleDestroy() {
        if (this.dataSource) {
            await this.dataSource.destroy();
        }
    }
    async cleanDatabase() {
        if (!this.dataSource || !this.dataSource.isInitialized) {
            return;
        }
        await this.dataSource.synchronize(true);
    }
    getUserRepository() {
        return this.userRepository;
    }
    getGymRepository() {
        return this.gymRepository;
    }
    getCourseRepository() {
        return this.courseRepository;
    }
    getExerciseRepository() {
        return this.exerciseRepository;
    }
    getTrainingRepository() {
        return this.trainingRepository;
    }
    getNutritionRepository() {
        return this.nutritionRepository;
    }
    getPromotionRepository() {
        return this.promotionRepository;
    }
    async runInTransaction(operation) {
        return this.manager.transaction(operation);
    }
    async clearTable(entity) {
        await this.manager.clear(entity);
    }
    async clearAllTables() {
        const entities = this.dataSource.entityMetadatas;
        for (const entity of entities) {
            await this.manager.clear(entity.target);
        }
    }
    async createTestData(entity, data) {
        const repository = this.dataSource.getRepository(entity);
        return repository.save(repository.create(data));
    }
    async createTestDataInBulk(entity, dataArray) {
        const repository = this.dataSource.getRepository(entity);
        const entities = dataArray.map(data => repository.create(data));
        return repository.save(entities);
    }
    async removeTestData(entity, condition) {
        const repository = this.dataSource.getRepository(entity);
        const entities = await repository.find({ where: condition });
        return repository.remove(entities);
    }
    async removeAllTestData() {
        await this.clearAllTables();
    }
    async verifyTestData(entity, condition) {
        const repository = this.dataSource.getRepository(entity);
        const count = await repository.count({ where: condition });
        return count > 0;
    }
    async getTestData(entity, condition) {
        const repository = this.dataSource.getRepository(entity);
        return repository.find({ where: condition });
    }
    getDataSource() {
        return this.dataSource;
    }
    getManager() {
        return this.manager;
    }
};
exports.TestDatabaseService = TestDatabaseService;
exports.TestDatabaseService = TestDatabaseService = __decorate([
    (0, common_1.Injectable)()
], TestDatabaseService);
//# sourceMappingURL=test.database.js.map