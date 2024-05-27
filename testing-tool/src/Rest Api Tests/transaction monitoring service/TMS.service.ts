// SPDX-License-Identifier: Apache-2.0

import { HttpException, HttpStatus, Injectable, Options } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { AxiosResponse } from 'axios';
import { firstValueFrom } from 'rxjs';
import { json } from 'body-parser';
import { RequestResponse } from "../../Models/requestResponse";
import { configuration } from 'src/config';
import { RequestModel } from 'src/Models/RequestModel';
import { CompareObjectsHelper } from 'src/Helpers/CompareObjects';
@Injectable()
export class TMSService {
  getStatus() {
    console.error('configuration', configuration);
    return configuration;
  }
  constructor(private httpService: HttpService) {
  }

  async postSampleRequest(sample: RequestModel): Promise<RequestResponse> {


    const requestResponse: RequestResponse = new RequestResponse();
    let request: AxiosResponse;

    try {

      request = await firstValueFrom(
        this.httpService.post(sample.Url, sample.postData),
      )
    } catch (error) {
      const CircularJSON = require('circular-json');

      let json = CircularJSON.stringify(error.response);
      requestResponse.httpStatus = json.statuscode;
      requestResponse.ResponseMessage = json;
      throw new HttpException(requestResponse, HttpStatus.BAD_REQUEST);
    } 
    if (JSON.stringify(CompareObjectsHelper.difference(sample.ExpectedResultData, request.data, sample.IgnoreFields)) !== "{}") {
      requestResponse.ResponseMessage =
      {
        message: 'Failed Matches At ',
        Result: CompareObjectsHelper.difference(sample.ExpectedResultData, request.data, sample.IgnoreFields)
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
