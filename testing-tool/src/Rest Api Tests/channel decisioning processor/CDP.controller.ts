// SPDX-License-Identifier: Apache-2.0

import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { CDPService } from './CDP.service';
import { RequestModel } from 'src/Models/RequestModel';
@Controller('CDPController')
export class CDPController {
  constructor(
    private readonly Service: CDPService,
  ) { }
  apm = require("elastic-apm-node");

  @Post()
  async handlepost(@Body() JsonInput: RequestModel) {
    const span = this.apm.startSpan("testing tool CDPController");
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
    const span = this.apm.startSpan("testing tool CDPController");
    if (span) {
      span.end()
    }
    return 'online';
  }
}
