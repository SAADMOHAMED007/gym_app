"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestFactory = void 0;
const user_entity_1 = require("../entities/user.entity");
const course_entity_1 = require("../entities/course.entity");
const exercise_entity_1 = require("../entities/exercise.entity");
const training_entity_1 = require("../entities/training.entity");
const nutrition_entity_1 = require("../entities/nutrition.entity");
const promotion_entity_1 = require("../entities/promotion.entity");
class TestFactory {
    static createUser(override = {}) {
        return {
            email: `test-${Date.now()}@example.com`,
            password: 'password123',
            firstName: 'Test',
            lastName: 'User',
            role: user_entity_1.UserRole.CLIENT,
            isActive: true,
            createdAt: new Date(),
            updatedAt: new Date(),
            ...override,
        };
    }
    static createGym(override = {}) {
        return {
            name: `Test Gym ${Date.now()}`,
            address: '123 Test Street',
            email: `gym-${Date.now()}@example.com`,
            phone: '123-456-7890',
            description: 'A test gym',
            createdAt: new Date(),
            updatedAt: new Date(),
            ...override,
        };
    }
    static createCourse(override = {}) {
        return {
            name: `Test Course ${Date.now()}`,
            description: 'A test course',
            type: course_entity_1.CourseType.GROUP,
            level: course_entity_1.CourseLevel.BEGINNER,
            capacity: 10,
            price: 100,
            startTime: '09:00',
            endTime: '10:00',
            schedule: [{ day: 'Monday', isActive: true }],
            createdAt: new Date(),
            updatedAt: new Date(),
            ...override,
        };
    }
    static createExercise(override = {}) {
        return {
            name: `Test Exercise ${Date.now()}`,
            description: 'A test exercise',
            type: exercise_entity_1.ExerciseType.CARDIO,
            level: exercise_entity_1.ExerciseLevel.BEGINNER,
            primaryMuscleGroup: exercise_entity_1.MuscleGroup.LEGS,
            secondaryMuscleGroups: [exercise_entity_1.MuscleGroup.CORE],
            equipment: [{ name: 'treadmill' }],
            instructions: 'Step 1: Start\nStep 2: Exercise\nStep 3: Cool down',
            createdAt: new Date(),
            updatedAt: new Date(),
            ...override,
        };
    }
    static createTraining(override = {}) {
        return {
            clientId: 'test-client-id',
            coachId: 'test-coach-id',
            courseId: 'test-course-id',
            status: training_entity_1.TrainingStatus.SCHEDULED,
            scheduledDate: new Date(),
            completedAt: undefined,
            notes: 'Test training session',
            createdAt: new Date(),
            updatedAt: new Date(),
            ...override,
        };
    }
    static createNutrition(override = {}) {
        return {
            name: 'Test Nutrition Plan',
            description: 'A test nutrition plan',
            dietType: nutrition_entity_1.DietType.REGULAR,
            meals: [
                {
                    type: nutrition_entity_1.MealType.BREAKFAST,
                    name: 'Test Breakfast',
                    time: '08:00',
                    foods: [{ name: 'Oatmeal', quantity: 1, calories: 150 }],
                },
            ],
            createdAt: new Date(),
            updatedAt: new Date(),
            ...override,
        };
    }
    static createPromotion(override = {}) {
        return {
            name: `Test Promotion ${Date.now()}`,
            description: 'A test promotion',
            type: promotion_entity_1.PromotionType.DISCOUNT,
            value: 20,
            isPercentage: true,
            startDate: new Date(),
            endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
            conditions: {
                minPurchaseAmount: 100,
                maxUsageCount: 100,
                membershipDuration: 30,
            },
            isActive: true,
            createdAt: new Date(),
            updatedAt: new Date(),
            ...override,
        };
    }
    static createMany(factory, count, override = {}) {
        return Array.from({ length: count }, (_, index) => ({
            ...factory(override),
            id: `test-${index}`,
        }));
    }
}
exports.TestFactory = TestFactory;
//# sourceMappingURL=test.factory.js.map