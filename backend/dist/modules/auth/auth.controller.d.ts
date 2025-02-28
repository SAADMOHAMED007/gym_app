import { AuthService } from './auth.service';
import { LoginDto, RegisterDto, ChangePasswordDto } from './dto';
import { User } from '../../entities/user.entity';
import { AuthResponse, TokenResponse, UserWithoutPassword } from './types/auth.types';
interface RequestWithUser {
    user: User;
}
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(req: RequestWithUser, loginDto: LoginDto): Promise<AuthResponse>;
    register(registerDto: RegisterDto): Promise<UserWithoutPassword>;
    changePassword(req: RequestWithUser, changePasswordDto: ChangePasswordDto): Promise<{
        success: boolean;
        message: string;
    }>;
    getProfile(req: RequestWithUser): UserWithoutPassword;
    refreshToken(req: RequestWithUser): Promise<TokenResponse>;
}
export {};
