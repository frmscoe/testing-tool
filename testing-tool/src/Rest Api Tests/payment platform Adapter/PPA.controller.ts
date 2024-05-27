// SPDX-License-Identifier: Apache-2.0

import { Controller, Get, Post, Body, Param } from '@nestjs/common'; 
import { PPAService } from './PPA.service'; 
import { RequestModel } from 'src/Models/RequestModel';
@Controller('PPAController')
export class PPAController {
  constructor(
    private readonly Service: PPAService,
  ) { }

  apm = require("elastic-apm-node");

  @Post()
  async handlepost(@Body() JsonInput: RequestModel) {
    const span = this.apm.startSpan("testing tool CRController");
    const result = await this.Service.postSampleRequest(
      JsonInput,
    );
    if (span) {
      span.end()
    }
    return result;
  }
  @Get()
  getStatus() {
    const span = this.apm.startSpan("testing tool CRController");
    if (span) {
      span.end()
    }
    return 'online';
  }
}
