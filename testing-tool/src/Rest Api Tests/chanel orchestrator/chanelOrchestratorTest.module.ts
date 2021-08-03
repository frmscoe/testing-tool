import { Module } from '@nestjs/common';
import { chanelOrchestratorTest } from './chanelOrchestratorTest.controller';
import { chanelOrchestratorTestService } from './chanelOrchestratorTest.service';
import { HttpModule } from '@nestjs/axios';
@Module({
  imports: [
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),
  ],
  controllers: [chanelOrchestratorTest],
  providers: [chanelOrchestratorTestService],
})
export class chanelOrchestratorTestmodule {}
