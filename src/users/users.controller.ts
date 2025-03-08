import { Controller, Get, Post, Body, Param, UseGuards, Request } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from 'src/dto/create-user-dto';
import { JwtAuthGuard } from 'src/auth/auth-guard';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    // @Get()
    // getUsers() {
    //     return this.usersService.getAllUsers();
    // }

    @Get('favorites')  // Route: /users/profile
    @UseGuards(new JwtAuthGuard('b2c')) // Protect route with the JWT guard
    getFavourites(@Request() req) {
        const userId = req.user._id;
        const message = `Hello, ${userId}! You have 16 items in your favorites`;

        return { message: message };
    }

    @Get('dummy-profile')
    getUserProfile() {
        return { id: 1, name: 'John Doe', role: 'Admin' };
    }

    @Post()
    create(@Body() createUserDto: CreateUserDto) {
        return this.usersService.create(createUserDto);
    }

    @Get()
    findAll() {
        return this.usersService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.usersService.findOne(id);
    }
}
