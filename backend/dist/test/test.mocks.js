"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestMocks = void 0;
const user_entity_1 = require("../entities/user.entity");
const course_entity_1 = require("../entities/course.entity");
const promotion_entity_1 = require("../entities/promotion.entity");
class TestMocks {
    static mockGym() {
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
                { day: 'Wednesday', open: '09:00', close: '22:00' },
                { day: 'Thursday', open: '09:00', close: '22:00' },
                { day: 'Friday', open: '09:00', close: '22:00' },
                { day: 'Saturday', open: '10:00', close: '20:00' },
                { day: 'Sunday', open: '10:00', close: '18:00' },
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
    static mockUser(override = {}) {
        const mockGym = this.mockGym();
        return {
            id: 'test-user-id',
            email: 'test@example.com',
            password: 'hashed_password123',
            firstName: 'Test',
            lastName: 'User',
            role: user_entity_1.UserRole.CLIENT,
            isActive: true,
            profilePicture: '',
            gym: mockGym,
            gymId: mockGym.id,
            clientTrainings: [],
            coachTrainings: [],
            workouts: [],
            createdAt: new Date(),
            updatedAt: new Date(),
            currentHashedRefreshToken: undefined,
            ...override,
        };
    }
    static mockUnassignedUser(override = {}) {
        return {
            id: 'test-user-id',
            email: 'test@example.com',
            password: 'hashed_password123',
            firstName: 'Test',
            lastName: 'User',
            role: user_entity_1.UserRole.CLIENT,
            isActive: true,
            profilePicture: '',
            gym: null,
            gymId: '',
            clientTrainings: [],
            coachTrainings: [],
            workouts: [],
            createdAt: new Date(),
            updatedAt: new Date(),
            currentHashedRefreshToken: undefined,
            ...override,
        };
    }
    static mockCourse() {
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
            gym: this.mockGym(),
            gymId: 'test-gym-id',
            coach: this.mockUser({ role: user_entity_1.UserRole.COACH }),
            coachId: 'test-coach-id',
            trainings: [],
            isActive: true,
            enrolledStudents: 0,
            completedSessions: 0,
            averageRating: 0,
            createdAt: new Date(),
            updatedAt: new Date(),
        };
    }
    static mockPromotion() {
        return {
            id: 'test-promotion-id',
            name: 'Test Promotion',
            description: 'Test promotion description',
            type: promotion_entity_1.PromotionType.DISCOUNT,
            value: 20,
            isPercentage: true,
            startDate: new Date(),
            endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
            conditions: {
                minPurchaseAmount: 100,
                maxUsageCount: 100,
                membershipDuration: 30,
            },
            promoCode: 'TEST20',
            usageLimit: 100,
            usedCount: 0,
            applicableServices: ['membership', 'course'],
            gym: this.mockGym(),
            gymId: 'test-gym-id',
            isActive: true,
            isValid: true,
            remainingUses: 100,
            totalSavingsGenerated: 0,
            totalRedemptions: 0,
            redemptionHistory: [],
            performanceMetrics: {
                conversionRate: 0,
                averageOrderValue: 0,
                totalRevenue: 0,
                redemptionRate: 0,
                averageSavings: 0,
                peakUsageTime: 0,
                userSegmentDistribution: 0,
            },
            createdAt: new Date(),
            updatedAt: new Date(),
        };
    }
}
exports.TestMocks = TestMocks;
//# sourceMappingURL=test.mocks.js.map