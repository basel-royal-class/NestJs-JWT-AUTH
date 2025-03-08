import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/auth-guard';

@Controller('b2c')
@UseGuards(new JwtAuthGuard('b2c'))
export class FavoritesController {
    @Get('favorites')
    getFavorites(@Request() req) {
        const userId = req.user._id;
        const message = `Hello, ${userId}! You have 16 items in your favorites`;

        return { message: message };
    }
}
