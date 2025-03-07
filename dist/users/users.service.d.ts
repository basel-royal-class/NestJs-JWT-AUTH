import { Model } from 'mongoose';
import { User } from './user.schema';
import { CreateUserDto } from 'src/dto/create-user-dto';
export declare class UsersService {
    private userModel;
    constructor(userModel: Model<User>);
    getAllUsers(): {
        id: number;
        name: string;
    }[];
    create(createUserDto: CreateUserDto): Promise<User>;
    findAll(): Promise<User[]>;
    findOne(id: string): Promise<User>;
}
