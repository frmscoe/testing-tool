import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { get, request } from 'http'; 
import { RequestModel } from 'src/Models/RequestModel';
import { TMSService } from './TMS.service'; 
@Controller('TMSController')
export class TMSController {
  constructor(
    private readonly Service: TMSService,
  ) { }
  apm = require("elastic-apm-node");

  @Post()
  async handlepost(@Body() JsonInput: RequestModel) {

    const span = this.apm.startSpan("testing tool TMSController");
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

    const span = this.apm.startSpan("testing tool post TMSController");
    if (span) {
      span.end()
    }

    return this.Service.getStatus(); 
  } 
}
