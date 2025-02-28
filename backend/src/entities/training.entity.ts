import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { User } from './user.entity';
import { Course } from './course.entity';

export enum TrainingStatus {
  SCHEDULED = 'scheduled',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
}

@Entity('trainings')
export class Training {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, user => user.clientTrainings)
  client: User;

  @Column()
  clientId: string;

  @ManyToOne(() => User, user => user.coachTrainings)
  coach: User;

  @Column()
  coachId: string;

  @ManyToOne(() => Course, course => course.trainings)
  course: Course;

  @Column()
  courseId: string;

  @Column({
    type: 'enum',
    enum: TrainingStatus,
    default: TrainingStatus.SCHEDULED,
  })
  status: TrainingStatus;

  @Column({ type: 'timestamp' })
  scheduledDate: Date;

  @Column({ type: 'int' })
  duration: number; // in minutes

  @Column({ type: 'json', nullable: true })
  exercises: {
    name: string;
    sets: number;
    reps: number;
    weight?: number;
    duration?: number;
    notes?: string;
  }[];

  @Column({ type: 'text', nullable: true })
  notes: string;

  @Column({ type: 'decimal', precision: 3, scale: 1, nullable: true })
  rating: number;

  @Column({ type: 'text', nullable: true })
  feedback: string;

  @Column({ type: 'json', nullable: true })
  metrics: {
    caloriesBurned?: number;
    distanceCovered?: number;
    averageHeartRate?: number;
    peakHeartRate?: number;
    [key: string]: number | undefined;
  };

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // Virtual fields for quick access
  @Column({ type: 'boolean', default: false })
  isCompleted: boolean;

  @Column({ type: 'timestamp', nullable: true })
  completedAt: Date;

  @Column({ type: 'boolean', default: false })
  isCancelled: boolean;

  @Column({ type: 'timestamp', nullable: true })
  cancelledAt: Date;
}
