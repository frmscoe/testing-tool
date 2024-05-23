// SPDX-License-Identifier: Apache-2.0

import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { get, request } from 'http';
import { CRModel } from './Models/CR.model';
import { CRService } from './CR.service';
import { SpanOptions } from 'src/config';
import { RequestModel } from 'src/Models/RequestModel';
@Controller('CRController')
export class CRController {
  constructor(
    private readonly Service: CRService,
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
