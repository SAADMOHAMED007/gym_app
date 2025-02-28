import { DeepPartial } from 'typeorm';
import { User } from '../entities/user.entity';
import { Gym } from '../entities/gym.entity';
import { Course } from '../entities/course.entity';
import { Exercise } from '../entities/exercise.entity';
import { Training } from '../entities/training.entity';
import { Nutrition } from '../entities/nutrition.entity';
import { Promotion } from '../entities/promotion.entity';
export declare class TestFactory {
    static createUser(override?: DeepPartial<User>): DeepPartial<User>;
    static createGym(override?: DeepPartial<Gym>): DeepPartial<Gym>;
    static createCourse(override?: DeepPartial<Course>): DeepPartial<Course>;
    static createExercise(override?: DeepPartial<Exercise>): DeepPartial<Exercise>;
    static createTraining(override?: DeepPartial<Training>): DeepPartial<Training>;
    static createNutrition(override?: DeepPartial<Nutrition>): DeepPartial<Nutrition>;
    static createPromotion(override?: DeepPartial<Promotion>): DeepPartial<Promotion>;
    static createMany<T>(factory: (override?: DeepPartial<T>) => DeepPartial<T>, count: number, override?: DeepPartial<T>): DeepPartial<T>[];
}
