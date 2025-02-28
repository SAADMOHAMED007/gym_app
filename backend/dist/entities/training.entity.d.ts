import { User } from './user.entity';
import { Course } from './course.entity';
export declare enum TrainingStatus {
    SCHEDULED = "scheduled",
    IN_PROGRESS = "in_progress",
    COMPLETED = "completed",
    CANCELLED = "cancelled"
}
export declare class Training {
    id: string;
    client: User;
    clientId: string;
    coach: User;
    coachId: string;
    course: Course;
    courseId: string;
    status: TrainingStatus;
    scheduledDate: Date;
    duration: number;
    exercises: {
        name: string;
        sets: number;
        reps: number;
        weight?: number;
        duration?: number;
        notes?: string;
    }[];
    notes: string;
    rating: number;
    feedback: string;
    metrics: {
        caloriesBurned?: number;
        distanceCovered?: number;
        averageHeartRate?: number;
        peakHeartRate?: number;
        [key: string]: number | undefined;
    };
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
    isCompleted: boolean;
    completedAt: Date;
    isCancelled: boolean;
    cancelledAt: Date;
}
