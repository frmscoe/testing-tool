import { Injectable } from '@nestjs/common';
import { HealthResponse } from './Models/HealthResponse';
@Injectable()
export class AppService {
  getOnlineStatus(): HealthResponse {
    const Health: HealthResponse = new HealthResponse();
    Health.status = 'Online';
    return Health;
  }
}
