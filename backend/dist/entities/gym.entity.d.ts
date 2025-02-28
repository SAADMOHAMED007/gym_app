import { User } from './user.entity';
import { Course } from './course.entity';
import { Exercise } from './exercise.entity';
import { Promotion } from './promotion.entity';
export declare class Gym {
    id: string;
    name: string;
    address: string;
    phone: string;
    email: string;
    description: string;
    logo: string;
    coverImage: string;
    workingHours: {
        day: string;
        open: string;
        close: string;
    }[];
    amenities: string[];
    users: User[];
    courses: Course[];
    exercises: Exercise[];
    promotions: Promotion[];
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
    totalMembers: number;
    totalCoaches: number;
    activeCourses: number;
}
