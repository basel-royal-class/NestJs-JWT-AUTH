import { AuthService } from './auth-service';
import { CreateUserDto, LoginDto } from 'src/dto/create-user-dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register(createUserDto: CreateUserDto): Promise<import("../users/user.schema").User>;
    login(loginDto: LoginDto): Promise<{
        accessToken: string;
        user: {
            id: unknown;
            email: string;
            username: string;
        };
    }>;
}
