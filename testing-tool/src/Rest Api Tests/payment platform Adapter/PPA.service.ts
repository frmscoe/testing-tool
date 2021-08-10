import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { AxiosResponse } from 'axios';
import { firstValueFrom } from 'rxjs';
import { RequestResponse } from "../../Models/requestResponse";
import { _ } from "lodash";
import { CompareObjectsHelper } from "../../Helpers/CompareObjects";
import { RequestModel } from 'src/Models/RequestModel';
@Injectable()
export class PPAService {
  constructor(private httpService: HttpService) { }

  async postSampleRequest(sample: RequestModel): Promise<RequestResponse> {
    const requestResponse: RequestResponse = new RequestResponse();

    let request: AxiosResponse;

    try {
      request = await firstValueFrom(
        this.httpService.post(sample.Url, sample.postData),
      );
    } catch (error) {
      console.log(error)
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
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
  diff(Json1, Json2) {
    if (_.isEqual(Json1, Json2)) {
      //we are equal
    } else {
      //we are not equal
    }
  }
}