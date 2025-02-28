import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { User } from '../../entities/user.entity';
import { ConfigService } from '@nestjs/config';
import { AuthResponse, JwtPayload, TokenResponse, UserWithoutPassword } from './types/auth.types';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async validateUser(email: string, password: string): Promise<UserWithoutPassword | null> {
    const user = await this.usersService.findByEmail(email);
    
    if (user && await bcrypt.compare(password, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    
    return null;
  }

  async login(user: User): Promise<AuthResponse> {
    const payload: JwtPayload = {
      email: user.email,
      sub: user.id,
      role: user.role,
    };

    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
      },
    };
  }

  async register(userData: Partial<User>): Promise<UserWithoutPassword> {
    if (!userData.password) {
      throw new UnauthorizedException('Password is required');
    }

    const hashedPassword = await bcrypt.hash(
      userData.password,
      this.configService.get<number>('security.bcryptSaltRounds', 10)
    );

    const user = await this.usersService.create({
      ...userData,
      password: hashedPassword,
    });

    const { password, ...result } = user;
    return result;
  }

  async refreshToken(user: User): Promise<TokenResponse> {
    const payload: JwtPayload = {
      email: user.email,
      sub: user.id,
      role: user.role,
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async validateToken(token: string): Promise<JwtPayload | null> {
    try {
      return this.jwtService.verify<JwtPayload>(token);
    } catch (error) {
      return null;
    }
  }

  async changePassword(userId: string, oldPassword: string, newPassword: string): Promise<boolean> {
    const user = await this.usersService.findById(userId);
    if (!user) {
      return false;
    }

    const isValidPassword = await bcrypt.compare(oldPassword, user.password);
    if (!isValidPassword) {
      return false;
    }

    const hashedNewPassword = await bcrypt.hash(
      newPassword,
      this.configService.get<number>('security.bcryptSaltRounds', 10)
    );
    
    await this.usersService.update(userId, { password: hashedNewPassword });
    return true;
  }
}
