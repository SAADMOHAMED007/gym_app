"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourseTestHelper = void 0;
const course_entity_1 = require("../../entities/course.entity");
const user_entity_1 = require("../../entities/user.entity");
class CourseTestHelper {
    static createMockGym() {
        return {
            id: 'test-gym-id',
            name: 'Test Gym',
            address: '123 Test St',
            phone: '123-456-7890',
            email: 'gym@test.com',
            description: 'Test gym description',
            logo: 'test-logo.png',
            coverImage: 'test-cover.png',
            workingHours: [
                { day: 'Monday', open: '09:00', close: '22:00' },
                { day: 'Tuesday', open: '09:00', close: '22:00' },
            ],
            amenities: ['Parking', 'Showers', 'Lockers'],
            users: [],
            courses: [],
            promotions: [],
            exercises: [],
            totalMembers: 0,
            totalCoaches: 0,
            activeCourses: 0,
            isActive: true,
            createdAt: new Date(),
            updatedAt: new Date(),
        };
    }
    static createMockCoach() {
        const gym = this.createMockGym();
        return {
            id: 'test-coach-id',
            email: 'coach@test.com',
            password: 'hashed_password123',
            firstName: 'Test',
            lastName: 'Coach',
            role: user_entity_1.UserRole.COACH,
            isActive: true,
            profilePicture: '',
            gym,
            gymId: gym.id,
            clientTrainings: [],
            coachTrainings: [],
            createdAt: new Date(),
            updatedAt: new Date(),
            currentHashedRefreshToken: undefined,
        };
    }
    static createMockCourse(override = {}) {
        const gym = this.createMockGym();
        const coach = this.createMockCoach();
        return {
            id: 'test-course-id',
            name: 'Test Course',
            description: 'Test course description',
            type: course_entity_1.CourseType.GROUP,
            level: course_entity_1.CourseLevel.BEGINNER,
            capacity: 20,
            price: 100,
            startTime: '09:00',
            endTime: '10:00',
            schedule: [{ day: 'Monday', isActive: true }],
            image: 'test-course-image.jpg',
            gym,
            gymId: gym.id,
            coach,
            coachId: coach.id,
            trainings: [],
            isActive: true,
            enrolledStudents: 0,
            completedSessions: 0,
            averageRating: 0,
            createdAt: new Date(),
            updatedAt: new Date(),
            ...override,
        };
    }
    static createMockCreateCourseDto() {
        return {
            name: 'Test Course',
            description: 'Test course description',
            type: course_entity_1.CourseType.GROUP,
            level: course_entity_1.CourseLevel.BEGINNER,
            capacity: 20,
            price: 100,
            startTime: '09:00',
            endTime: '10:00',
            schedule: [{ day: 'Monday', isActive: true }],
            gymId: 'test-gym-id',
            coachId: 'test-coach-id',
            image: 'test-course-image.jpg',
        };
    }
    static createMockUpdateCourseDto() {
        return {
            name: 'Updated Course Name',
            description: 'Updated course description',
            price: 150,
        };
    }
    static createMockCourseArray(count = 2) {
        return Array.from({ length: count }, (_, index) => this.createMockCourse({ id: `test-course-id-${index + 1}` }));
    }
}
exports.CourseTestHelper = CourseTestHelper;
//# sourceMappingURL=course.helper.js.map