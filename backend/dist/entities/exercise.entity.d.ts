import { Gym } from './gym.entity';
export declare enum ExerciseType {
    STRENGTH = "strength",
    CARDIO = "cardio",
    FLEXIBILITY = "flexibility",
    BALANCE = "balance"
}
export declare enum ExerciseLevel {
    BEGINNER = "beginner",
    INTERMEDIATE = "intermediate",
    ADVANCED = "advanced"
}
export declare enum MuscleGroup {
    CHEST = "chest",
    BACK = "back",
    SHOULDERS = "shoulders",
    ARMS = "arms",
    LEGS = "legs",
    CORE = "core",
    FULL_BODY = "full_body"
}
export declare class Exercise {
    id: string;
    name: string;
    description: string;
    type: ExerciseType;
    level: ExerciseLevel;
    primaryMuscleGroup: MuscleGroup;
    secondaryMuscleGroups: MuscleGroup[];
    instructions: string;
    tips: string[];
    images: string[];
    videoUrl: string;
    equipment: {
        name: string;
        quantity?: number;
    }[];
    recommendedSets: number;
    recommendedReps: number;
    recommendedDuration: number;
    recommendedRest: number;
    caloriesBurn: number;
    gym: Gym;
    gymId: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}
