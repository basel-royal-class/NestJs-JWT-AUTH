import { UsersService } from './users.service';
import { CreateUserDto } from 'src/dto/create-user-dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    getFavourites(req: any): {
        message: string;
    };
    getUserProfile(): {
        id: number;
        name: string;
        role: string;
    };
    create(createUserDto: CreateUserDto): Promise<import("./user.schema").User>;
    findAll(): Promise<import("./user.schema").User[]>;
    findOne(id: string): Promise<import("./user.schema").User>;
}
