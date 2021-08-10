import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { chanelOrchestratorTestModel } from './Models/chanelOrchestratorTest.model';
import { chanelOrchestratorTestService } from './chanelOrchestratorTest.service';
import { SpanOptions } from 'src/config';
import { RequestModel } from 'src/Models/RequestModel';
@Controller('chanelOrchestratorTest')
export class chanelOrchestratorTest {
  constructor(
    private readonly chanelOrchestratorTestService: chanelOrchestratorTestService,
  ) { }
  apm = require("elastic-apm-node");

  @Post()
  async handlepost(@Body() JsonInput: RequestModel) {
    const span = this.apm.startSpan("testing tool chanelOrchestratorTest");
    const result = await this.chanelOrchestratorTestService.postSampleRequest(
      JsonInput,
    ); if (span) {
      span.end()
    }
    return result;
  }
  @Get()
  getStatus() {
    const span = this.apm.startSpan("testing tool chanelOrchestratorTest");
    if (span) {
      span.end()
    }
    return 'online';
  }

}
