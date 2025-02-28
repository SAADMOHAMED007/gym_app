import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Gym } from './gym.entity';
import { User } from './user.entity';
import { Training } from './training.entity';

export enum CourseType {
  GROUP = 'group',
  PRIVATE = 'private',
  WORKSHOP = 'workshop',
}

export enum CourseLevel {
  BEGINNER = 'beginner',
  INTERMEDIATE = 'intermediate',
  ADVANCED = 'advanced',
}

@Entity('courses')
export class Course {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ type: 'text' })
  description: string;

  @Column({
    type: 'enum',
    enum: CourseType,
    default: CourseType.GROUP,
  })
  type: CourseType;

  @Column({
    type: 'enum',
    enum: CourseLevel,
    default: CourseLevel.BEGINNER,
  })
  level: CourseLevel;

  @Column({ type: 'int' })
  capacity: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @Column({ type: 'time' })
  startTime: string;

  @Column({ type: 'time' })
  endTime: string;

  @Column({ type: 'json' })
  schedule: {
    day: string;
    isActive: boolean;
  }[];

  @Column({ nullable: true })
  image: string;

  @ManyToOne(() => Gym, gym => gym.courses)
  gym: Gym;

  @Column()
  gymId: string;

  @ManyToOne(() => User, user => user.coachTrainings)
  coach: User;

  @Column()
  coachId: string;

  @OneToMany(() => Training, training => training.course)
  trainings: Training[];

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // Virtual fields for statistics
  @Column({ type: 'int', default: 0 })
  enrolledStudents: number;

  @Column({ type: 'int', default: 0 })
  completedSessions: number;

  @Column({ type: 'decimal', precision: 3, scale: 1, default: 0 })
  averageRating: number;
}
