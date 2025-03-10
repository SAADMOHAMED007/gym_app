"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const auth_service_1 = require("../../modules/auth/auth.service");
const users_service_1 = require("../../modules/users/users.service");
const jwt_1 = require("@nestjs/jwt");
const config_service_1 = require("../../config/config.service");
const test_base_1 = require("../test.base");
const user_entity_1 = require("../../entities/user.entity");
const common_1 = require("@nestjs/common");
describe('AuthService', () => {
    let testBase;
    let authService;
    let usersService;
    let jwtService;
    beforeAll(async () => {
        testBase = new test_base_1.TestBase();
        await testBase.beforeAll();
        const module = await testing_1.Test.createTestingModule({
            providers: [
                auth_service_1.AuthService,
                {
                    provide: users_service_1.UsersService,
                    useValue: {
                        findByEmail: jest.fn(),
                        create: jest.fn(),
                        update: jest.fn(),
                    },
                },
                {
                    provide: jwt_1.JwtService,
                    useValue: {
                        sign: jest.fn(() => 'test-token'),
                        verify: jest.fn(),
                    },
                },
                {
                    provide: config_service_1.ConfigService,
                    useValue: {
                        get: jest.fn(),
                        jwt: {
                            secret: 'test-secret',
                            expiresIn: '1h',
                        },
                    },
                },
            ],
        }).compile();
        authService = module.get(auth_service_1.AuthService);
        usersService = module.get(users_service_1.UsersService);
        jwtService = module.get(jwt_1.JwtService);
    });
    afterAll(async () => {
        await testBase.afterAll();
    });
    beforeEach(async () => {
        await testBase.beforeEach();
        jest.clearAllMocks();
    });
    describe('validateUser', () => {
        it('should return user if credentials are valid', async () => {
            const testUser = {
                id: 'test-id',
                email: 'test@example.com',
                password: 'hashed_password123',
                firstName: 'Test',
                lastName: 'User',
                role: user_entity_1.UserRole.CLIENT,
                isActive: true,
                profilePicture: '',
                gym: undefined,
                gymId: '',
                clientTrainings: [],
                coachTrainings: [],
                createdAt: new Date(),
                updatedAt: new Date(),
                currentHashedRefreshToken: undefined,
                workouts: [],
            };
            jest.spyOn(usersService, 'findByEmail').mockResolvedValue(testUser);
            jest.spyOn(authService, 'comparePasswords')
                .mockResolvedValue(true);
            const result = await authService.validateUser('test@example.com', 'password123');
            expect(result).toBeDefined();
            expect(result.email).toBe(testUser.email);
            expect(usersService.findByEmail).toHaveBeenCalledWith('test@example.com');
        });
        it('should return null if user not found', async () => {
            jest.spyOn(usersService, 'findByEmail').mockResolvedValue(undefined);
            const result = await authService.validateUser('nonexistent@example.com', 'password123');
            expect(result).toBeNull();
            expect(usersService.findByEmail).toHaveBeenCalledWith('nonexistent@example.com');
        });
        it('should return null if password is invalid', async () => {
            const testUser = {
                id: 'test-id',
                email: 'test@example.com',
                password: 'hashed_password123',
                firstName: 'Test',
                lastName: 'User',
                role: user_entity_1.UserRole.CLIENT,
                isActive: true,
                profilePicture: '',
                gym: undefined,
                gymId: '',
                clientTrainings: [],
                coachTrainings: [],
                createdAt: new Date(),
                updatedAt: new Date(),
                currentHashedRefreshToken: undefined,
                workouts: [],
            };
            jest.spyOn(usersService, 'findByEmail').mockResolvedValue(testUser);
            jest.spyOn(authService, 'comparePasswords')
                .mockResolvedValue(false);
            const result = await authService.validateUser('test@example.com', 'wrong_password');
            expect(result).toBeNull();
        });
    });
    describe('login', () => {
        it('should return access token for valid user', async () => {
            const testUser = {
                id: 'test-id',
                email: 'test@example.com',
                password: 'hashed_password123',
                firstName: 'Test',
                lastName: 'User',
                role: user_entity_1.UserRole.CLIENT,
                isActive: true,
                profilePicture: '',
                gym: undefined,
                gymId: '',
                clientTrainings: [],
                coachTrainings: [],
                createdAt: new Date(),
                updatedAt: new Date(),
                currentHashedRefreshToken: undefined,
                workouts: [],
            };
            const expectedPayload = {
                sub: testUser.id,
                email: testUser.email,
                role: testUser.role,
            };
            const expectedResponse = {
                access_token: 'test-token',
                user: testUser,
            };
            jest.spyOn(jwtService, 'sign').mockReturnValue('test-token');
            const result = await authService.login(testUser);
            expect(result).toEqual(expectedResponse);
            expect(jwtService.sign).toHaveBeenCalledWith(expectedPayload);
        });
        it('should throw UnauthorizedException for invalid user', async () => {
            await expect(authService.login(null)).rejects.toThrow(common_1.UnauthorizedException);
        });
    });
    describe('register', () => {
        it('should create new user and return access token', async () => {
            const registerDto = {
                email: 'new@example.com',
                password: 'password123',
                firstName: 'New',
                lastName: 'User',
            };
            const createdUser = {
                id: 'new-id',
                ...registerDto,
                role: user_entity_1.UserRole.CLIENT,
                isActive: true,
                profilePicture: '',
                gym: undefined,
                gymId: '',
                clientTrainings: [],
                coachTrainings: [],
                createdAt: new Date(),
                updatedAt: new Date(),
                currentHashedRefreshToken: undefined,
                workouts: [],
            };
            const expectedResponse = {
                access_token: 'test-token',
                user: createdUser,
            };
            jest.spyOn(usersService, 'create').mockResolvedValue(createdUser);
            jest.spyOn(jwtService, 'sign').mockReturnValue('test-token');
            const result = await authService.register(registerDto);
            expect(result).toEqual(expectedResponse);
            expect(usersService.create).toHaveBeenCalledWith({
                ...registerDto,
                role: user_entity_1.UserRole.CLIENT,
            });
        });
    });
});
//# sourceMappingURL=auth.service.spec.js.map