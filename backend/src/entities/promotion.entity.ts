import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Gym } from './gym.entity';

export enum PromotionType {
  DISCOUNT = 'discount',
  FREE_TRIAL = 'free_trial',
  BUNDLE = 'bundle',
  REFERRAL = 'referral',
  SEASONAL = 'seasonal',
  FLASH_SALE = 'flash_sale',
}

@Entity('promotions')
export class Promotion {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ type: 'text' })
  description: string;

  @Column({
    type: 'enum',
    enum: PromotionType,
    default: PromotionType.DISCOUNT,
  })
  type: PromotionType;

  @Column({ type: 'decimal', precision: 5, scale: 2 })
  value: number; // Percentage or fixed amount

  @Column({ type: 'boolean', default: false })
  isPercentage: boolean;

  @Column({ type: 'timestamp' })
  startDate: Date;

  @Column({ type: 'timestamp' })
  endDate: Date;

  @Column({ type: 'json', nullable: true })
  conditions: {
    minPurchase?: number;
    maxDiscount?: number;
    userType?: string[];
    courseType?: string[];
    membershipDuration?: number;
    [key: string]: any;
  };

  @Column({ nullable: true })
  promoCode: string;

  @Column({ type: 'int', default: -1 })
  usageLimit: number; // -1 for unlimited

  @Column({ type: 'int', default: 0 })
  usedCount: number;

  @Column({ type: 'simple-array', nullable: true })
  applicableServices: string[];

  @ManyToOne(() => Gym, gym => gym.promotions)
  gym: Gym;

  @Column()
  gymId: string;

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // Virtual fields for quick access
  @Column({ type: 'boolean', default: true })
  isValid: boolean;

  @Column({ type: 'int', default: 0 })
  remainingUses: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  totalSavingsGenerated: number;

  @Column({ type: 'int', default: 0 })
  totalRedemptions: number;

  // Tracking fields
  @Column({ type: 'json', nullable: true })
  redemptionHistory: {
    userId: string;
    date: Date;
    amount: number;
    serviceType: string;
  }[];

  @Column({ type: 'json', nullable: true })
  performanceMetrics: {
    conversionRate: number;
    averageOrderValue: number;
    totalRevenue: number;
    [key: string]: number;
  };
}
