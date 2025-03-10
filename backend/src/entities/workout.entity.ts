import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { User } from './user.entity';
import { WorkoutExercise } from './workout-exercise.entity';

@Entity('workouts')
export class Workout {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'timestamp' })
  date: Date;

  @Column({ type: 'int', default: 60 })
  durationMinutes: number;

  @Column({ default: false })
  isCompleted: boolean;

  @ManyToOne(() => User, user => user.workouts)
  user: User;

  @Column()
  userId: string;

  @OneToMany(() => WorkoutExercise, workoutExercise => workoutExercise.workout, {
    cascade: true,
    eager: true,
  })
  exercises: WorkoutExercise[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
} 