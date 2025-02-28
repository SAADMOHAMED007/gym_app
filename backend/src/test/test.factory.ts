import { DeepPartial } from 'typeorm';
import { User, UserRole } from '../entities/user.entity';
import { Gym } from '../entities/gym.entity';
import { Course, CourseType, CourseLevel } from '../entities/course.entity';
import { Exercise, ExerciseType, ExerciseLevel, MuscleGroup } from '../entities/exercise.entity';
import { Training, TrainingStatus } from '../entities/training.entity';
import { Nutrition, DietType, MealType } from '../entities/nutrition.entity';
import { Promotion, PromotionType } from '../entities/promotion.entity';

export class TestFactory {
  static createUser(override: DeepPartial<User> = {}): DeepPartial<User> {
    return {
      email: `test-${Date.now()}@example.com`,
      password: 'password123',
      firstName: 'Test',
      lastName: 'User',
      role: UserRole.CLIENT,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
      ...override,
    };
  }

  static createGym(override: DeepPartial<Gym> = {}): DeepPartial<Gym> {
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

  static createCourse(override: DeepPartial<Course> = {}): DeepPartial<Course> {
    return {
      name: `Test Course ${Date.now()}`,
      description: 'A test course',
      type: CourseType.GROUP,
      level: CourseLevel.BEGINNER,
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

  static createExercise(override: DeepPartial<Exercise> = {}): DeepPartial<Exercise> {
    return {
      name: `Test Exercise ${Date.now()}`,
      description: 'A test exercise',
      type: ExerciseType.CARDIO,
      level: ExerciseLevel.BEGINNER,
      primaryMuscleGroup: MuscleGroup.LEGS,
      secondaryMuscleGroups: [MuscleGroup.CORE],
      equipment: [{ name: 'treadmill' }],
      instructions: 'Step 1: Start\nStep 2: Exercise\nStep 3: Cool down',
      createdAt: new Date(),
      updatedAt: new Date(),
      ...override,
    };
  }

  static createTraining(override: DeepPartial<Training> = {}): DeepPartial<Training> {
    return {
      clientId: 'test-client-id',
      coachId: 'test-coach-id',
      courseId: 'test-course-id',
      status: TrainingStatus.SCHEDULED,
      scheduledDate: new Date(),
      completedAt: undefined,
      notes: 'Test training session',
      createdAt: new Date(),
      updatedAt: new Date(),
      ...override,
    };
  }

  static createNutrition(override: DeepPartial<Nutrition> = {}): DeepPartial<Nutrition> {
    return {
      name: 'Test Nutrition Plan',
      description: 'A test nutrition plan',
      dietType: DietType.REGULAR,
      meals: [
        {
          type: MealType.BREAKFAST,
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

  static createPromotion(override: DeepPartial<Promotion> = {}): DeepPartial<Promotion> {
    return {
      name: `Test Promotion ${Date.now()}`,
      description: 'A test promotion',
      type: PromotionType.DISCOUNT,
      value: 20,
      isPercentage: true,
      startDate: new Date(),
      endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
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

  static createMany<T>(
    factory: (override?: DeepPartial<T>) => DeepPartial<T>,
    count: number,
    override: DeepPartial<T> = {} as DeepPartial<T>,
  ): DeepPartial<T>[] {
    return Array.from({ length: count }, (_, index) => ({
      ...factory(override),
      id: `test-${index}`,
    }));
  }
}
