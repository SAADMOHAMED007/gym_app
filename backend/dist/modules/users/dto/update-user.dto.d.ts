import { UserRole } from '../../../entities/user.entity';
export declare class UpdateUserDto {
    firstName?: string;
    lastName?: string;
    email?: string;
    role?: UserRole;
    phone?: string;
    profilePicture?: string;
    gymId?: string;
    isActive?: boolean;
}
