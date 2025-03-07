import { JwtService } from '@nestjs/jwt';
import { Model } from 'mongoose';
import { User } from 'src/users/user.schema';
import { CreateUserDto, LoginDto } from 'src/dto/create-user-dto';
export declare class AuthService {
    private userModel;
    private jwtService;
    constructor(userModel: Model<User>, jwtService: JwtService);
    hashPassword(password: string): Promise<string>;
    comparePasswords(password: string, hashedPassword: string): Promise<boolean>;
    register(createUserDto: CreateUserDto): Promise<User>;
    login(loginDto: LoginDto): Promise<{
        accessToken: string;
        user: {
            id: unknown;
            email: string;
            username: string;
        };
    }>;
}
