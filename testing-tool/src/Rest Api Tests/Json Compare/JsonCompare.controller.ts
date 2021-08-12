import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { JsonCompareService } from './JsonCompare.service';
import { RequestModel } from 'src/Models/RequestModel';
@Controller('JsonCompare')
export class JsonCompareController {
  constructor(
    private readonly JsonCompareService: JsonCompareService,
  ) { }
  apm = require("elastic-apm-node");

  @Post()
  async Post(@Body() JsonInput: RequestModel) {
    const span = this.apm.startSpan("Json Compare On " + JsonInput.Url);
    const result = await this.JsonCompareService.postSampleRequest(
      JsonInput,
    ); if (span) {
      span.end()
    }
    return result;
  }
  
  @Get()
  HealtCheck() {
    const span = this.apm.startSpan("testing tool JsonCompare");
    if (span) {
      span.end()
    }
    return 'online';
  }

}
