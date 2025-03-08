import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth-service';
import { CreateUserDto, LoginDto } from 'src/dto/create-user-dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    // B2C Registration
    @Post('register/b2c')
    registerB2C(@Body() createUserDto: CreateUserDto) {
        return this.authService.register({ ...createUserDto, userType: 'b2c' });
    }

    // B2B Registration
    @Post('register/b2b')
    registerB2B(@Body() createUserDto: CreateUserDto) {
        return this.authService.register({ ...createUserDto, userType: 'b2b' });
    }

    // B2C Login
    @Post('login/b2c')
    loginB2C(@Body() loginDto: LoginDto) {
        return this.authService.login({ ...loginDto, userType: 'b2c' });
    }

    // B2B Login
    @Post('login/b2b')
    loginB2B(@Body() loginDto: LoginDto) {
        return this.authService.login({ ...loginDto, userType: 'b2b' });
    }
}
