import { UsersService } from './users.service';
import { UpdateUserDto, UpdateProfileDto } from './dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    findAll(): Promise<import("../../entities/user.entity").User[]>;
    findCoaches(): Promise<import("../../entities/user.entity").User[]>;
    findClients(): Promise<import("../../entities/user.entity").User[]>;
    findOne(id: string): Promise<import("../../entities/user.entity").User>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<import("../../entities/user.entity").User>;
    remove(id: string): Promise<void>;
    findByGym(gymId: string): Promise<import("../../entities/user.entity").User[]>;
    updateProfile(req: any, updateProfileDto: UpdateProfileDto): Promise<import("../../entities/user.entity").User>;
}
