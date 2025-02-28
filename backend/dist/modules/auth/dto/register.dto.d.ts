import { UserRole } from '../../../entities/user.entity';
export declare class RegisterDto {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role?: UserRole;
    phone?: string;
    gymId?: string;
}
