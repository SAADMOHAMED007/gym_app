import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOptionsWhere } from 'typeorm';
import { User, UserRole } from '../../entities/user.entity';

type ProfileUpdateData = Pick<User, 'firstName' | 'lastName' | 'profilePicture'> & {
  phone?: string;
};

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findByEmail(email: string): Promise<User | undefined> {
    return this.userRepository.findOne({
      where: { email },
      select: ['id', 'email', 'password', 'firstName', 'lastName', 'role', 'profilePicture', 'gymId', 'isActive', 'createdAt', 'updatedAt']
    });
  }

  async findOne(id: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async findById(id: string): Promise<User> {
    return this.findOne(id);
  }

  async create(userData: Partial<User>): Promise<User> {
    if (userData.email) {
      const existingUser = await this.findByEmail(userData.email);
      if (existingUser) {
        throw new ConflictException('Email already exists');
      }
    }

    const user = this.userRepository.create(userData);
    return this.userRepository.save(user);
  }

  async update(id: string, userData: Partial<User>): Promise<User> {
    const user = await this.findOne(id);
    
    if (userData.email && userData.email !== user.email) {
      const existingUser = await this.findByEmail(userData.email);
      if (existingUser) {
        throw new ConflictException('Email already exists');
      }
    }

    const updatedUser = { ...user, ...userData };
    return this.userRepository.save(updatedUser);
  }

  async remove(id: string): Promise<void> {
    const user = await this.findOne(id);
    await this.userRepository.remove(user);
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findByGym(gymId: string): Promise<User[]> {
    return this.userRepository.find({
      where: { gymId } as FindOptionsWhere<User>,
      relations: ['gym'],
    });
  }

  async findCoaches(): Promise<User[]> {
    return this.userRepository.find({
      where: { role: UserRole.COACH } as FindOptionsWhere<User>,
      relations: ['gym'],
    });
  }

  async findClients(): Promise<User[]> {
    return this.userRepository.find({
      where: { role: UserRole.CLIENT } as FindOptionsWhere<User>,
      relations: ['gym'],
    });
  }

  async updateProfile(id: string, profileData: Partial<ProfileUpdateData>): Promise<User> {
    const allowedUpdates = ['firstName', 'lastName', 'phone', 'profilePicture'] as const;
    const filteredData = Object.keys(profileData)
      .filter((key): key is keyof ProfileUpdateData => allowedUpdates.includes(key as any))
      .reduce((obj: Partial<ProfileUpdateData>, key) => {
        obj[key] = profileData[key];
        return obj;
      }, {});

    return this.update(id, filteredData);
  }
}
