import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Gym } from './gym.entity';

export enum ExerciseType {
  STRENGTH = 'strength',
  CARDIO = 'cardio',
  FLEXIBILITY = 'flexibility',
  BALANCE = 'balance',
}

export enum ExerciseLevel {
  BEGINNER = 'beginner',
  INTERMEDIATE = 'intermediate',
  ADVANCED = 'advanced',
}

export enum MuscleGroup {
  CHEST = 'chest',
  BACK = 'back',
  SHOULDERS = 'shoulders',
  ARMS = 'arms',
  LEGS = 'legs',
  CORE = 'core',
  FULL_BODY = 'full_body',
}

@Entity('exercises')
export class Exercise {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ type: 'text' })
  description: string;

  @Column({
    type: 'enum',
    enum: ExerciseType,
    default: ExerciseType.STRENGTH,
  })
  type: ExerciseType;

  @Column({
    type: 'enum',
    enum: ExerciseLevel,
    default: ExerciseLevel.BEGINNER,
  })
  level: ExerciseLevel;

  @Column({
    type: 'enum',
    enum: MuscleGroup,
  })
  primaryMuscleGroup: MuscleGroup;

  @Column({ type: 'simple-array', nullable: true })
  secondaryMuscleGroups: MuscleGroup[];

  @Column({ type: 'text' })
  instructions: string;

  @Column({ type: 'simple-array', nullable: true })
  tips: string[];

  @Column({ type: 'simple-array', nullable: true })
  images: string[];

  @Column({ nullable: true })
  videoUrl: string;

  @Column({ type: 'json', nullable: true })
  equipment: {
    name: string;
    quantity?: number;
  }[];

  @Column({ type: 'int', nullable: true })
  recommendedSets: number;

  @Column({ type: 'int', nullable: true })
  recommendedReps: number;

  @Column({ type: 'int', nullable: true })
  recommendedDuration: number; // in seconds

  @Column({ type: 'int', nullable: true })
  recommendedRest: number; // in seconds

  @Column({ type: 'decimal', precision: 5, scale: 2, nullable: true })
  caloriesBurn: number; // per minute

  @ManyToOne(() => Gym, gym => gym.exercises)
  gym: Gym;

  @Column()
  gymId: string;

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
