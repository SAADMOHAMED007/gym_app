import { User } from './user.entity';
import { Gym } from './gym.entity';
export declare enum MealType {
    BREAKFAST = "breakfast",
    LUNCH = "lunch",
    DINNER = "dinner",
    SNACK = "snack",
    PRE_WORKOUT = "pre_workout",
    POST_WORKOUT = "post_workout"
}
export declare enum DietType {
    REGULAR = "regular",
    VEGETARIAN = "vegetarian",
    VEGAN = "vegan",
    KETO = "keto",
    PALEO = "paleo",
    LOW_CARB = "low_carb",
    HIGH_PROTEIN = "high_protein"
}
export declare class Nutrition {
    id: string;
    name: string;
    description: string;
    dietType: DietType;
    meals: {
        type: MealType;
        name: string;
        description?: string;
        time?: string;
        foods: {
            name: string;
            quantity: number;
            unit: string;
            calories: number;
            protein: number;
            carbs: number;
            fats: number;
            notes?: string;
        }[];
    }[];
    nutritionalInfo: {
        totalCalories: number;
        totalProtein: number;
        totalCarbs: number;
        totalFats: number;
        [key: string]: number;
    };
    allergies: string[];
    restrictions: string[];
    guidelines: string;
    supplements: string[];
    durationWeeks: number;
    client: User;
    clientId: string;
    nutritionist: User;
    nutritionistId: string;
    gym: Gym;
    gymId: string;
    progress: {
        date: string;
        weight: number;
        measurements?: {
            [key: string]: number;
        };
        notes?: string;
    }[];
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
    adherenceRate: number;
    weightChange: number;
    goals: {
        type: string;
        target: number;
        current: number;
        unit: string;
        deadline?: Date;
    }[];
}
