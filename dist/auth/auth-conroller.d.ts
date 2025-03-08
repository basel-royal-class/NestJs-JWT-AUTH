import { AuthService } from './auth-service';
import { CreateUserDto, LoginDto } from 'src/dto/create-user-dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    registerB2C(createUserDto: CreateUserDto): Promise<import("../users/user.schema").User>;
    registerB2B(createUserDto: CreateUserDto): Promise<import("../users/user.schema").User>;
    loginB2C(loginDto: LoginDto): Promise<{
        accessToken: string;
        user: {
            id: unknown;
            email: string;
            username: string;
            userType: string;
        };
    }>;
    loginB2B(loginDto: LoginDto): Promise<{
        accessToken: string;
        user: {
            id: unknown;
            email: string;
            username: string;
            userType: string;
        };
    }>;
}
