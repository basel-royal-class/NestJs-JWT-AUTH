import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/auth-guard';

@Controller('b2b')
@UseGuards(new JwtAuthGuard('b2b'))
export class B2BDashboardController {
    @Get('dashboard')
    getDashboard() {
        return { message: 'B2B Dashboard' };
    }
}
