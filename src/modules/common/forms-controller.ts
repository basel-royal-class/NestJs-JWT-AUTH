import { Controller, Get, UseGuards } from '@nestjs/common';

@Controller('forms')
export class FormsController {
  @Get('motors')
  getMotorsForm() {
    return { message: 'Motors Forms Response' };
  }
}
