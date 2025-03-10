import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Workout } from './workout.entity';
import { Exercise } from './exercise.entity';
import { ExerciseSet } from './exercise-set.entity';

@Entity('workout_exercises')
export class WorkoutExercise {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Workout, workout => workout.exercises)
  workout: Workout;

  @Column()
  workoutId: string;

  @ManyToOne(() => Exercise, { nullable: true })
  exercise: Exercise;

  @Column()
  exerciseId: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  imageUrl: string;

  @Column({ type: 'text', nullable: true })
  notes: string;

  @Column({ default: false })
  isCompleted: boolean;

  @OneToMany(() => ExerciseSet, exerciseSet => exerciseSet.workoutExercise, {
    cascade: true,
    eager: true,
  })
  sets: ExerciseSet[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
} 