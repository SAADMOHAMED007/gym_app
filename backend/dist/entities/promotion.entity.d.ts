import { Gym } from './gym.entity';
export declare enum PromotionType {
    DISCOUNT = "discount",
    FREE_TRIAL = "free_trial",
    BUNDLE = "bundle",
    REFERRAL = "referral",
    SEASONAL = "seasonal",
    FLASH_SALE = "flash_sale"
}
export declare class Promotion {
    id: string;
    name: string;
    description: string;
    type: PromotionType;
    value: number;
    isPercentage: boolean;
    startDate: Date;
    endDate: Date;
    conditions: {
        minPurchase?: number;
        maxDiscount?: number;
        userType?: string[];
        courseType?: string[];
        membershipDuration?: number;
        [key: string]: any;
    };
    promoCode: string;
    usageLimit: number;
    usedCount: number;
    applicableServices: string[];
    gym: Gym;
    gymId: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
    isValid: boolean;
    remainingUses: number;
    totalSavingsGenerated: number;
    totalRedemptions: number;
    redemptionHistory: {
        userId: string;
        date: Date;
        amount: number;
        serviceType: string;
    }[];
    performanceMetrics: {
        conversionRate: number;
        averageOrderValue: number;
        totalRevenue: number;
        [key: string]: number;
    };
}
