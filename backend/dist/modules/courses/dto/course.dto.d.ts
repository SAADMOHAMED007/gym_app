import { CourseType, CourseLevel } from '../../../entities/course.entity';
declare class ScheduleItemDto {
    day: string;
    isActive: boolean;
}
export declare class CreateCourseDto {
    name: string;
    description: string;
    type: CourseType;
    level: CourseLevel;
    capacity: number;
    price: number;
    startTime: string;
    endTime: string;
    schedule: ScheduleItemDto[];
    gymId: string;
    coachId: string;
    image?: string;
}
export declare class UpdateCourseDto {
    name?: string;
    description?: string;
    type?: CourseType;
    level?: CourseLevel;
    capacity?: number;
    price?: number;
    startTime?: string;
    endTime?: string;
    schedule?: ScheduleItemDto[];
    gymId?: string;
    coachId?: string;
    image?: string;
}
export {};
