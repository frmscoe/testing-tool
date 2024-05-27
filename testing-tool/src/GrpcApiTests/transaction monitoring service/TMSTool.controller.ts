// SPDX-License-Identifier: Apache-2.0

import { Controller, Logger, Post, Body, OnModuleInit, Get, HttpStatus } from '@nestjs/common';
import { IGrpcService } from './TMS.interface';
import { Client, ClientGrpc, GrpcMethod } from '@nestjs/microservices';
import { microserviceOptions } from './TMS.options';
import { RequestResponse } from 'src/Models/requestResponse';
import { HttpException } from '@nestjs/common';
import { TMSResponse } from './models/TMSResponse';
import { firstValueFrom, Observable } from 'rxjs';

@Controller('TMSTool')
export class TMSTool implements OnModuleInit {
  private logger = new Logger('TMSTool');

  @Client(microserviceOptions)
  private client: ClientGrpc;

  private grpcService: IGrpcService;


  onModuleInit() {
    this.grpcService = this.client.getService<IGrpcService>('TMS');
  }
  @Get()
  getStatus() {
    return JSON.stringify({ microserviceOptions, status: 'new  online Status' });
  }

  @Post()
  @GrpcMethod()
  async sendTMSRequest(@Body() data) {
    const requestResponse: RequestResponse = new RequestResponse();


    let flow: FlowFileRequest = new FlowFileRequest();
    flow.id = 1;
    let response: Observable<TMSResponse> =
      await await firstValueFrom(this.grpcService.send(flow));



    if (JSON.stringify(data.ExpectedResultData) !== JSON.stringify(response)) {
      requestResponse.ResponseMessage = 'expected data did not match received data';
      requestResponse.httpStatus = HttpStatus.NOT_ACCEPTABLE;
      throw new HttpException(requestResponse, HttpStatus.NOT_ACCEPTABLE);
    } else {
      requestResponse.ResponseMessage = 'expected data match received data';
      requestResponse.httpStatus = HttpStatus.OK;
    }

    return requestResponse;


  }
}
export class FlowFileRequest {
  id = 1;
  attributes = '';
  content = '';
}