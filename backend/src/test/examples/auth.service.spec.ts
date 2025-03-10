import { Test } from '@nestjs/testing';
import { AuthService } from '../../modules/auth/auth.service';
import { UsersService } from '../../modules/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '../../config/config.service';
import { TestBase } from '../test.base';
import { TestFactory } from '../test.factory';
import { User, UserRole } from '../../entities/user.entity';
import { UnauthorizedException } from '@nestjs/common';
import { AuthResponse, JwtPayload } from '../../modules/auth/types/auth.types';

describe('AuthService', () => {
  let testBase: TestBase;
  let authService: AuthService;
  let usersService: UsersService;
  let jwtService: JwtService;

  beforeAll(async () => {
    testBase = new TestBase();
    await testBase.beforeAll();

    const module = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: {
            findByEmail: jest.fn(),
            create: jest.fn(),
            update: jest.fn(),
          },
        },
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn(() => 'test-token'),
            verify: jest.fn(),
          },
        },
        {
          provide: ConfigService,
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

    authService = module.get<AuthService>(AuthService);
    usersService = module.get<UsersService>(UsersService);
    jwtService = module.get<JwtService>(JwtService);
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
      const testUser: User = {
        id: 'test-id',
        email: 'test@example.com',
        password: 'hashed_password123',
        firstName: 'Test',
        lastName: 'User',
        role: UserRole.CLIENT,
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
      jest.spyOn(authService as any, 'comparePasswords')
        .mockResolvedValue(true);

      const result = await authService.validateUser(
        'test@example.com',
        'password123',
      );

      expect(result).toBeDefined();
      expect(result.email).toBe(testUser.email);
      expect(usersService.findByEmail).toHaveBeenCalledWith('test@example.com');
    });

    it('should return null if user not found', async () => {
      jest.spyOn(usersService, 'findByEmail').mockResolvedValue(undefined);

      const result = await authService.validateUser(
        'nonexistent@example.com',
        'password123',
      );

      expect(result).toBeNull();
      expect(usersService.findByEmail).toHaveBeenCalledWith('nonexistent@example.com');
    });

    it('should return null if password is invalid', async () => {
      const testUser: User = {
        id: 'test-id',
        email: 'test@example.com',
        password: 'hashed_password123',
        firstName: 'Test',
        lastName: 'User',
        role: UserRole.CLIENT,
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
      jest.spyOn(authService as any, 'comparePasswords')
        .mockResolvedValue(false);

      const result = await authService.validateUser(
        'test@example.com',
        'wrong_password',
      );

      expect(result).toBeNull();
    });
  });

  describe('login', () => {
    it('should return access token for valid user', async () => {
      const testUser: User = {
        id: 'test-id',
        email: 'test@example.com',
        password: 'hashed_password123',
        firstName: 'Test',
        lastName: 'User',
        role: UserRole.CLIENT,
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

      const expectedPayload: JwtPayload = {
        sub: testUser.id,
        email: testUser.email,
        role: testUser.role,
      };

      const expectedResponse: AuthResponse = {
        access_token: 'test-token',
        user: testUser,
      };

      jest.spyOn(jwtService, 'sign').mockReturnValue('test-token');

      const result = await authService.login(testUser);

      expect(result).toEqual(expectedResponse);
      expect(jwtService.sign).toHaveBeenCalledWith(expectedPayload);
    });

    it('should throw UnauthorizedException for invalid user', async () => {
      await expect(authService.login(null)).rejects.toThrow(UnauthorizedException);
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

      const createdUser: User = {
        id: 'new-id',
        ...registerDto,
        role: UserRole.CLIENT,
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

      const expectedResponse: AuthResponse = {
        access_token: 'test-token',
        user: createdUser,
      };

      jest.spyOn(usersService, 'create').mockResolvedValue(createdUser);
      jest.spyOn(jwtService, 'sign').mockReturnValue('test-token');

      const result = await authService.register(registerDto);

      expect(result).toEqual(expectedResponse);
      expect(usersService.create).toHaveBeenCalledWith({
        ...registerDto,
        role: UserRole.CLIENT,
      });
    });
  });
});
