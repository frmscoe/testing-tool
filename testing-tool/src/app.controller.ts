import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { HealthResponse } from './Models/HealthResponse';
//handles root route yourdomain.com/
@Controller('Health')
//can add 'users' as route
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('Online')
  getHello(): HealthResponse {
    return this.appService.getOnlineStatus();
  }
}
