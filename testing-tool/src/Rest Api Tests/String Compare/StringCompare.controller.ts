import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { StringCompareService } from './StringCompare.service';
import { RequestModel } from 'src/Models/RequestModel';


@Controller('StringCompare')
export class StringCompareController {
  constructor(
    private readonly StringCompareService: StringCompareService,
  ) { }
  apm = require("elastic-apm-node");

  @Post()
  async Post(@Body() JsonInput: RequestModel) {
    const span = this.apm.startSpan("String Compare On " + JsonInput.Url);
    const result = await this.StringCompareService.postSampleRequest(
      JsonInput,
    ); if (span) {
      span.end()
    }
    return result;
  }

  @Get()
  HealtCheck() {
    const span = this.apm.startSpan("testing tool String Compare");
    if (span) {
      span.end()
    }
    return 'online';
  }

}
