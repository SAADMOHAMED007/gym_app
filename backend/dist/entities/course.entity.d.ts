import { Gym } from './gym.entity';
import { User } from './user.entity';
import { Training } from './training.entity';
export declare enum CourseType {
    GROUP = "group",
    PRIVATE = "private",
    WORKSHOP = "workshop"
}
export declare enum CourseLevel {
    BEGINNER = "beginner",
    INTERMEDIATE = "intermediate",
    ADVANCED = "advanced"
}
export declare class Course {
    id: string;
    name: string;
    description: string;
    type: CourseType;
    level: CourseLevel;
    capacity: number;
    price: number;
    startTime: string;
    endTime: string;
    schedule: {
        day: string;
        isActive: boolean;
    }[];
    image: string;
    gym: Gym;
    gymId: string;
    coach: User;
    coachId: string;
    trainings: Training[];
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
    enrolledStudents: number;
    completedSessions: number;
    averageRating: number;
}
