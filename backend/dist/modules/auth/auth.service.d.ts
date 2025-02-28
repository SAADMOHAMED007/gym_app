import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { User } from '../../entities/user.entity';
import { ConfigService } from '@nestjs/config';
import { AuthResponse, JwtPayload, TokenResponse, UserWithoutPassword } from './types/auth.types';
export declare class AuthService {
    private usersService;
    private jwtService;
    private configService;
    constructor(usersService: UsersService, jwtService: JwtService, configService: ConfigService);
    validateUser(email: string, password: string): Promise<UserWithoutPassword | null>;
    login(user: User): Promise<AuthResponse>;
    register(userData: Partial<User>): Promise<UserWithoutPassword>;
    refreshToken(user: User): Promise<TokenResponse>;
    validateToken(token: string): Promise<JwtPayload | null>;
    changePassword(userId: string, oldPassword: string, newPassword: string): Promise<boolean>;
}
