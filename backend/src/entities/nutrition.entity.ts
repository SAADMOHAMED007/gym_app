import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { User } from './user.entity';
import { Gym } from './gym.entity';

export enum MealType {
  BREAKFAST = 'breakfast',
  LUNCH = 'lunch',
  DINNER = 'dinner',
  SNACK = 'snack',
  PRE_WORKOUT = 'pre_workout',
  POST_WORKOUT = 'post_workout',
}

export enum DietType {
  REGULAR = 'regular',
  VEGETARIAN = 'vegetarian',
  VEGAN = 'vegan',
  KETO = 'keto',
  PALEO = 'paleo',
  LOW_CARB = 'low_carb',
  HIGH_PROTEIN = 'high_protein',
}

@Entity('nutrition_plans')
export class Nutrition {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ type: 'text' })
  description: string;

  @Column({
    type: 'enum',
    enum: DietType,
    default: DietType.REGULAR,
  })
  dietType: DietType;

  @Column({ type: 'json' })
  meals: {
    type: MealType;
    name: string;
    description?: string;
    time?: string;
    foods: {
      name: string;
      quantity: number;
      unit: string;
      calories: number;
      protein: number;
      carbs: number;
      fats: number;
      notes?: string;
    }[];
  }[];

  @Column({ type: 'json' })
  nutritionalInfo: {
    totalCalories: number;
    totalProtein: number;
    totalCarbs: number;
    totalFats: number;
    [key: string]: number;
  };

  @Column({ type: 'simple-array', nullable: true })
  allergies: string[];

  @Column({ type: 'simple-array', nullable: true })
  restrictions: string[];

  @Column({ type: 'text', nullable: true })
  guidelines: string;

  @Column({ type: 'simple-array', nullable: true })
  supplements: string[];

  @Column({ type: 'int' })
  durationWeeks: number;

  @ManyToOne(() => User)
  client: User;

  @Column()
  clientId: string;

  @ManyToOne(() => User)
  nutritionist: User;

  @Column()
  nutritionistId: string;

  @ManyToOne(() => Gym)
  gym: Gym;

  @Column()
  gymId: string;

  @Column({ type: 'json', nullable: true })
  progress: {
    date: string;
    weight: number;
    measurements?: {
      [key: string]: number;
    };
    notes?: string;
  }[];

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // Virtual fields for tracking
  @Column({ type: 'decimal', precision: 5, scale: 2, nullable: true })
  adherenceRate: number; // percentage of plan followed

  @Column({ type: 'decimal', precision: 5, scale: 2, nullable: true })
  weightChange: number; // in kg/lbs

  @Column({ type: 'json', nullable: true })
  goals: {
    type: string;
    target: number;
    current: number;
    unit: string;
    deadline?: Date;
  }[];
}
