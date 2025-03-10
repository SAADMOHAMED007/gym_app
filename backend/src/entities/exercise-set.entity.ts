import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { WorkoutExercise } from './workout-exercise.entity';

@Entity('exercise_sets')
export class ExerciseSet {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => WorkoutExercise, workoutExercise => workoutExercise.sets)
  workoutExercise: WorkoutExercise;

  @Column()
  workoutExerciseId: string;

  @Column({ type: 'int' })
  setNumber: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  weight: number;

  @Column({ type: 'int', nullable: true })
  reps: number;

  @Column({ type: 'int', nullable: true })
  durationSeconds: number;

  @Column({ default: false })
  isCompleted: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
} 