import { Gym } from './gym.entity';
import { Training } from './training.entity';
import { Workout } from './workout.entity';
export declare enum UserRole {
    ADMIN = "admin",
    COACH = "coach",
    CLIENT = "client"
}
export declare class User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: UserRole;
    profilePicture: string;
    gym: Gym;
    gymId: string;
    clientTrainings: Training[];
    coachTrainings: Training[];
    workouts: Workout[];
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
    currentHashedRefreshToken?: string;
}
