import { Controller, Logger, Post, Body, OnModuleInit, Get, HttpStatus } from '@nestjs/common';
import { IGrpcService } from './grpc.interface';
import { Client, ClientGrpc, GrpcMethod } from '@nestjs/microservices';
import { microserviceOptions } from './grpc.options';
import { RequestResponse } from 'src/Models/requestResponse';
import { HttpException } from '@nestjs/common';
import { nifiResponse } from '../models/nifiResponse';
import { firstValueFrom, Observable } from 'rxjs';
import { credentials } from 'grpc';
import { CompareObjectsHelper } from 'src/Helpers/CompareObjects';


@Controller('rule003')
export class rule003 implements OnModuleInit {
  private logger = new Logger('AppController');


  @Client(microserviceOptions)
  private client: ClientGrpc;

  private grpcService: IGrpcService;


  onModuleInit() {
    this.grpcService = this.client.getService<IGrpcService>('FlowFileService');
  }
  @Get()
  getStatus() {
    return JSON.stringify({ status: 'online' });
  }
  @Post('sendrule003request')
  @GrpcMethod()
  async sendrule003request(@Body() data) {
    const requestResponse: RequestResponse = new RequestResponse();


    let flow: FlowFileRequest = new FlowFileRequest();
    flow.id = 1;
    flow.content = "";
    let response: Observable<nifiResponse>;

    try {
      response =
        await firstValueFrom(this.grpcService.send(flow)).catch(ol => {
          console.error(ol);
          return ol;
        });


    } catch (error) {

      console.error('err', error);
      const CircularJSON = require('circular-json');
      let json = CircularJSON.stringify(error.response);
      return json;
    }

    if (JSON.stringify(CompareObjectsHelper.difference(data.ExpectedResultData, response, data.IgnoreFields)) !== "{}") {
      requestResponse.ResponseMessage =
      {
        message: 'Failed Matches At ',
        Result: 'expected data ' +
          data.ExpectedResultData +
          ' || received ' +
          JSON.stringify(CompareObjectsHelper.difference(data.ExpectedResultData, response, data.IgnoreFields))
      }
    }
    else {
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