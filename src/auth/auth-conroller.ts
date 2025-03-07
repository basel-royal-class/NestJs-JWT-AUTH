import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth-service';
import { CreateUserDto, LoginDto } from 'src/dto/create-user-dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    // Register new user (sign-up)
    @Post('register')
    async register(@Body() createUserDto: CreateUserDto) {
        return this.authService.register(createUserDto);
    }

    // Login user (sign-in)
    @Post('login')
    async login(@Body() loginDto: LoginDto) {
        return this.authService.login(loginDto);
    }
}
