import { JwtService } from '@nestjs/jwt';
import { Model } from 'mongoose';
import { User } from 'src/users/user.schema';
import { CreateUserDto, LoginDto } from 'src/dto/create-user-dto';
import { ConfigService } from '@nestjs/config';
export declare class AuthService {
    private userModel;
    private jwtService;
    private configService;
    constructor(userModel: Model<User>, jwtService: JwtService, configService: ConfigService);
    hashPassword(password: string): Promise<string>;
    comparePasswords(password: string, hashedPassword: string): Promise<boolean>;
    register(createUserDto: CreateUserDto): Promise<User>;
    login(loginDto: LoginDto): Promise<{
        accessToken: string;
        user: {
            id: unknown;
            email: string;
            username: string;
            userType: string;
        };
    }>;
}
