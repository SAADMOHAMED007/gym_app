import { User } from '../entities/user.entity';
import { Gym } from '../entities/gym.entity';
import { Course } from '../entities/course.entity';
import { Promotion } from '../entities/promotion.entity';
export declare class TestMocks {
    static mockGym(): Gym;
    static mockUser(override?: Partial<User>): User;
    static mockUnassignedUser(override?: Partial<User>): User;
    static mockCourse(): Course;
    static mockPromotion(): Promotion;
}
