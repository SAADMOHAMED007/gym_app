import { User, UserRole } from '../../../entities/user.entity';
export interface JwtPayload {
    email: string;
    sub: string;
    role: UserRole;
}
export interface AuthResponse {
    access_token: string;
    user: {
        id: string;
        email: string;
        firstName: string;
        lastName: string;
        role: UserRole;
    };
}
export interface TokenResponse {
    access_token: string;
}
export type UserWithoutPassword = Omit<User, 'password'>;
