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


@Controller('CRSP')
export class CRSP implements OnModuleInit {
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
  @Post('SendRequest')
  @GrpcMethod()
  async SendCRSPRequest(@Body() data) {
    const requestResponse: RequestResponse = new RequestResponse();

    
    let flow: FlowFileRequest = new FlowFileRequest();
    flow.id = data.postData.id;
    flow.attributes = data.postData.attributes
    flow.content = data.postData.content;
    let response: Observable<nifiResponse>;

    try {
      response =
        await firstValueFrom(this.grpcService.send(flow)).catch(ol => {
          throw new HttpException(ol, HttpStatus.BAD_REQUEST);

        });
    } catch (error) {
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
      };

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