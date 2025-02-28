import { Repository } from 'typeorm';
import { User } from '../../entities/user.entity';
type ProfileUpdateData = Pick<User, 'firstName' | 'lastName' | 'profilePicture'> & {
    phone?: string;
};
export declare class UsersService {
    private readonly userRepository;
    constructor(userRepository: Repository<User>);
    findByEmail(email: string): Promise<User | undefined>;
    findOne(id: string): Promise<User>;
    findById(id: string): Promise<User>;
    create(userData: Partial<User>): Promise<User>;
    update(id: string, userData: Partial<User>): Promise<User>;
    remove(id: string): Promise<void>;
    findAll(): Promise<User[]>;
    findByGym(gymId: string): Promise<User[]>;
    findCoaches(): Promise<User[]>;
    findClients(): Promise<User[]>;
    updateProfile(id: string, profileData: Partial<ProfileUpdateData>): Promise<User>;
}
export {};
