import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Gym } from './gym.entity';
import { Training } from './training.entity';

export enum UserRole {
  ADMIN = 'admin',
  COACH = 'coach',
  CLIENT = 'client',
}

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ unique: true })
  email: string;

  @Column({ select: false })
  password: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.CLIENT,
  })
  role: UserRole;

  @Column({ nullable: true })
  profilePicture: string;

  @ManyToOne(() => Gym, gym => gym.users, { nullable: true })
  gym: Gym;

  @Column({ nullable: true })
  gymId: string;

  @OneToMany(() => Training, training => training.client)
  clientTrainings: Training[];

  @OneToMany(() => Training, training => training.coach)
  coachTrainings: Training[];

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // Virtual fields
  @Column({ select: false, nullable: true })
  currentHashedRefreshToken?: string;
}
