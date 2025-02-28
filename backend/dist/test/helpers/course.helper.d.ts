import { Course } from '../../entities/course.entity';
import { CreateCourseDto, UpdateCourseDto } from '../../modules/courses/dto';
import { User } from '../../entities/user.entity';
import { Gym } from '../../entities/gym.entity';
export declare class CourseTestHelper {
    static createMockGym(): Gym;
    static createMockCoach(): User;
    static createMockCourse(override?: Partial<Course>): Course;
    static createMockCreateCourseDto(): CreateCourseDto;
    static createMockUpdateCourseDto(): UpdateCourseDto;
    static createMockCourseArray(count?: number): Course[];
}
