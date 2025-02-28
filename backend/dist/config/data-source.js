"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dataSourceOptions = void 0;
const typeorm_1 = require("typeorm");
const config_1 = require("@nestjs/config");
const dotenv_1 = require("dotenv");
const user_entity_1 = require("../entities/user.entity");
const gym_entity_1 = require("../entities/gym.entity");
const training_entity_1 = require("../entities/training.entity");
const course_entity_1 = require("../entities/course.entity");
const exercise_entity_1 = require("../entities/exercise.entity");
const nutrition_entity_1 = require("../entities/nutrition.entity");
const promotion_entity_1 = require("../entities/promotion.entity");
(0, dotenv_1.config)();
const configService = new config_1.ConfigService();
exports.dataSourceOptions = {
    type: 'mysql',
    host: configService.get('DB_HOST'),
    port: configService.get('DB_PORT'),
    username: configService.get('DB_USERNAME'),
    password: configService.get('DB_PASSWORD'),
    database: configService.get('DB_DATABASE'),
    entities: [user_entity_1.User, gym_entity_1.Gym, training_entity_1.Training, course_entity_1.Course, exercise_entity_1.Exercise, nutrition_entity_1.Nutrition, promotion_entity_1.Promotion],
    migrations: ['dist/migrations/*.js'],
    synchronize: false,
};
const dataSource = new typeorm_1.DataSource(exports.dataSourceOptions);
exports.default = dataSource;
//# sourceMappingURL=data-source.js.map