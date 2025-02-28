import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { User } from './user.entity';
import { Course } from './course.entity';
import { Exercise } from './exercise.entity';
import { Promotion } from './promotion.entity';

@Entity('gyms')
export class Gym {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  address: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ nullable: true })
  email: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  logo: string;

  @Column({ nullable: true })
  coverImage: string;

  @Column({ type: 'json', nullable: true })
  workingHours: {
    day: string;
    open: string;
    close: string;
  }[];

  @Column({ type: 'json', nullable: true })
  amenities: string[];

  @OneToMany(() => User, user => user.gym)
  users: User[];

  @OneToMany(() => Course, course => course.gym)
  courses: Course[];

  @OneToMany(() => Exercise, exercise => exercise.gym)
  exercises: Exercise[];

  @OneToMany(() => Promotion, promotion => promotion.gym)
  promotions: Promotion[];

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // Virtual fields for statistics
  @Column({ type: 'int', default: 0 })
  totalMembers: number;

  @Column({ type: 'int', default: 0 })
  totalCoaches: number;

  @Column({ type: 'int', default: 0 })
  activeCourses: number;
}
